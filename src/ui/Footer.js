'use client'
import logo from '@/assets/images/logo-2.png';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  FaChevronRight, FaClock, FaEnvelope, FaFacebook,
  FaInstagram, FaLinkedin, FaPhone, FaSearch, FaTwitter
} from 'react-icons/fa';

const Footer = () => {
  const router = useRouter();
  const [trackingNumber, setTrackingNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!trackingNumber.trim()) return;

    router.push(`/trackingResult?tracking=${trackingNumber.trim()}`);
  };
  return (
    <footer className="bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 text-white">

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Company Info */}
          <div className="lg:col-span-2" data-aos="fade-up">
            <div className="mb-6">
              <Image
                src={logo}
                alt='Zill Ship logo'
                className='h-12 w-auto mb-4 filter brightness-0 invert'
              />
              <h3 className='text-xl font-semibold mb-4 text-white'>Zill Ship</h3>
              <p className='text-gray-300 mb-6 leading-relaxed'>
                Providing Smart Logistics Solutions Across The World. We deliver excellence in shipping,
                courier services, and package tracking with our global network of trusted partners.
              </p>
              <div className='flex space-x-4'>
                {[FaFacebook, FaTwitter, FaLinkedin, FaInstagram].map((Icon, i) => (
                  <Link
                    key={i}
                    href='/'
                    className='w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors'
                    data-aos="fade-up"
                    data-aos-delay={i * 100}
                  >
                    <Icon className='text-white' />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div data-aos="fade-up" data-aos-delay="200">
            <h4 className='text-lg font-semibold mb-6 text-white'>Quick Links</h4>
            <ul className='space-y-3'>
              {[
                { label: 'Home', href: '/' },
                { label: 'About Us', href: '/about' },
                { label: 'Our Services', href: '/services' },
                { label: 'Track Order', href: '/track-order' },
                { label: 'Contact Us', href: '/contact' },
                { label: 'Diplomatic Services', href: '/diplomatic' }
              ].map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    className='text-gray-300 hover:text-primary-400 transition-colors flex items-center'
                  >
                    <FaChevronRight className='text-xs mr-2 text-primary-500' />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div data-aos="fade-up" data-aos-delay="400">
            <h4 className='text-lg font-semibold mb-6 text-white'>Contact Info</h4>
            <div className='space-y-4'>
              {[
                { icon: FaEnvelope, label: 'Email', value: 'support@zillship.com', href: 'mailto: support@zillship.com' },
                { icon: FaPhone, label: 'Call Us', value: 'TOLL FREE Support', href: 'tel:+914567890' },
                { icon: FaClock, label: 'Working Hours', value: '24/7 Global Support', href: '#' }
              ].map((item, i) => (
                <div key={i} className='flex items-start space-x-3'>
                  <div className='w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center shrink-0 mt-1'>
                    <item.icon className='text-white text-sm' />
                  </div>
                  <div className='ml-3'>
                    <p className='text-gray-400 text-sm'>{item.label}</p>
                    <a href={item.href} className='text-white hover:text-primary-400 transition-colors'>
                      {item.value}
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Track */}
            <div className='mt-8'>
              <h5 className='text-sm font-semibold mb-3 text-white'>Quick Track</h5>
              <form className='space-y-2' onSubmit={handleSubmit}>
                <input
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder='Enter tracking number...'
                  className='w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-sm'
                />
                <button className='w-full flex justify-center items-center cursor-pointer bg-primary-600 text-white py-2 px-3 rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium'>
                  <FaSearch className='text-white mr-1' /> Track
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Footer */}
      <div className='border-t border-gray-700'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0'>
          <p className='text-gray-400 text-sm text-center md:text-left'>
            &copy; {new Date().getFullYear()} Zill Ship. All rights reserved.
          </p>

          <div className='flex items-center space-x-6 text-sm'>
            <Link href='/' className='text-gray-400 hover:text-primary-400 transition-colors'>Privacy Policy</Link>
            <Link href='/' className='text-gray-400 hover:text-primary-400 transition-colors'>Terms of Service</Link>
            <Link href='/' className='text-gray-400 hover:text-primary-400 transition-colors'>Shipping Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
