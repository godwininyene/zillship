import { FaCalendarAlt, FaHistory, FaMapMarkerAlt } from "react-icons/fa"

const SectionFeatures = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div
          className="text-center mb-16"
          data-aos="fade-up"
          data-aos-duration="900"
        >
          <span className='text-primary-600 font-semibold tracking-wider uppercase text-sm'>
            Tracking Features
          </span>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
            Real-Time Tracking Benefits
          </h1>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Monitor your shipments with precision and confidence using our advanced tracking system
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Feature 1 */}
          <div
            className="bg-white rounded-xl p-8 shadow-md transition-all duration-300 hover:shadow-lg"
            data-aos="fade-up"
            data-aos-delay="0"
          >
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
              <FaMapMarkerAlt className="text-primary-600 text-xl" />
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Real-Time Updates
            </h3>

            <p className="text-gray-600">
              Stay informed with accurate, up-to-the-minute information about your shipment's
              location and status throughout its journey.
            </p>
          </div>

          {/* Feature 2 */}
          <div
            className="bg-white rounded-xl p-8 shadow-md transition-all duration-300 hover:shadow-lg"
            data-aos="fade-up"
            data-aos-delay="150"
          >
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
              <FaCalendarAlt className="text-primary-600 text-xl" />
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Estimated Delivery
            </h3>

            <p className="text-gray-600">
              Get precise delivery time estimates that help you plan and prepare for
              your shipment's arrival with confidence.
            </p>
          </div>

          {/* Feature 3 */}
          <div
            className="bg-white rounded-xl p-8 shadow-md transition-all duration-300 hover:shadow-lg"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
              <FaHistory className="text-primary-600 text-xl" />
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Shipment History
            </h3>

            <p className="text-gray-600">
              Access a detailed timeline of your package's journey, including all transit points
              and handling activities along the route.
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}

export default SectionFeatures
