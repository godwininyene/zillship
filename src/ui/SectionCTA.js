import Link from "next/link";

const SectionCTA = ()=>{
    return(
        <section className="py-20 bg-linear-to-r from-primary-600 to-primary-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        Ready to Ship with Confidence?
                    </h2>
                    <p className="text-xl text-primary-100 mb-8 leading-relaxed">
                        Get started with our professional logistics services today.
                        Contact us for a free quote and experience the difference.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href='/contact' className="bg-white text-primary-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-all duration-300 font-semibold text-lg shadow-lg">
                            Get Free Quote
                        </Link>
                        <Link href='/track-order' className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-primary-600 transition-all duration-300 font-semibold text-lg">
                            Track Shipment
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SectionCTA;