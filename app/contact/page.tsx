import Header from '../components/Header';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';

export default function Contact() {
  return (
    <div className="relative min-h-screen bg-slate-950 overflow-hidden">
      {/* 4D/Ambient Background Lighting Effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-amber-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[30rem] h-[30rem] bg-emerald-900/20 rounded-full blur-[150px] pointer-events-none"></div>

      <Header />
      
      <main className="relative z-10 pt-24 pb-20 min-h-screen flex items-center">
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Glassmorphism Container for 3D Depth */}
          <div className="relative rounded-[2.5rem] border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-8 md:p-16 overflow-hidden">
            
            {/* Subtle inner premium shine */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>

            <div className="text-center mb-16 relative z-10">
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-700 drop-shadow-lg">
                Let's Connect
              </h1>
              <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto font-light leading-relaxed">
                Ready to elevate your guests' experience? Get in touch with our team to craft something truly unforgettable.
              </p>
            </div>

            {/* Elevated Form Wrapper with Hover Scale */}
            <div className="relative z-10 max-w-4xl mx-auto transform transition-all duration-700 hover:scale-[1.02]">
              <div className="rounded-3xl bg-slate-900/80 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-slate-800 p-8 md:p-12">
                <ContactForm />
              </div>
            </div>

          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}