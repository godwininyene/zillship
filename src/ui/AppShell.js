'use client'
import logo from '@/assets/images/logo.png'
import '@/app/globals.css'
import { useState } from 'react'
import avatar from '@/assets/images/default.jpg'
import {
    FaHome,
    FaBox,
    FaTruck,
    FaUser,
    FaChartLine,
    FaCog,
    FaBell,
    FaEnvelope,
    FaSearch,
    FaBars,
    FaTimes,
    FaSignOutAlt,
    FaUserCircle,
    FaChevronDown,
    FaShip,
    FaPlane,
    FaWarehouse,
    FaFileInvoice,
    FaMapMarkerAlt,
    FaPhone,
    FaClock,
    FaGlobe
} from "react-icons/fa"
import { MdEmail, MdDashboard } from "react-icons/md"
import Link from "next/link";
import Image from "next/image";



// AppNav Component
const AppNav = ({ user }) => {  
    const [isProfileOpen, setIsProfileOpen] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [signingOut, setSigningOut] = useState(false)

    // const user = {
    //     name: "John Doe",
    //     role: "Admin",
    //     email: "john@example.com",
    //     avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John"
    // }

    const notifications = [
        { id: 1, text: "New shipment created", time: "2 min ago", read: false },
        { id: 2, text: "Custom clearance completed", time: "1 hour ago", read: true },
        { id: 3, text: "Payment received", time: "3 hours ago", read: true },
    ]

    const handleLogout = async () => {
        if (signingOut) return;

        try {
            setSigningOut(true);

            await fetch("/api/users/logout", {
                method: "GET",
            });

            // force full reload so server layouts re-run
            window.location.href = "/login";
        } catch (err) {
            console.error("Logout failed", err);
            setSigningOut(false);
        }
    };



    return (
        <nav className="bg-white border-b border-gray-200 shadow-sm fixed w-full left-0 top-0 z-50">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Left: Mobile menu button & Search */}
                    <div className="flex items-center">
                        {/* Mobile menu button - will be controlled by parent */}
                        <button
                            className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
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
                                    <Image
                                        className="h-8 w-8 rounded-full"
                                        src={avatar}
                                        alt={user.first_name}
                                    />
                                    <div className="hidden md:block ml-3">
                                        <div className="text-sm font-medium text-gray-900">{user.first_name} {" "} {user.last_name}</div>
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
                                  
                                    <button
                                        onClick={handleLogout}
                                        disabled={signingOut}
                                        className="flex items-center cursor-pointer px-4 py-2 w-full text-sm text-red-600 hover:bg-red-50 disabled:opacity-60 disabled:cursor-not-allowed"
                                    >
                                        <FaSignOutAlt className="mr-2 h-4 w-4" />
                                        {signingOut ? "Signing out..." : "Sign out"}
                                    </button>

                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

// Sidebar Component
const Sidebar = ({ isOpen, onClose }) => {
    const [activeItem, setActiveItem] = useState('dashboard')
    const [expandedItems, setExpandedItems] = useState([])

    const navigation = [
        {
            name: 'Dashboard',
            icon: <MdDashboard className="h-5 w-5" />,
            href: '/dashboard',
            key: 'dashboard'
        },
        {
            name: 'Shipments',
            icon: <FaBox className="h-5 w-5" />,
            href: '#',
            key: 'shipments',
            submenu: [
                { name: 'All Shipments', href: '/shipments' },
                { name: 'Create Shipment', href: '/create-shipment' },
                { name: 'Track Shipment', href: '/track-order' },
            ]
        },
        // {
        //   name: 'Transport',
        //   icon: <FaTruck className="h-5 w-5" />,
        //   href: '#',
        //   key: 'transport',
        //   submenu: [
        //     { name: 'Air Freight', icon: <FaPlane className="h-4 w-4" />, href: '/transport/air' },
        //     { name: 'Sea Freight', icon: <FaShip className="h-4 w-4" />, href: '/transport/sea' },
        //     { name: 'Road Transport', icon: <FaTruck className="h-4 w-4" />, href: '/transport/road' },
        //   ]
        // },
        // {
        //   name: 'Warehousing',
        //   icon: <FaWarehouse className="h-5 w-5" />,
        //   href: '/warehousing',
        //   key: 'warehousing'
        // },
        // {
        //   name: 'Customers',
        //   icon: <FaUser className="h-5 w-5" />,
        //   href: '/customers',
        //   key: 'customers'
        // },
        // {
        //   name: 'Invoices',
        //   icon: <FaFileInvoice className="h-5 w-5" />,
        //   href: '/invoices',
        //   key: 'invoices'
        // },
        // {
        //   name: 'Analytics',
        //   icon: <FaChartLine className="h-5 w-5" />,
        //   href: '/analytics',
        //   key: 'analytics'
        // },
    ]

    const toggleSubmenu = (key) => {
        setExpandedItems(prev =>
            prev.includes(key)
                ? prev.filter(item => item !== key)
                : [...prev, key]
        )
    }

    return (
        <>
            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-gray-600 bg-opacity-50 z-30 lg:hidden "
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside className={`
        fixed inset-y-0 pt-16 left-0 z-40 w-64 h-screen bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out
        lg:translate-x-0  lg:inset-auto lg:z-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    {/* <div className="flex items-center h-16 px-4 border-b border-gray-200">
            <div className="h-8 w-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <FaTruck className="text-white" />
            </div>
            <div className="ml-3">
              <h1 className="text-xl font-bold text-gray-900">LogiTrack</h1>
              <p className="text-xs text-gray-500">Global Logistics</p>
            </div>
            <button
              className="ml-auto lg:hidden text-gray-600 hover:text-gray-900"
              onClick={onClose}
            >
              <FaTimes size={20} />
            </button>
          </div> */}

                    {/* Navigation */}
                    <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
                        {navigation.map((item) => (
                            <div key={item.key}>
                                {item.submenu ? (
                                    <div>
                                        <button
                                            onClick={() => toggleSubmenu(item.key)}
                                            className={`
                        w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg transition-colors
                        ${activeItem === item.key
                                                    ? 'bg-primary-50 text-primary-700'
                                                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                                                }
                      `}
                                        >
                                            <div className="flex items-center">
                                                <span className={`mr-3 ${activeItem === item.key ? 'text-primary-600' : 'text-gray-500'}`}>
                                                    {item.icon}
                                                </span>
                                                {item.name}
                                            </div>
                                            <FaChevronDown className={`h-4 w-4 transition-transform ${expandedItems.includes(item.key) ? 'rotate-180' : ''}`} />
                                        </button>

                                        {/* Submenu */}
                                        {expandedItems.includes(item.key) && (
                                            <div className="ml-10 mt-1 space-y-1">
                                                {item.submenu.map((subItem) => (
                                                    <Link
                                                        key={subItem.name}
                                                        href={subItem.href}
                                                        className="flex items-center px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg"
                                                    >
                                                        {subItem.icon && <span className="mr-3 text-gray-400">{subItem.icon}</span>}
                                                        {subItem.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <Link
                                        href={item.href}
                                        onClick={() => setActiveItem(item.key)}
                                        className={`
                      flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors
                      ${activeItem === item.key
                                                ? 'bg-primary-50 text-primary-700'
                                                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                                            }
                    `}
                                    >
                                        <span className={`mr-3 ${activeItem === item.key ? 'text-primary-600' : 'text-gray-500'}`}>
                                            {item.icon}
                                        </span>
                                        {item.name}
                                    </Link>
                                )}
                            </div>
                        ))}
                    </nav>

                    {/* Bottom Section hidden for now */}
                    <div className="hidden p-4 border-t border-gray-200">
                        {/* Support Card */}
                        <div className="bg-primary-50 rounded-lg p-4 mb-4">
                            <div className="flex items-center mb-2">
                                <FaPhone className="h-4 w-4 text-primary-600 mr-2" />
                                <span className="text-sm font-medium text-gray-900">24/7 Support</span>
                            </div>
                            <p className="text-xs text-gray-600">Need help? Contact our support team anytime.</p>
                            <button className="mt-3 w-full bg-primary-600 text-white text-sm font-medium py-2 rounded-lg hover:bg-primary-700 transition-colors">
                                Contact Support
                            </button>
                        </div>

                        {/* Settings */}
                        <a
                            href="/settings"
                            className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-lg"
                        >
                            <FaCog className="h-5 w-5 text-gray-500 mr-3" />
                            Settings
                        </a>
                    </div>
                </div>
            </aside>
        </>
    )
}


export default function AppShell({ children, user }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    return (

        <div className="min-h-screen  relative">
            {/* Top Navigation */}
            <AppNav user={user} />

            {/* Main Content Area */}
            <div className="">
                {/* Sidebar */}
                <Sidebar
                    isOpen={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                />

                {/* Main Content */}
                <main className="lg:ml-64 pt-16">
                    <div className="py-6 px-4 sm:px-6 lg:px-8">
                        {children}
                    </div>
                </main>
            </div>

            {/* Mobile Bottom Navigation (for mobile only) */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4 flex justify-around items-center z-40">
                <button className="flex flex-col items-center p-2">
                    <MdDashboard className="h-5 w-5 text-gray-600" />
                    <span className="text-xs mt-1">Dashboard</span>
                </button>
                <button className="flex flex-col items-center p-2">
                    <FaBox className="h-5 w-5 text-gray-600" />
                    <span className="text-xs mt-1">Shipments</span>
                </button>
                <button className="flex flex-col items-center p-2">
                    <FaSearch className="h-5 w-5 text-gray-600" />
                    <span className="text-xs mt-1">Create</span>
                </button>
                <button className="flex flex-col items-center p-2">
                    <FaUser className="h-5 w-5 text-gray-600" />
                    <span className="text-xs mt-1">Profile</span>
                </button>
            </div>
        </div>

    )
}