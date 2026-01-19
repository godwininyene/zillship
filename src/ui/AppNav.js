'use client'
import {
  FaCog,
  FaBell,
  FaEnvelope,
  FaSearch,
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaUserCircle,
  FaChevronDown,
  FaGlobe
} from "react-icons/fa"
import { useState } from "react"
import logo from '@/assets/images/logo.png'
const AppNav = ({ user, onMenuClick }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

 

  const notifications = [
    { id: 1, text: "New shipment created", time: "2 min ago", read: false },
    { id: 2, text: "Custom clearance completed", time: "1 hour ago", read: true },
    { id: 3, text: "Payment received", time: "3 hours ago", read: true },
  ]

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm fixed w-full left-0 top-0 z-50">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left: Mobile menu button & Search */}
          <div className="flex items-center">
            {/* Mobile menu button - will be controlled by parent */}
            <button
              className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              onClick={onMenuClick}
            >
              {isMobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>

            {/* Logo/Brand */}
            <div className="hidden lg:flex items-center">
            
              <Image
                src={logo}
                alt="Company Logo"
                className='h-12 w-auto'
                priority
              />
            </div>

            {/* Search */}
            <div className="hidden md:block ml-24">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-64 pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  placeholder="Search shipments..."
                />
              </div>
            </div>
          </div>

          {/* Right: Notifications, Messages, Profile */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <div className="hidden md:block relative">
              <button className="flex items-center p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100">
                <FaGlobe className="h-5 w-5" />
                <span className="ml-2 text-sm">EN</span>
                <FaChevronDown className="ml-1 h-3 w-3" />
              </button>
            </div>

            {/* Messages */}
            <div className="relative">
              <button className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 relative">
                <FaEnvelope className="h-5 w-5" />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
              </button>
            </div>

            {/* Notifications */}
            <div className="relative">
              <button className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 relative">
                <FaBell className="h-5 w-5" />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
              </button>
              {/* Notification dropdown would go here */}
            </div>

            {/* Profile */}
            <div className="relative">
              <button
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                <div className="flex items-center">
                  <img
                    className="h-8 w-8 rounded-full"
                    src={user.avatar}
                    alt={user.name}
                  />
                  <div className="hidden md:block ml-3">
                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                    <div className="text-xs text-gray-500">{user.role}</div>
                  </div>
                  <FaChevronDown className="hidden md:block ml-2 h-4 w-4 text-gray-500" />
                </div>
              </button>

              {/* Profile Dropdown */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  </div>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <FaUserCircle className="inline mr-2 h-4 w-4" />
                    Profile
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <FaCog className="inline mr-2 h-4 w-4" />
                    Settings
                  </a>
                  <div className="border-t border-gray-100"></div>
                  <a href="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                    <FaSignOutAlt className="inline mr-2 h-4 w-4" />
                    Sign out
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default AppNav