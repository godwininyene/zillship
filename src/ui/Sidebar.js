'use client'
import { useState } from "react"
import {
  FaBox,
  FaCog,
  FaChevronDown,
  FaPhone,
} from "react-icons/fa"
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

export default Sidebar