
import {
  FaSearch,
  FaShieldAlt,
  FaTruck,
  FaShippingFast,
  FaGlobe,
  FaHeadset
} from "react-icons/fa"

const features = [
  {
    id: 1,
    title: "Track & Trace",
    description:
      "Fast and reliable way to check the real-time status of your shipment with our advanced tracking system.",
    icon: <FaSearch className="text-white text-2xl" />,
    aos: "fade-up"
  },
  {
    id: 2,
    title: "Secure Warehousing",
    description:
      "We leverage a network of operational warehousing facilities with state-of-the-art security systems.",
    icon: <FaShieldAlt className="text-white text-2xl" />,
    aos: "fade-up"
  },
  {
    id: 3,
    title: "Express Delivery",
    description:
      "We service your shipments via a diverse operating infrastructure for fastest delivery times.",
    icon: <FaShippingFast className="text-white text-2xl" />,
    aos: "fade-up"
  },
  {
    id: 4,
    title: "Domestic Services",
    description:
      "Next business day delivery for time-sensitive parcels with comprehensive domestic coverage.",
    icon: <FaTruck className="text-white text-2xl" />,
    aos: "fade-up"
  },
  {
    id: 5,
    title: "Global Coverage",
    description:
      "US, Europe & Worldwide coverage by sea & air. We offer a broad range of international freight services.",
    icon: <FaGlobe className="text-white text-2xl" />,
    aos: "fade-up"
  },
  {
    id: 6,
    title: "24/7 Support",
    description:
      "Get excellent 24/7 online support and expert advice from our dedicated customer service team.",
    icon: <FaHeadset className="text-white text-2xl" />,
    aos: "fade-up"
  }
]

const SectionWhyUs = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div 
          className="text-center mb-16"
          data-aos="fade-up"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Us
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Trusted by thousands of customers worldwide for reliable
            and professional logistics solutions
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              data-aos={feature.aos}
              data-aos-delay={index * 100}
              className="text-center group"
            >
          

              <div
                // data-aos="zoom-in"
                // data-aos-delay={index * 120}
                className="w-20 h-20 bg-linear-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-6 transition-transform duration-300 group-hover:scale-110"
              >
                {feature.icon}
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {feature.title}
              </h3>

              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>

            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default SectionWhyUs
