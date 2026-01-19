import heroBg from '@/assets/images/about-page-bg.jpg'
import CompanyProfileSection from '@/ui/CompanyProfileSection'
import SectionCTA from '@/ui/SectionCTA'
import SectionMissionVision from '@/ui/SectionMissionVision'
import SectionPartners from '@/ui/SectionPartners'
import SectionSafety from '@/ui/SectionSafety'
import SectionTestimonial from '@/ui/SectionTestimonial'
import StatsSection from '@/ui/StatsSection'
import Link from 'next/link'
import { FaChevronRight } from 'react-icons/fa'
const Page = () => {
    return (
        <>

            <section className="relative h-96 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroBg.src})` }}></div>
                <div className='absolute inset-0 bg-linear-to-r from-primary-900/80 to-primary-700/60'></div>
                <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white'>
                    <h1 className='text-4xl md:text-6xl font-bold mb-4 animate-fade-in'>About Us</h1>
                    <nav className='flex justify-center'>
                        <ul className='flex items-center space-x-2 text-primary-200'>
                            <li>
                                <Link href='/' className='hover:text-white transition-colors'>Home</Link>
                            </li>
                            <li>
                                <FaChevronRight className='text-sm' />
                            </li>
                            <li className='text-white'>About Us</li>
                        </ul>
                    </nav>
                </div>
            </section>

            <CompanyProfileSection />
            <SectionMissionVision />
            <SectionSafety />
            <StatsSection />
            <SectionTestimonial/>
            <SectionPartners/>
            <SectionCTA />
        </>
    )
}

export default Page