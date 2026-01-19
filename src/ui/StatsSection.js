const StatsSection = () => {
    return (
        <section className="py-20 bg-linear-to-br from-primary-600 to-primary-800 text-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Header */}
                <div 
                    className="text-center mb-12"
                    data-aos="fade-up"
                    data-aos-duration="900"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Our Achievements
                    </h2>
                    <p className="text-xl text-primary-200">
                        Numbers that speak for our excellence
                    </p>
                </div>

                {/* Achievements Grid */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8">

                    <div 
                        className="text-center"
                        data-aos="zoom-in"
                        data-aos-delay="0"
                    >
                        <div className="stat-number text-3xl md:text-4xl font-bold mb-2">
                            101,273+
                        </div>
                        <div className="text-primary-200 text-sm md:text-base font-medium">
                            Delivered Packages
                        </div>
                    </div>

                    <div 
                        className="text-center"
                        data-aos="zoom-in"
                        data-aos-delay="100"
                    >
                        <div className="stat-number text-3xl md:text-4xl font-bold mb-2">
                            673,754+
                        </div>
                        <div className="text-primary-200 text-sm md:text-base font-medium">
                            KM Per Year
                        </div>
                    </div>

                    <div 
                        className="text-center"
                        data-aos="zoom-in"
                        data-aos-delay="200"
                    >
                        <div className="stat-number text-3xl md:text-4xl font-bold mb-2">
                            11+
                        </div>
                        <div className="text-primary-200 text-sm md:text-base font-medium">
                            Years Experience
                        </div>
                    </div>

                    <div 
                        className="text-center"
                        data-aos="zoom-in"
                        data-aos-delay="300"
                    >
                        <div className="stat-number text-3xl md:text-4xl font-bold mb-2">
                            16,714+
                        </div>
                        <div className="text-primary-200 text-sm md:text-base font-medium">
                            Happy Clients
                        </div>
                    </div>

                    <div 
                        className="text-center"
                        data-aos="zoom-in"
                        data-aos-delay="400"
                    >
                        <div className="stat-number text-3xl md:text-4xl font-bold mb-2">
                            8+
                        </div>
                        <div className="text-primary-200 text-sm md:text-base font-medium">
                            Industry Awards
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default StatsSection
