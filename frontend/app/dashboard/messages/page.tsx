import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Send, MessageSquare, MapPin } from "lucide-react";
import { sendMessage } from "@/app/actions/messageActions";

type Props = {
  searchParams: Promise<{ chat?: string | string[]; new_chat?: string | string[] }>;
};

export default async function MessagesPage(props: Props) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  // Await the Next.js 15 searchParams promise and protect against array URL manipulations
  const searchParams = await props.searchParams;
  const activeChatId = Array.isArray(searchParams.chat) ? searchParams.chat[0] : searchParams.chat;
  const newChatPropertyId = Array.isArray(searchParams.new_chat) ? searchParams.new_chat[0] : searchParams.new_chat;

  const currentUserId = session.user.id;
  const isHost = session.user.role === "HOST";

  // 1. Fetch all conversations this user is part of (ordered by newest first)
  const conversations = await prisma.conversation.findMany({
    where: {
      OR: [
        { guestId: currentUserId },
        { hostId: currentUserId }
      ]
    },
    include: {
      property: true,
      guest: true,
      host: true,
      messages: {
        orderBy: { createdAt: 'desc' },
        take: 1 // Just to get the snippet for the sidebar
      }
    },
    orderBy: { updatedAt: 'desc' }
  });

  // 2. Fetch data for the Active Chat Window
  let activeConversation = null;
  let newChatProperty = null;

  if (activeChatId) {
    // SECURITY & PERF: Only query the DB if the user is an authorized participant.
    // This prevents massive data downloads (N+1) for malicious or unauthorized requests.
    const isAdmin = session.user.role === "ADMIN";
    activeConversation = await prisma.conversation.findFirst({
      where: { 
        id: activeChatId,
        ...(isAdmin ? {} : { OR: [{ guestId: currentUserId }, { hostId: currentUserId }] })
      },
      include: {
        property: true,
        guest: true,
        host: true,
        // SECURITY & PERF: Only load the last 50 messages to prevent Out-Of-Memory crashes on long chats
        messages: { orderBy: { createdAt: 'desc' }, take: 50 } 
      }
    });
    
    if (activeConversation) {
      // Reverse the array so the UI displays them chronologically (oldest top, newest bottom)
      activeConversation.messages.reverse();
    }
  } else if (newChatPropertyId) {
    newChatProperty = await prisma.property.findUnique({ where: { id: newChatPropertyId } });
    
    // Prevent self-chatting (A Host cannot start a chat with themselves about their own property)
    if (newChatProperty?.ownerId === currentUserId) {
      newChatProperty = null;
    }
  }

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col md:flex-row bg-white dark:bg-[#0a0a0a] border border-black/10 dark:border-white/10 rounded-3xl overflow-hidden shadow-sm animate-in fade-in duration-500">
      
      {/* LEFT PANE: INBOX LIST */}
      <div className="w-full md:w-1/3 border-r border-black/5 dark:border-white/5 flex flex-col h-1/3 md:h-full shrink-0 overflow-hidden">
        <div className="p-6 border-b border-black/5 dark:border-white/5 shrink-0 bg-black/5 dark:bg-white/5">
          <h1 className="text-xl font-sora font-bold">Messages</h1>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {conversations.length === 0 ? (
            <div className="p-8 text-center text-black/50 dark:text-white/50 text-sm font-medium">
              No messages yet.
            </div>
          ) : (
            <div className="flex flex-col">
              {conversations.map((conv) => {
                const otherPerson = conv.guestId === currentUserId ? conv.host : conv.guest;
                const lastMessage = conv.messages[0];
                const isActive = conv.id === activeChatId;

                return (
                  <Link 
                    key={conv.id} 
                    href={`/dashboard/messages?chat=${conv.id}`}
                    className={`p-4 border-b border-black/5 dark:border-white/5 hover:bg-black/5 dark:hover:bg-white/5 transition-colors flex items-center gap-4 ${isActive ? 'bg-black/5 dark:bg-white/5 border-l-4 border-l-promaroc-green' : 'border-l-4 border-l-transparent'}`}
                  >
                    <div className="w-12 h-12 rounded-full bg-black/10 dark:bg-white/10 flex items-center justify-center font-bold shrink-0 overflow-hidden">
                      {otherPerson.image ? <img src={otherPerson.image} alt="" /> : otherPerson.name?.charAt(0) || '?'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-sm truncate">{otherPerson.name}</span>
                      </div>
                      <div className="text-xs font-bold text-promaroc-green truncate mb-1">{conv.property.title}</div>
                      <div className="text-xs text-black/50 dark:text-white/50 truncate">
                        {lastMessage ? lastMessage.content : "Start the conversation..."}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* RIGHT PANE: ACTIVE CHAT */}
      <div className="flex-1 flex flex-col h-2/3 md:h-full bg-black/[0.02] dark:bg-white/[0.02]">
        
        {/* State 1: Nothing Selected */}
        {!activeConversation && !newChatProperty && (
          <div className="flex-1 flex flex-col items-center justify-center text-black/40 dark:text-white/40">
            <MessageSquare className="w-16 h-16 mb-4 opacity-50" />
            <p className="font-medium">Select a conversation to start chatting</p>
          </div>
        )}

        {/* State 2: Chat Window Active (or New Chat starting) */}
        {(activeConversation || newChatProperty) && (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-black/5 dark:border-white/5 bg-white dark:bg-[#0a0a0a] flex items-center gap-4 shrink-0">
              <div className="w-12 h-12 rounded-xl bg-black/5 dark:bg-white/5 overflow-hidden shrink-0">
                {(activeConversation?.property.heroImage || newChatProperty?.heroImage) && (
                  <img src={activeConversation?.property.heroImage || newChatProperty?.heroImage || ''} alt="Property" className="w-full h-full object-cover" />
                )}
              </div>
              <div>
                <h3 className="font-bold font-sora line-clamp-1">{activeConversation?.property.title || newChatProperty?.title}</h3>
                <div className="text-xs font-medium text-black/50 dark:text-white/50 flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {activeConversation?.property.location || newChatProperty?.location}
                </div>
              </div>
            </div>

            {/* Chat Bubbles */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {newChatProperty && !activeConversation && (
                <div className="text-center text-xs font-bold text-black/40 dark:text-white/40 uppercase tracking-wider py-4">
                  Starting a new conversation
                </div>
              )}

              {activeConversation?.messages.map((msg) => {
                const isMe = msg.senderId === currentUserId;
                return (
                  <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[75%] px-5 py-3 rounded-2xl text-sm ${
                      isMe 
                        ? 'bg-promaroc-green text-white rounded-tr-sm' 
                        : 'bg-white dark:bg-white/10 text-promaroc-black dark:text-promaroc-white border border-black/5 dark:border-white/5 rounded-tl-sm shadow-sm'
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Input Form */}
            <div className="p-4 bg-white dark:bg-[#0a0a0a] border-t border-black/5 dark:border-white/5 shrink-0">
              <form action={sendMessage} className="flex items-center gap-3">
                {activeConversation && <input type="hidden" name="conversationId" value={activeConversation.id} />}
                {newChatProperty && <input type="hidden" name="propertyId" value={newChatProperty.id} />}
                
                <input 
                  type="text" 
                  name="content"
                  required
                  autoComplete="off"
                  maxLength={2000}
                  placeholder="Type your message..." 
                  className="flex-1 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-full px-6 py-3 text-sm focus:outline-none focus:border-promaroc-green focus:ring-1 focus:ring-promaroc-green transition-all"
                />
                <button type="submit" className="w-12 h-12 bg-promaroc-green text-white rounded-full flex items-center justify-center hover:bg-[#0a2e29] transition-colors shrink-0 shadow-md">
                  <Send className="w-5 h-5 ml-1" />
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}