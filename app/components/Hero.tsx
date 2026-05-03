import Link from 'next/link';

export default function Hero() {
  return (
    <section className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-purple-500 to-blue-600 text-white">
      <div className="text-center max-w-4xl px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Think Different
        </h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90">
          Discover innovative solutions that redefine possibilities.
        </p>
        <Link href="/about" className="inline-block bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
          Explore More
        </Link>
      </div>
    </section>
  );
}