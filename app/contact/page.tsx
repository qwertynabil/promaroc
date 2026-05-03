import Header from '../components/Header';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';

export default function Contact() {
  return (
    <div>
      <Header />
      <main className="pt-16 min-h-screen">
        <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">Let's Talk</h1>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">Ready to transform your property management workflow? Get in touch with our team to schedule a personalized demo.</p>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
