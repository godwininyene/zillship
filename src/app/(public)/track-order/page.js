import SectionFaqs from "@/ui/SectionFaqs";
import SectionFeatures from "@/ui/SectionFeatures";
import TrackSection from "@/ui/TrackSection";
import Link from "next/link";
import Image from "next/image";
import { FaChevronRight, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import customerSupport from '@/assets/images/customer-service.jpg'

const Page = () => {
    return (
        <>
            <section className="relative  bg-linear-to-r from-primary-700 to-primary-800 py-24 md:py-32">

                <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white'>
                    <h1 className='text-4xl md:text-5xl font-bold mb-6'>Track & Trace Your Shipment</h1>
                    <p className='text-xl text-primary-100 max-w-2xl mx-auto'>
                        Real-time tracking for your packages, delivered with precision and care
                    </p>
                    <nav className='flex justify-center mt-8'>
                        <ul className='flex items-center space-x-2 text-primary-200'>
                            <li>
                                <Link href='/' className='hover:text-white transition-colors'>Home</Link>
                            </li>
                            <li>
                                <FaChevronRight className='text-sm' />
                            </li>
                            <li className='text-white'>Track & Trace Shipment</li>
                        </ul>
                    </nav>
                </div>

                {/* Wave Divider */}
                <div className="custom-shape-divider-bottom-1767999524">
                    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
                    </svg>
                </div>
            </section>

            <TrackSection />
            <SectionFeatures />
            <SectionFaqs />
            {/* CTA Section  */}
            <section
                className="py-16 overflow-hidden bg-linear-to-r from-primary-600 to-primary-800 text-white"
                data-aos="fade-up"
                data-aos-duration="900"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold mb-6" data-aos="fade-right" data-aos-duration="900">
                                Need Additional Help With Your Shipment?
                            </h2>
                            <p className="text-xl text-primary-100 mb-8" data-aos="fade-right" data-aos-duration="1100">
                                Our customer service team is available to assist you with any questions or concerns about your shipment.
                            </p>
                            <div className="flex flex-wrap gap-4" data-aos="fade-right" data-aos-duration="1300">
                                <Link href="/contact" className="inline-flex items-center px-6 py-3 border border-transparent rounded-lg text-base font-medium bg-white text-primary-700 hover:bg-gray-100 transition-colors">
                                    <FaEnvelope className="mr-2" />
                                    Contact Support
                                </Link>
                                <Link href="tel:+12348144098649" className="inline-flex items-center px-6 py-3 border border-white rounded-lg text-base font-medium text-white hover:bg-primary-700 transition-colors">
                                    <FaPhoneAlt className="mr-2" />
                                    Call Us
                                </Link>
                            </div>
                        </div>

                        <div className="hidden lg:block" data-aos="fade-left" data-aos-duration="900">
                            <Image src={customerSupport} alt="Customer Support" className="max-w-sm mx-auto" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Page;