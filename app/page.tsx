import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div>
      <Header />
      <main className="pt-16">
        <Hero />
        <Features />
      </main>
      <Footer />
    </div>
  );
}

