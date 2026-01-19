import Link from "next/link"
import { 
  FaPlus, 
  FaEye, 
  FaEdit, 
  FaPrint, 
  FaSearch, 
  FaFilter,
  FaSort,
  FaBox,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaChevronRight,
  FaDownload,
  FaTruck,
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle,
  FaShip,
  FaPlane,
  FaWeightHanging,
  FaDollarSign,
  FaReceipt,
  FaSync
} from "react-icons/fa"
import { getAllShipments } from "@/controllers/shipmentController"
import ShipmentActions from "./ShipmentActions"

// Helper functions
const getStatusColor = (status) => {
  switch(status?.toLowerCase()) {
    case 'delivered': return 'bg-green-100 text-green-800'
    case 'in transit':
    case 'on the way': return 'bg-blue-100 text-blue-800'
    case 'picked by courier': return 'bg-purple-100 text-purple-800'
    case 'custom hold': return 'bg-amber-100 text-amber-800'
    case 'order confirmed': return 'bg-indigo-100 text-indigo-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

const getStatusIcon = (status) => {
  switch(status?.toLowerCase()) {
    case 'delivered': return <FaCheckCircle className="h-4 w-4" />
    case 'in transit':
    case 'on the way': return <FaTruck className="h-4 w-4" />
    case 'picked by courier': return <FaTruck className="h-4 w-4" />
    case 'custom hold': return <FaExclamationTriangle className="h-4 w-4" />
    case 'order confirmed': return <FaClock className="h-4 w-4" />
    default: return <FaBox className="h-4 w-4" />
  }
}

const getTransportIcon = (weight) => {
  if (!weight) return <FaBox className="h-4 w-4 text-gray-500" />
  const weightNum = parseInt(weight) || 0
  if (weightNum <= 10) return <FaPlane className="h-4 w-4 text-blue-500" />
  if (weightNum <= 100) return <FaTruck className="h-4 w-4 text-amber-500" />
  return <FaShip className="h-4 w-4 text-green-500" />
}

const getTransportType = (weight) => {
  if (!weight) return 'Standard'
  const weightNum = parseInt(weight) || 0
  if (weightNum <= 10) return 'Air Freight'
  if (weightNum <= 100) return 'Road Transport'
  return 'Sea Freight'
}

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  } catch {
    return 'Invalid Date'
  }
}

const formatDateTime = (dateString) => {
  if (!dateString) return 'N/A'
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  } catch {
    return 'Invalid Date'
  }
}

const formatCurrency = (amount) => {
  if (!amount) return '$0'
  return `$${amount.toLocaleString()}`
}

const Page = async () => {
  // Get real data from API
  const shipments = await getAllShipments()
  
  // Calculate stats from real data
  const totalShipments = shipments?.length || 0
  const totalValue = shipments?.reduce((sum, shipment) => sum + (shipment.total_cost || 0), 0) || 0
  const pendingShipments = shipments?.filter(s => s.status === 'Order Confirmed')?.length || 0
  const inTransitShipments = shipments?.filter(s => s.status === 'On The Way' || s.status === 'Picked by Courier')?.length || 0

  // Calculate transport type distribution
  const transportStats = {
    air: shipments?.filter(s => {
      const weight = parseInt(s.weight) || 0
      return weight <= 10
    })?.length || 0,
    road: shipments?.filter(s => {
      const weight = parseInt(s.weight) || 0
      return weight > 10 && weight <= 100
    })?.length || 0,
    sea: shipments?.filter(s => {
      const weight = parseInt(s.weight) || 0
      return weight > 100
    })?.length || 0,
  }

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'order confirmed', label: 'Order Confirmed' },
    { value: 'Picked by Courier', label: 'Picked by Courier' },
    { value: 'on the way', label: 'On The Way' },
    { value: 'custom hold', label: 'Custom Hold' },
    { value: 'delivered', label: 'Delivered' }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Shipments</h1>
          <p className="text-gray-600 mt-1">Manage and track all your shipments in one place</p>
        </div>
        <div className="mt-4 lg:mt-0">
          <Link 
            href="/create-shipment" 
            className="inline-flex items-center px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium shadow-sm hover:shadow-md"
          >
            <FaPlus className="mr-2 h-4 w-4" />
            Create New Shipment
          </Link>
        </div>
      </div>

      {/* Stats Cards with Real Data */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Shipments</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{totalShipments}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <FaBox className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-600">
            <span>All shipments in system</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">In Transit</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{inTransitShipments}</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <FaTruck className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-2 text-sm text-blue-600 font-medium">
            <span>Active shipments</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{pendingShipments}</p>
            </div>
            <div className="p-3 bg-amber-50 rounded-lg">
              <FaClock className="h-6 w-6 text-amber-600" />
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-600">
            <span>Awaiting pickup</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Value</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{formatCurrency(totalValue)}</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <FaDollarSign className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-2 text-sm text-green-600 font-medium">
            <span>Combined shipment value</span>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by tracking number, sender, receiver, or location..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <select
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 rounded-lg sm:text-sm"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                <FaFilter className="h-4 w-4 text-gray-400" />
              </div>
            </div>

            <div className="relative">
              <select
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 rounded-lg sm:text-sm"
              >
                <option value="createdAt">Date Created</option>
                <option value="expected_date">Delivery Date</option>
                <option value="status">Status</option>
                <option value="total_cost">Value</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                <FaSort className="h-4 w-4 text-gray-400" />
              </div>
            </div>

            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
              <FaDownload className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Shipments Table with Real Data */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tracking Number
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sender & Receiver
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Route
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {shipments?.length > 0 ? (
                shipments.map((shipment) => (
                  <tr 
                    key={shipment._id} 
                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="shrink-0 h-10 w-10 bg-primary-50 rounded-lg flex items-center justify-center">
                          {getTransportIcon(shipment.weight)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {shipment.tracking_number}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center mt-1">
                            <FaWeightHanging className="h-3 w-3 mr-1" />
                            {shipment.weight || 'N/A'} kg • {getTransportType(shipment.weight)}
                          </div>
                        </div>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="space-y-2">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {shipment.sender_name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {shipment.sender_email}
                          </div>
                        </div>
                        <div className="bg-gray-50 p-2 rounded-lg">
                          <div className="flex items-center text-sm text-gray-600">
                            <FaUser className="h-3 w-3 mr-2" />
                            {shipment.receiver_name}
                          </div>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <FaEnvelope className="h-3 w-3 mr-2" />
                            {shipment.receiver_email}
                          </div>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <FaPhone className="h-3 w-3 mr-2" />
                            {shipment.receiver_phone}
                          </div>
                        </div>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                          <span className="text-sm text-gray-900">{shipment.sender_origin || shipment.sender_address}</span>
                        </div>
                        <div className="flex items-center text-gray-400">
                          <FaChevronRight className="h-3 w-3 ml-1 mr-2" />
                          <span className="text-xs">To</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                          <span className="text-sm text-gray-900">{shipment.receiver_destination || shipment.receiver_address}</span>
                        </div>
                        <div className="mt-2 text-xs text-gray-500">
                          <FaCalendarAlt className="inline h-3 w-3 mr-1" />
                          Est: {formatDate(shipment.expected_date)}
                        </div>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="shrink-0 mr-2">
                          {getStatusIcon(shipment.status)}
                        </div>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(shipment.status)}`}>
                          {shipment.status}
                        </span>
                      </div>
                      <div className="mt-1 text-xs text-gray-500">
                        Value: {formatCurrency(shipment.total_cost)}
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDateTime(shipment.createdAt)}
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                       
                        <Link 
                          href={`/shipments/update-status?id=${shipment._id}`}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <FaSync className="h-4 w-4" />
                          
                        </Link>
                        
                        <Link 
                          href={`/shipments/edit/${shipment._id}`}
                          className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                        >
                          <FaEdit className="h-4 w-4" />
                        </Link>
                        <ShipmentActions shipmentId={shipment._id} />
                     
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center">
                    <div className="text-gray-500">
                      <FaBox className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                      <p className="text-lg font-medium text-gray-900">No shipments found</p>
                      <p className="mt-1">Create your first shipment to get started</p>
                      <Link 
                        href="/create-shipment" 
                        className="inline-flex items-center px-4 py-2 mt-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
                      >
                        <FaPlus className="mr-2 h-4 w-4" />
                        Create Shipment
                      </Link>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {/* {shipments?.length > 0 && (
          <div className="bg-gray-50 px-6 py-3 flex items-center justify-between border-t border-gray-200">
            <div className="flex-1 flex justify-between sm:hidden">
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Previous
              </button>
              <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to <span className="font-medium">{shipments.length}</span> of{' '}
                  <span className="font-medium">{totalShipments}</span> shipments
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span className="sr-only">Previous</span>
                    <FaChevronRight className="h-5 w-5 transform rotate-180" />
                  </button>
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-primary-600 hover:bg-gray-50">
                    1
                  </button>
                  <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span className="sr-only">Next</span>
                    <FaChevronRight className="h-5 w-5" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )} */}
      </div>

      {/* Quick Stats with Real Data */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Transport Distribution</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <FaPlane className="h-6 w-6 text-blue-500" />
            </div>
            <p className="text-sm text-gray-600 mb-1">Air Freight</p>
            <p className="text-lg font-bold text-gray-900">{transportStats.air}</p>
          </div>
          <div className="text-center p-4 bg-amber-50 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <FaTruck className="h-6 w-6 text-amber-500" />
            </div>
            <p className="text-sm text-gray-600 mb-1">Road Transport</p>
            <p className="text-lg font-bold text-gray-900">{transportStats.road}</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <FaShip className="h-6 w-6 text-green-500" />
            </div>
            <p className="text-sm text-gray-600 mb-1">Sea Freight</p>
            <p className="text-lg font-bold text-gray-900">{transportStats.sea}</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <FaCalendarAlt className="h-6 w-6 text-purple-500" />
            </div>
            <p className="text-sm text-gray-600 mb-1">Today</p>
            <p className="text-lg font-bold text-gray-900">
              {shipments?.filter(s => {
                const today = new Date().toDateString()
                const createdDate = new Date(s.createdAt).toDateString()
                return createdDate === today
              })?.length || 0}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page