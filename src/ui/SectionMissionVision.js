import { FaBullseye, FaEye, FaHeart } from "react-icons/fa"
import mission from '@/assets/images/about_our_mission.jpg'
import vision from '@/assets/images/about_our_vision.jpg'
import value from '@/assets/images/about_core_values.jpg'

const SectionMissionVision = () => {
    return (
        <section className="py-20 bg-gray-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Header */}
                <div 
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Our Foundation
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Built on strong values and clear vision, driving excellence in logistics
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Mission */}
                    <div 
                        data-aos="fade-up"
                        data-aos-delay="0"
                        data-aos-duration="900"
                        className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                    >
                        <div className="h-64 bg-cover bg-center" style={{ backgroundImage: `url(${mission.src})` }}></div>
                        <div className="p-8">
                            <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center mb-4">
                                <FaBullseye className="text-white text-xl" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                Our Mission
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                Connecting people, businesses and communities to a better future – through logistics.
                            </p>
                        </div>
                    </div>

                    {/* Vision */}
                    <div 
                        data-aos="fade-up"
                        data-aos-delay="150"
                        data-aos-duration="900"
                        className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                    >
                        <div className="h-64 bg-cover bg-center" style={{ backgroundImage: `url(${vision.src})` }}></div>
                        <div className="p-8">
                            <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center mb-4">
                                <FaEye className="text-white text-xl" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                Our Vision
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                To become the world's preferred supply chain logistics company – applying insights,
                                service quality and innovation to create sustainable growth for business and society.
                            </p>
                        </div>
                    </div>

                    {/* Core Values */}
                    <div 
                        data-aos="fade-up"
                        data-aos-delay="300"
                        data-aos-duration="900"
                        className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                    >
                        <div className="h-64 bg-cover bg-center" style={{ backgroundImage: `url(${value.src})` }}></div>
                        <div className="p-8">
                            <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center mb-4">
                                <FaHeart className="text-white text-xl" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                Core Values
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                               Value Creation – Openness – Integrity – Commitment – Excellence
                                – Mutual Respect – Customer Orientation
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default SectionMissionVision
