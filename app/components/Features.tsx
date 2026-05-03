export default function Features() {
  const features = [
    {
      title: 'Innovation',
      description: 'Cutting-edge technology that pushes boundaries and creates new opportunities.'
    },
    {
      title: 'Reliability',
      description: 'Trusted by millions worldwide with unparalleled performance and security.'
    },
    {
      title: 'Support',
      description: '24/7 expert support to ensure your success every step of the way.'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
          Why Choose Promaroc?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}