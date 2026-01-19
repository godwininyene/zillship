import service_right from '@/assets/images/service-right-1.jpg'
import Image from 'next/image'
import { FaBuilding, FaGlobe, FaLanguage, FaShieldAlt } from 'react-icons/fa'

const SectionNetwork = () => {
    return (
        <section className="py-20 bg-gray-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                    {/* Image */}
                    <div 
                        className="lg:col-span-4"
                        data-aos="fade-right"
                        data-aos-duration="1000"
                    >
                        <div className="rounded-xl overflow-hidden shadow-lg">
                            <Image
                                src={service_right}
                                alt='Global Network Services'
                                className='w-full h-auto object-cover'
                            />
                        </div>
                    </div>

                    {/* Content */}
                    <div 
                        className='lg:col-span-8'
                        data-aos="fade-left"
                        data-aos-duration="1000"
                        data-aos-delay="100"
                    >
                        <span 
                            className='text-primary-600 font-semibold tracking-wider uppercase text-sm'
                            data-aos="fade-up"
                            data-aos-delay="200"
                        >
                            Global Presence
                        </span>

                        <h2 
                            className='text-3xl font-bold text-gray-900 mt-2 mb-6'
                            data-aos="fade-up"
                            data-aos-delay="300"
                        >
                            Network Services
                        </h2>

                        <div 
                            className='prose prose-lg text-gray-600'
                            data-aos="fade-up"
                            data-aos-delay="400"
                        >
                            <p>
                                Our customers overseas require a global and local responsive secure support network,
                                which we expertly deliver worldwide. In the United States, we provide translation and
                                interpretation into more than 60 languages by experts who understand your legal,
                                political and business environment. Our trusted staff are security cleared,
                                we can ensure yours are too through our national security vetting service.
                            </p>
                            <p>
                                Our global regional hubs offer a wide range of mission-critical technology,
                                logistic, IT and security services to clients and its partners overseas.
                                Through our overseas secure services to more than 250 diplomatic offices,
                                across 160 countries, we support around 14,000 staff globally,
                                as well as many more from other government departments co-located at posts
                                under the One HMG ethos. We provide complete confidence that information
                                and goods are where they need to be, when they need to be, uncompromised.
                            </p>
                            <p>
                                Our United States based services includes translation, interpreting and national
                                security vetting. Our translators and interpreters work from and into more than
                                60 languages and ensure your message is communicated accurately, consistently
                                and professionally in a language your audience understands. We provide an efficient,
                                one-stop shop for all your translation and interpreting requirements and have subject
                                matter experts who know the legal,
                                political and business environments you are working in.
                            </p>
                        </div>

                        {/* Highlights */}
                        <div className='mt-8 grid grid-cols-1 md:grid-cols-2 gap-4'>
                            
                            <div data-aos="zoom-in" data-aos-delay="0" className='flex items-center space-x-3'>
                                <div className='shrink-0 w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center'>
                                    <FaGlobe className='text-primary-600' />
                                </div>
                                <div className='ml-4'>
                                    <h4 className='font-medium text-gray-900'>Global Coverage</h4>
                                    <p className='text-sm text-gray-600'>160+ countries worldwide</p>
                                </div>
                            </div>

                            <div data-aos="zoom-in" data-aos-delay="100" className='flex items-center space-x-3'>
                                <div className='shrink-0 w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center'>
                                    <FaLanguage className='text-primary-600' />
                                </div>
                                <div className='ml-4'>
                                    <h4 className='font-medium text-gray-900'>Translation Services</h4>
                                    <p className='text-sm text-gray-600'>60+ languages supported</p>
                                </div>
                            </div>

                            <div data-aos="zoom-in" data-aos-delay="200" className='flex items-center space-x-3'>
                                <div className='shrink-0 w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center'>
                                    <FaShieldAlt className='text-primary-600' />
                                </div>
                                <div className='ml-4'>
                                    <h4 className='font-medium text-gray-900'>Security Vetting</h4>
                                    <p className='text-sm text-gray-600'>National security standards</p>
                                </div>
                            </div>

                            <div data-aos="zoom-in" data-aos-delay="300" className='flex items-center space-x-3'>
                                <div className='shrink-0 w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center'>
                                    <FaBuilding className='text-primary-600' />
                                </div>
                                <div className='ml-4'>
                                    <h4 className='font-medium text-gray-900'>Diplomatic Offices</h4>
                                    <p className='text-sm text-gray-600'>250+ locations served</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SectionNetwork
