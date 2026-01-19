import { FaChevronRight, FaGlobeAmericas, FaLock, FaShippingFast } from 'react-icons/fa'

import service1 from '@/assets/images/service-1.jpg'
import service2 from '@/assets/images/service2.jpg'
import service3 from '@/assets/images/service3.jpg'
import service4 from '@/assets/images/service4.jpg'
import service5 from '@/assets/images/service5.jpg'
import service6 from '@/assets/images/service6.jpg'

import Link from 'next/link'
import { FaArrowRight, FaBox, FaPlane, FaShieldAlt, FaShip, FaTruck, FaWarehouse } from 'react-icons/fa'
import SectionNetwork from '@/ui/SectionNetwork'

const services = [
    {
        id: 1,
        title: "Air Freight",
        description:
            "Zill ship, as an IATA-endorsed air forwarder, offers professional and reliable global air-freight solutions.",
        image: service1,
        icon: <FaPlane className="text-white text-xl" />,
        aos: "fade-up",
        hastags: ['Express Delivery', 'Global Coverage', 'Priority Shipping']
    },
    {
        id: 2,
        title: "Sea / Ocean Freight",
        description:
            "International ocean freight shipping import and export services. FCL, LCL shipments, port to port or door to door.",
        image: service2,
        icon: <FaShip className="text-white text-xl" />,
        aos: "fade-up",
        hastags: ['FCL Shipping', 'LCL Options', 'Port To Door']
    },
    {
        id: 3,
        title: "Road Transportation",
        description:
            "Highly experienced and dependable, Zill ship is a trusted partner in domestic road transportation.",
        image: service3,
        icon: <FaTruck className="text-white text-xl" />,
        aos: "fade-up",
        hastags: ['Same-Day Delivery', 'Last Mile', 'Regional Coverage']
    },
    {
        id: 4,
        title: "Diplomatic Bag & Secure Logistics",
        description:
            "Global secure mail and equipment delivery service with complete confidence and security.",
        image: service4,
        icon: <FaShieldAlt className="text-white text-xl" />,
        aos: "fade-up",
        hastags: ['High Security', 'Confidential', 'Diplomatic Channels']
    },
    {
        id: 5,
        title: "Warehousing",
        description:
            "Shared and dedicated warehousing solutions supported by state-of-the-art technology and warehouse services.",
        image: service5,
        icon: <FaWarehouse className="text-white text-xl" />,
        aos: "fade-up",
        hastags: ['Inventory Management', 'Distribution', 'Fulfilment']
    },
    {
        id: 6,
        title: "Packaging & Storage",
        description:
            "Professional packaging and storage solutions for raw materials, electronics, and finished goods with cargo insurance.",
        image: service6,
        icon: <FaBox className="text-white text-xl" />,
        aos: "fade-up",
        hastags: ['Custom Packaging', 'Secure Storage', 'Cargo Insurance']
    }
]

const Page = () => {
    return (
        <>
            <section className="relative  bg-linear-to-r from-primary-700 to-primary-800 py-24 md:py-32">

                <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white'>
                    <h1 className='text-4xl md:text-6xl font-bold mb-6'>Our Services</h1>
                    <p className='text-xl text-primary-100 max-w-2xl mx-auto'>
                        Comprehensive logistics solutions tailored to your unique shipping needs
                    </p>
                    <nav className='flex justify-center mt-8'>
                        <ul className='flex items-center space-x-2 text-primary-200'>
                            <li>
                                <Link href='/' className='hover:text-white transition-colors'>Home</Link>
                            </li>
                            <li>
                                <FaChevronRight className='text-sm' />
                            </li>
                            <li className='text-white'>Our Services</li>
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

            {/* Section Services */}
            <section className="py-20 bg-gray-50">

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Section header */}
                    <div
                        className="text-center mb-16"
                        data-aos="fade-up"
                    >
                        <span className='text-primary-600 font-semibold tracking-wider uppercase text-sm'>
                            What we offer
                        </span>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
                            Comprehensive Logistics Solutions
                        </h1>

                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            From air freight to specialized diplomatic services, we provide end-to-end logistics
                            solutions designed to meet
                            your unique shipping requirements with efficiency and reliability.
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
                                    <div className='flex flex-wrap gap-2 mb-4'>
                                        {service.hastags.map(hastag => (
                                            <span key={hastag} className='px-3 py-1 bg-primary-100 text-primary-700 text-xs rounded-full'>{hastag}</span>
                                        ))}
                                    </div>


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

            <SectionNetwork />

            {/* Section Why Us */}
            <section className='py-16 bg-white'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>

                    {/* Section header */}
                    <div
                        className="text-center mb-16"
                        data-aos="fade-up"
                        data-aos-duration="900"
                    >
                        <span className='text-primary-600 font-semibold tracking-wider uppercase text-sm'>
                            Our Advantages
                        </span>

                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
                            Why Choose Our Services
                        </h1>

                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            With decades of experience in the logistics industry, we offer reliable, secure,
                            and efficient shipping solutions that meet your unique requirements.
                        </p>
                    </div>

                    {/* Cards */}
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>

                        <div
                            className='bg-gray-50 rounded-xl p-8 transition-all duration-300 hover:shadow-md'
                            data-aos="fade-up"
                            data-aos-delay="0"
                        >
                            <div className='w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4'>
                                <FaShippingFast className='text-primary-600 text-xl' />
                            </div>
                            <h3 className='text-xl font-bold text-gray-900 mb-3'>
                                Fast & Reliable
                            </h3>
                            <p className='text-gray-600'>
                                Our expedited shipping services ensure your cargo reaches its destination on time,
                                every time, with real-time tracking capabilities.
                            </p>
                        </div>

                        <div
                            className='bg-gray-50 rounded-xl p-8 transition-all duration-300 hover:shadow-md'
                            data-aos="fade-up"
                            data-aos-delay="150"
                        >
                            <div className='w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4'>
                                <FaLock className='text-primary-600 text-xl' />
                            </div>
                            <h3 className='text-xl font-bold text-gray-900 mb-3'>
                                Secure Handling
                            </h3>
                            <p className='text-gray-600'>
                                Advanced security protocols and careful handling procedures protect your
                                valuable shipments throughout the entire logistics process.
                            </p>
                        </div>

                        <div
                            className='bg-gray-50 rounded-xl p-8 transition-all duration-300 hover:shadow-md'
                            data-aos="fade-up"
                            data-aos-delay="300"
                        >
                            <div className='w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4'>
                                <FaGlobeAmericas className='text-primary-600 text-xl' />
                            </div>
                            <h3 className='text-xl font-bold text-gray-900 mb-3'>
                                Global Network
                            </h3>
                            <p className='text-gray-600'>
                                Our extensive international network allows us to deliver seamless logistics solutions
                                across borders with local expertise.
                            </p>
                        </div>

                    </div>
                </div>
            </section>

            {/* Section CTA */}
            <section className='py-20 bg-linear-to-r from-primary-600 to-primary-800 text-white'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                    <div className='text-center'>

                        <h2
                            className='text-3xl md:text-4xl font-bold mb-6'
                            data-aos="fade-up"
                        >
                            We will take care of your cargo and deliver them safe and on time.
                        </h2>

                        <p
                            className='text-xl text-primary-100 max-w-2xl mx-auto mb-10'
                            data-aos="fade-up"
                            data-aos-delay="150"
                        >
                            Experience premium shipping and logistics services with our dedicated team of professionals.
                        </p>

                        <div
                            data-aos="zoom-in"
                            data-aos-delay="300"
                        >
                            <Link
                                href='/contact'
                                className='inline-block bg-white text-primary-700 hover:bg-gray-100 px-8 py-4 rounded-lg font-medium transition-colors'
                            >
                                Contact Us
                            </Link>
                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}

export default Page