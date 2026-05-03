import Link from 'next/link';

export default function Header() {
  return (
    <header className="fixed top-0 w-full bg-black/80 backdrop-blur-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="text-xl font-bold text-white">Promaroc</div>
          <nav>
            <ul className="flex space-x-8">
              <li><Link href="/" className="text-white hover:text-gray-300 transition-colors">Home</Link></li>
              <li><Link href="/about" className="text-white hover:text-gray-300 transition-colors">About</Link></li>
              <li><Link href="/contact" className="text-white hover:text-gray-300 transition-colors">Contact</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}