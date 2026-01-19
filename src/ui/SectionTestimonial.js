import { FaStar } from "react-icons/fa";

const SectionTestimonial = () => {
  const testimonials = [
    {
      stars: 5,
      quote: `"Given my past experiences with other logistics companies,
               I can say without exception that the services
               provided by Zill ship greatly exceed industry standards."`,
      initials: "MP",
      name: "Monique Pete",
      role: "Logistics Manager, Martrax Inc.",
      delay: 200
    },
    {
      stars: 5,
      quote: `"More than once, Zill ship has 'saved the day', delivering our cargo on
               time with short notice. They have won my gratitude and loyalty with their 'can do' approach."`,
      initials: "SA",
      name: "Steve Anderson",
      role: "President/Owner, Duplication Factory",
      delay: 400
    },
    {
      stars: 5,
      quote: `"I am very pleased with the service provided by Zill ship.
               They find good carriers and use them regularly so we
               get a high level of service. Their communication is outstanding."`,
      initials: "CB",
      name: "Cathy Beckman",
      role: "Logistics Team, Oxea Chemicals",
      delay: 600
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div 
          className="text-center mb-16" 
          data-aos="fade-up"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear from our satisfied customers about their experience with our logistics solutions
          </p>
        </div>

        {/* Testimonial grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testi, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-lg p-8 transform transition-all duration-500"
              data-aos="fade-up"
              data-aos-delay={testi.delay}
            >
              {/* Stars */}
              <div className="flex items-center mb-4 text-yellow-400">
                {Array.from({ length: testi.stars }).map((_, idx) => (
                  <FaStar key={idx} />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-gray-600 mb-6 leading-relaxed">
                {testi.quote}
              </blockquote>

              {/* Client Info */}
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                  {testi.initials}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{testi.name}</div>
                  <div className="text-sm text-gray-500">{testi.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default SectionTestimonial;
