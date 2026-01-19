import service1 from '@/assets/images/service-1.jpg'
import service2 from '@/assets/images/service2.jpg'
import service3 from '@/assets/images/service3.jpg'
import service4 from '@/assets/images/service4.jpg'
import service5 from '@/assets/images/service5.jpg'
import service6 from '@/assets/images/service6.jpg'

import Link from 'next/link'
import { FaArrowRight, FaBox, FaPlane, FaShieldAlt, FaShip, FaTruck, FaWarehouse } from 'react-icons/fa'

const services = [
  {
    id: 1,
    title: "Air Freight",
    description:
      "Zill ship, as an IATA-endorsed air forwarder, offers professional and reliable global air-freight solutions.",
    image: service1,
    icon: <FaPlane className="text-white text-xl" />,
    aos: "fade-up"
  },
  {
    id: 2,
    title: "Sea / Ocean Freight",
    description:
      "International ocean freight shipping import and export services. FCL, LCL shipments, port to port or door to door.",
    image: service2,
    icon: <FaShip className="text-white text-xl" />,
    aos: "fade-up"
  },
  {
    id: 3,
    title: "Road Transportation",
    description:
      "Highly experienced and dependable, Zill ship is a trusted partner in domestic road transportation.",
    image: service3,
    icon: <FaTruck className="text-white text-xl" />,
    aos: "fade-up"
  },
  {
    id: 4,
    title: "Diplomatic Bag & Secure Logistics",
    description:
      "Global secure mail and equipment delivery service with complete confidence and security.",
    image: service4,
    icon: <FaShieldAlt className="text-white text-xl" />,
    aos: "fade-up"
  },
  {
    id: 5,
    title: "Warehousing",
    description:
      "Shared and dedicated warehousing solutions supported by state-of-the-art technology and warehouse services.",
    image: service5,
    icon: <FaWarehouse className="text-white text-xl" />,
    aos: "fade-up"
  },
  {
    id: 6,
    title: "Packaging & Storage",
    description:
      "Professional packaging and storage solutions for raw materials, electronics, and finished goods with cargo insurance.",
    image: service6,
    icon: <FaBox className="text-white text-xl" />,
    aos: "fade-up"
  }
]

const ServicesSection = () => {
  return (
    <section className="py-20 bg-gray-50">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div 
          className="text-center mb-16"
          data-aos="fade-up"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive shipping and logistics solutions tailored to your business needs
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              data-aos={service.aos}
              data-aos-delay={index * 100}
              className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              {/* Image */}
              <div
                className="relative h-64 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                style={{ backgroundImage: `url(${service.image.src})` }}
              >
                <div className="absolute inset-0 bg-linear-to-t from-black to-transparent opacity-60"></div>

                <div className="absolute top-4 left-4">
                  <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center">
                    {service.icon}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {service.title}
                </h3>

                <p className="text-gray-600 mb-4">
                  {service.description}
                </p>

                <Link
                  href="/services"
                  className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center"
                >
                  Learn More
                  <FaArrowRight className="ml-2 text-sm" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>

    </section>
  )
}

export default ServicesSection
