'use client'
import logo from '@/assets/images/logo.png'
import Image from 'next/image'
import Link from 'next/link'
import { FaPhone, FaClock, FaShip, FaTruck, FaPlane, FaWarehouse, FaBox, FaGlobe, FaSearch } from "react-icons/fa";
import { MdEmail, MdKeyboardArrowDown } from "react-icons/md";
import { useState, useEffect, useRef } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import dynamic from "next/dynamic";

const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    {
        label: 'Services',
        dropdown: [
            { label: 'Sea/Ocean Freight', icon: <FaShip />, href: '/services' },
            { label: 'Road Transport', icon: <FaTruck />, href: '/services' },
            { label: 'Air Freight', icon: <FaPlane />, href: '/services' },
            { label: 'Warehousing', icon: <FaWarehouse />, href: '/services' },
            { label: 'Packaging & Storage', icon: <FaBox />, href: '/services' },
            { label: 'Diplomatic services', icon: <FaGlobe />, href: '/services' }
        ]
    },
    { label: 'Track Shipment', href: '/track-order' },
    { label: 'Contact', href: '/' },
    { label: 'Admin', href: '/login' }

];




// const GoogleTranslate = dynamic(() => import("./GoogleTranslate"), {
//     ssr: false
// });


const PageNav = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const searchRef = useRef(null);

    // Close mobile menu when clicking outside or resizing
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsMobileMenuOpen(false);
            }
        };

        const handleClickOutside = (e) => {
            const target = e.target;

            // Close mobile menu
            if (isMobileMenuOpen && !target.closest('.mobile-menu')) {
                setIsMobileMenuOpen(false);
            }

            // Close search dropdown
            if (isSearchOpen && searchRef.current && !searchRef.current.contains(target)) {
                setIsSearchOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            window.removeEventListener('resize', handleResize);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMobileMenuOpen, isSearchOpen]);

    const toggleDropdown = (label) => {
        setActiveDropdown(activeDropdown === label ? null : label);
    };

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
    };


    return (
        <header className='relative bg-white shadow-lg z-50'>
            {/* Top bar */}
            <div className="bg-primary-700 text-white py-2">
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                    <div className='flex items-center justify-between text-sm'>
                        {/* Left hand side */}
                        <div className='flex items-center space-x-6'>
                            <div className='flex items-center space-x-2'>
                                <FaClock className='text-primary-200' />
                                <span>Open 24/7 for Global Logistics</span>
                            </div>
                            <div className='hidden md:flex items-center space-x-2'>
                                <FaPhone className='text-primary-200' />
                                <span>TOLL FREE Support</span>
                            </div>
                        </div>
                        {/* Right hand side */}
                        <div className='flex items-center space-x-4'>
                            <div className='hidden md:flex items-center space-x-2'>
                                <MdEmail className='text-primary-200' />
                                <a href='mailto:godwinhigh2@gmail.com' className='hover:text-primary-200 transition-colors'>godwinhigh2@gmail.com</a>
                            </div>
                            {/* Google Translator */}
                            {/* <div className="hidden md:flex items-center bg-white/10 px-3 py-1 rounded-md">
                                <GoogleTranslate />
                            </div> */}

                        </div>
                    </div>
                </div>
            </div>

            {/* Main Navigation */}
            <nav className='bg-white border-b border-gray-200'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                    <div className='flex justify-between items-center h-20'>
                        {/* Logo */}
                        <div className='shrink-0 flex items-center'>
                            <Link href='/' className='flex items-center'>
                                <Image
                                    src={logo}
                                    alt="Company Logo"
                                    className='h-12 w-auto'
                                    priority
                                />
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <div className='hidden lg:flex items-center space-x-8'>
                            {navLinks.map((link) => (
                                <div key={link.label} className='relative group'>
                                    {link.dropdown ? (
                                        <>
                                            <button
                                                className='flex items-center space-x-1 text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200 py-2'
                                                onClick={() => toggleDropdown(link.label)}
                                            >
                                                <span>{link.label}</span>
                                                <MdKeyboardArrowDown className='text-lg transition-transform duration-200 group-hover:rotate-180' />
                                            </button>
                                            {/* Dropdown Menu */}
                                            <div className='absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-2'>
                                                {link.dropdown.map((item) => (
                                                    <Link
                                                        key={item.label}
                                                        href={item.href}
                                                        className='flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors duration-150 first:rounded-t-lg last:rounded-b-lg'
                                                    >
                                                        <span className='text-primary-500'>{item.icon}</span>
                                                        <span>{item.label}</span>
                                                    </Link>
                                                ))}
                                            </div>
                                        </>
                                    ) : (
                                        <Link
                                            href={link.href}
                                            className='text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200 py-2 block'
                                        >
                                            {link.label}
                                        </Link>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Desktop Search & CTA */}
                        <div className='hidden lg:flex items-center space-x-4'>
                            {/* Search Button with Dropdown */}
                            <div className='relative' ref={searchRef}>
                                <button
                                    className='p-2 text-gray-500 hover:text-primary-600 transition-colors'
                                    onClick={toggleSearch}
                                >
                                    <FaSearch className='text-lg' />
                                </button>

                                {/* Search Dropdown */}
                                <div
                                    className={`absolute right-0 top-full z-50 mt-2 w-80 bg-white rounded-lg shadow-2xl border border-gray-200 p-4 transition-all duration-200 ${isSearchOpen
                                        ? 'opacity-100 visible translate-y-0'
                                        : 'opacity-0 invisible translate-y-2'
                                        }`}
                                >
                                    <form className='space-y-3'>
                                        <div>
                                            <label className='block text-sm font-medium text-gray-700 mb-2'>
                                                Track Your Shipment
                                            </label>
                                            <input
                                                type='text'
                                                placeholder='Enter tracking number'
                                                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none'
                                            />
                                        </div>
                                        <button
                                            type='submit'
                                            className='w-full flex items-center justify-center bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors font-medium'
                                        >
                                            <FaSearch className='mr-2' />
                                            Track Now
                                        </button>
                                    </form>
                                </div>
                            </div>

                            {/* Get Quote Button */}
                            <Link
                                href='/quote'
                                className='bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors font-medium'
                            >
                                Get Quote
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className='lg:hidden text-gray-700 hover:text-primary-600 text-2xl p-2'
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Toggle mobile menu"
                        >
                            {isMobileMenuOpen ? <FiX /> : <FiMenu />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div
                    className={`lg:hidden mobile-menu fixed inset-0 top-32 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                        }`}
                >
                    <div className='h-full overflow-y-auto'>
                        <div className='px-4 pt-6 pb-8 space-y-4'>
                            {/* Mobile Search */}
                            <div className='pb-4 border-b border-gray-100'>
                                <form className='space-y-3'>
                                    <div>
                                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                                            Track Your Shipment
                                        </label>
                                        <input
                                            type='text'
                                            placeholder='Enter tracking number'
                                            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none'
                                        />
                                    </div>
                                    <button
                                        type='submit'
                                        className='w-full flex items-center justify-center bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors font-medium'
                                    >
                                        <FaSearch className='mr-2' />
                                        Track Now
                                    </button>
                                </form>

                                {/* Get Quote Button for Mobile */}
                                <Link
                                    href='/quote'
                                    className='mt-4 w-full inline-flex justify-center bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors font-medium'
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Get Quote
                                </Link>
                            </div>

                            {navLinks.map((link) => (
                                <div key={link.label} className='border-b border-gray-100 last:border-b-0'>
                                    {link.dropdown ? (
                                        <>
                                            <button
                                                className='w-full flex items-center justify-between py-4 text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200'
                                                onClick={() => toggleDropdown(link.label)}
                                            >
                                                <span>{link.label}</span>
                                                <MdKeyboardArrowDown className={`text-lg transition-transform duration-200 ${activeDropdown === link.label ? 'rotate-180' : ''}`} />
                                            </button>
                                            {/* Mobile Dropdown */}
                                            <div className={`overflow-hidden transition-all duration-300 ${activeDropdown === link.label ? 'max-h-96' : 'max-h-0'}`}>
                                                <div className='pl-4 pb-2 space-y-2'>
                                                    {link.dropdown.map((item) => (
                                                        <Link
                                                            key={item.label}
                                                            href={item.href}
                                                            className='flex items-center space-x-3 py-3 text-gray-600 hover:text-primary-600 transition-colors duration-150'
                                                            onClick={() => setIsMobileMenuOpen(false)}
                                                        >
                                                            <span className='text-primary-500'>{item.icon}</span>
                                                            <span>{item.label}</span>
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <Link
                                            href={link.href}
                                            className='block py-4 text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200'
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            {link.label}
                                        </Link>
                                    )}
                                </div>
                            ))}

                            {/* Mobile Google Translator */}
                            {/* <div className='pt-4 border-t border-gray-100'>
                                <div className='text-sm font-medium text-gray-700 mb-2'>Language</div>
                                <GoogleTranslate />
                                <style jsx global>{`
                                    .goog-te-gadget {
                                        color: transparent !important;
                                        font-size: 0 !important;
                                    }
                                    .goog-te-gadget .goog-te-combo {
                                        width: 100% !important;
                                        margin: 0 !important;
                                        padding: 8px 12px !important;
                                        border: 1px solid #d1d5db !important;
                                        border-radius: 6px !important;
                                        background: white !important;
                                        color: #374151 !important;
                                        font-size: 14px !important;
                                        cursor: pointer !important;
                                    }
                                    .goog-te-gadget .goog-te-combo:hover {
                                        border-color: #9ca3af !important;
                                    }
                                    .goog-te-banner-frame {
                                        display: none !important;
                                    }
                                    body {
                                        top: 0 !important;
                                    }
                                `}</style>
                            </div> */}
                        </div>

                        {/* Mobile Contact Info */}
                        <div className='border-t border-gray-100 px-4 py-6 bg-gray-50'>
                            <div className='space-y-4'>
                                <div className='flex items-center space-x-2'>
                                    <FaPhone className='text-primary-500' />
                                    <span className='text-gray-700'>TOLL FREE Support</span>
                                </div>
                                <div className='flex items-center space-x-2'>
                                    <MdEmail className='text-primary-500' />
                                    <a
                                        href='mailto:godwinhigh2@gmail.com'
                                        className='text-gray-700 hover:text-primary-600 transition-colors'
                                    >
                                        godwinhigh2@gmail.com
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default PageNav;