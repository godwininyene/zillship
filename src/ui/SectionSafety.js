import { FaShieldAlt } from "react-icons/fa"

const SectionSafety = () => {
    return (
        <section className="py-20 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

                    {/* Safety */}
                    <div 
                        data-aos="fade-right"
                        data-aos-duration="1000"
                        className="space-y-6"
                    >
                        <div className="flex items-center space-x-4 mb-6">
                            <div 
                                data-aos="zoom-in"
                                data-aos-delay="200"
                                className="w-16 h-16 bg-linear-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center"
                            >
                                <FaShieldAlt className="text-white text-2xl" />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900">
                                Safety First
                            </h2>
                        </div>

                        <div className="space-y-4 text-gray-600 leading-relaxed">
                            <p>
                                At Zill ship, ensuring the safety of our customers, employees and our communities is our priority.
                                We understand the importance of continuous training and are proud of our safety knowledge,
                                experienced staff and ability to exceed industry standards year after year.
                            </p>
                            <p>
                                We have established and continually maintain excellent motor carrier safety ratings
                                and low accident frequencies. As a company, we have a solid safety performance
                                history and will continue to be a leader in the area of safety and compliance.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-4">
                            <div 
                                data-aos="fade-up"
                                data-aos-delay="200"
                                className="text-center p-4 bg-green-50 rounded-lg"
                            >
                                <div className="text-2xl font-bold text-green-600">99.9%</div>
                                <div className="text-sm text-gray-600">Safety Rating</div>
                            </div>

                            <div 
                                data-aos="fade-up"
                                data-aos-delay="350"
                                className="text-center p-4 bg-green-50 rounded-lg"
                            >
                                <div className="text-2xl font-bold text-green-600">24/7</div>
                                <div className="text-sm text-gray-600">Monitoring</div>
                            </div>
                        </div>
                    </div>


                    {/* Security */}
                    <div 
                        data-aos="fade-left"
                        data-aos-duration="1000"
                        className="space-y-6"
                    >
                        <div className="flex items-center space-x-4 mb-6">
                            <div 
                                data-aos="zoom-in"
                                data-aos-delay="200"
                                className="w-16 h-16 bg-linear-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center"
                            >
                                <FaShieldAlt className="text-white text-2xl" />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900">
                                Advanced Security
                            </h2>
                        </div>

                        <div className="space-y-4 text-gray-600 leading-relaxed">
                            <p>
                                At Zill ship, we offer industry-leading asset protection and security compliance programs.
                                We understand that our customers may have important and unique needs related
                                to homeland security regulatory compliance, high-risk products, or brand protection.
                            </p>
                            <p>
                              By leveraging modern and proven technologies, we provide for the integrity of customer assets while in-transit
                              or at one of our facilities. We offer consultation and proactive partnership to ensure that
                              our customers' <br/> security needs are met.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-4">
                            <div 
                                data-aos="fade-up"
                                data-aos-delay="200"
                                className="text-center p-4 bg-blue-50 rounded-lg"
                            >
                                <div className="text-2xl font-bold text-blue-600">256-bit</div>
                                <div className="text-sm text-gray-600">Encryption</div>
                            </div>

                            <div 
                                data-aos="fade-up"
                                data-aos-delay="350"
                                className="text-center p-4 bg-blue-50 rounded-lg"
                            >
                                <div className="text-2xl font-bold text-blue-600">ISO</div>
                                <div className="text-sm text-gray-600">Certified</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default SectionSafety
