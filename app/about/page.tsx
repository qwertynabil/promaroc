import Header from '../components/Header';
import Footer from '../components/Footer';

export default function About() {
  return (
    <div>
      <Header />
      <main className="pt-16 min-h-screen">
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white p-8 md:p-12 rounded-2xl shadow-lg">
              <h1 className="text-4xl font-bold mb-8 text-center text-gray-900">About Promaroc</h1>
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p className="text-lg">
                  At Promaroc, we believe in the power of innovation to transform lives and businesses. Founded with a vision to create technology that matters, we've been at the forefront of developing solutions that combine cutting-edge design with unparalleled functionality.
                </p>
                <p>
                  Our team of passionate engineers, designers, and visionaries work tirelessly to push the boundaries of what's possible, delivering products that not only meet today's needs but anticipate tomorrow's challenges.
                </p>
                <p>
                  We are committed to excellence in everything we do, from the smallest detail to the biggest vision. Our approach combines creativity with practicality, ensuring that our solutions are not just innovative, but also reliable and user-friendly.
                </p>
                <p>
                  Join us on this journey of discovery and innovation. Together, we can build a future that's limited only by imagination.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}