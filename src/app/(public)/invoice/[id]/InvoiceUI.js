'use client'
import Link from "next/link"
import { 
  FaPrint, 
  FaDownload, 
  FaArrowLeft,
  FaBox,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaWeightHanging,
  FaDollarSign,
  FaReceipt,
  FaTruck,
  FaPlane,
  FaShip,
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle
} from "react-icons/fa"

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
  if (!weight) return <FaBox className="h-6 w-6 text-gray-500" />
  const weightNum = parseInt(weight.toString()) || 0
  if (weightNum <= 10) return <FaPlane className="h-6 w-6 text-blue-500" />
  if (weightNum <= 100) return <FaTruck className="h-6 w-6 text-amber-500" />
  return <FaShip className="h-6 w-6 text-green-500" />
}

const getTransportType = (weight) => {
  if (!weight) return 'Standard'
  const weightNum = parseInt(weight.toString()) || 0
  if (weightNum <= 10) return 'Air Freight'
  if (weightNum <= 100) return 'Road Transport'
  return 'Sea Freight'
}

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  } catch {
    return 'Invalid Date'
  }
}

const formatCurrency = (amount) => {
  if (!amount) return '$0.00'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)
}
const InvoiceUI = ({ shipment }) => {
    if (!shipment) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <FaBox className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Shipment Not Found</h2>
                    <p className="text-gray-600 mb-6">The requested shipment invoice could not be found.</p>
                    {/* <Link
                        href="/shipments"
                        className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                    >
                        <FaArrowLeft className="mr-2 h-4 w-4" />
                        Back to Shipments
                    </Link> */}
                </div>
            </div>
        )
    }

    // Calculate additional charges
    const subtotal = (shipment.shipping_cost || 0) + (shipment.clearance_cost || 0)
    const taxes = subtotal * 0.1 // 10% tax for example
    const total = subtotal + taxes

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-6">
            {/* Navigation */}
            {/* <div className="mb-6">
                <Link
                    href="/shipments"
                    className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
                >
                    <FaArrowLeft className="mr-2 h-4 w-4" />
                    Back to Shipments
                </Link>
            </div> */}

            {/* Invoice Container */}
            <div className="max-w-4xl mx-auto mb-12 bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                {/* Header with Actions */}
                <div className="bg-linear-to-r from-primary-600 to-primary-700 text-white p-6 md:p-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold mb-2">Shipping Invoice</h1>
                            <p className="text-primary-100 opacity-90">Invoice #{shipment.tracking_number}</p>
                        </div>
                        <div className="mt-4 md:mt-0 flex items-center space-x-4">
                            <button
                                onClick={() => window.print()}
                                className="inline-flex items-center px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors font-medium backdrop-blur-sm"
                            >
                                <FaPrint className="mr-2 h-4 w-4" />
                                Print Invoice
                            </button>
                            {/* <button className="inline-flex items-center px-4 py-2 bg-white text-primary-700 hover:bg-gray-100 rounded-lg transition-colors font-medium">
                                <FaDownload className="mr-2 h-4 w-4" />
                                Download PDF
                            </button> */}
                        </div>
                    </div>
                </div>

                {/* Invoice Content */}
                <div className="p-6 md:p-8 space-y-8">
                    {/* Company and Shipment Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Company Info */}
                        <div>
                            <div className="flex items-center mb-4">
                                <div className="p-3 bg-primary-50 rounded-lg mr-4">
                                    <FaBox className="h-8 w-8 text-primary-600" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">ZillShip Logistics</h2>
                                    <p className="text-gray-600">Global Logistics & Shipping Solutions</p>
                                </div>
                            </div>
                            <div className="space-y-2 text-gray-600">
                                <p>123 Logistics Street</p>
                                <p>Shipping District, SH 10001</p>
                                <p>contact@zillship.com</p>
                                <p>+1 (555) 123-4567</p>
                            </div>
                        </div>

                        {/* Shipment Info */}
                        <div className="bg-gray-50 rounded-xl p-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Invoice Date</p>
                                    <p className="font-medium">{formatDate(shipment.createdAt)}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Due Date</p>
                                    <p className="font-medium">{formatDate(shipment.expected_date)}</p>
                                </div>
                                <div className="col-span-2 lg:col-span-1">
                                    <p className="text-sm text-gray-500 mb-1">Tracking Number</p>
                                    <p className="font-medium text-primary-600">{shipment.tracking_number}</p>
                                </div>
                                <div className="col-span-2 lg:col-span-1">
                                    <p className="text-sm text-gray-500 mb-1">Status</p>
                                    <span className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(shipment.status)}`}>
                                        {getStatusIcon(shipment.status)}
                                        <span className="ml-2">{shipment.status}</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sender and Receiver Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Sender Information */}
                        <div className="border border-gray-200 rounded-xl p-6">
                            <div className="flex items-center mb-4">
                                <div className="p-2 bg-blue-50 rounded-lg mr-3">
                                    <FaUser className="h-5 w-5 text-blue-600" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900">Sender Information</h3>
                            </div>
                            <div className="space-y-3">
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Full Name</p>
                                    <p className="font-medium">{shipment.sender_name}</p>
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <FaPhone className="h-4 w-4 mr-2" />
                                    <span>{shipment.sender_phone}</span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <FaEnvelope className="h-4 w-4 mr-2" />
                                    <span>{shipment.sender_email}</span>
                                </div>
                                <div className="flex items-start text-gray-600">
                                    <FaMapMarkerAlt className="h-4 w-4 mr-2 mt-1" />
                                    <div>
                                        <p>{shipment.sender_address}</p>
                                        <p className="text-sm text-gray-500">Origin: {shipment.sender_origin}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Receiver Information */}
                        <div className="border border-gray-200 rounded-xl p-6">
                            <div className="flex items-center mb-4">
                                <div className="p-2 bg-green-50 rounded-lg mr-3">
                                    <FaUser className="h-5 w-5 text-green-600" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900">Receiver Information</h3>
                            </div>
                            <div className="space-y-3">
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Full Name</p>
                                    <p className="font-medium">{shipment.receiver_name}</p>
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <FaPhone className="h-4 w-4 mr-2" />
                                    <span>{shipment.receiver_phone}</span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <FaEnvelope className="h-4 w-4 mr-2" />
                                    <span>{shipment.receiver_email}</span>
                                </div>
                                <div className="flex items-start text-gray-600">
                                    <FaMapMarkerAlt className="h-4 w-4 mr-2 mt-1" />
                                    <div>
                                        <p>{shipment.receiver_address}</p>
                                        <p className="text-sm text-gray-500">Destination: {shipment.receiver_destination}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Shipment Details */}
                    <div className="border border-gray-200 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-6">Shipment Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Transport Mode</p>
                                    <div className="flex items-center">
                                        {getTransportIcon(shipment.weight)}
                                        <span className="ml-3 font-medium">{getTransportType(shipment.weight)}</span>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Carrier</p>
                                    <p className="font-medium">{shipment.carrier}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Payment Method</p>
                                    <p className="font-medium">{shipment.payment_method}</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Weight & Quantity</p>
                                    <div className="flex items-center">
                                        <FaWeightHanging className="h-5 w-5 text-gray-400 mr-2" />
                                        <span className="font-medium">{shipment.weight || 'N/A'} kg</span>
                                        <span className="mx-2">•</span>
                                        <span className="font-medium">{shipment.quantity} items</span>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Shipped Date</p>
                                    <div className="flex items-center">
                                        <FaCalendarAlt className="h-4 w-4 text-gray-400 mr-2" />
                                        <span className="font-medium">{formatDate(shipment.shipped_date)}</span>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Expected Delivery</p>
                                    <div className="flex items-center">
                                        <FaCalendarAlt className="h-4 w-4 text-gray-400 mr-2" />
                                        <span className="font-medium">{formatDate(shipment.expected_date)}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Pickup Date</p>
                                    <div className="flex items-center">
                                        <FaCalendarAlt className="h-4 w-4 text-gray-400 mr-2" />
                                        <span className="font-medium">{formatDate(shipment.pickup_date)}</span>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Description</p>
                                    <p className="font-medium">{shipment.description || 'No description provided'}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Pricing Breakdown */}
                    <div className="border border-gray-200 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-6">Pricing Breakdown</h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Price</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    <tr>
                                        <td className="px-4 py-4">
                                            <div>
                                                <p className="font-medium text-gray-900">Shipping Cost</p>
                                                <p className="text-sm text-gray-500">Transportation from {shipment.sender_origin} to {shipment.receiver_destination}</p>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-gray-900">1</td>
                                        <td className="px-4 py-4 text-gray-900">{formatCurrency(shipment.shipping_cost || 0)}</td>
                                        <td className="px-4 py-4 text-gray-900">{formatCurrency(shipment.shipping_cost || 0)}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-4">
                                            <div>
                                                <p className="font-medium text-gray-900">Clearance & Handling</p>
                                                <p className="text-sm text-gray-500">Customs clearance and processing fees</p>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-gray-900">1</td>
                                        <td className="px-4 py-4 text-gray-900">{formatCurrency(shipment.clearance_cost || 0)}</td>
                                        <td className="px-4 py-4 text-gray-900">{formatCurrency(shipment.clearance_cost || 0)}</td>
                                    </tr>
                                    <tr className="bg-gray-50">
                                        <td className="px-4 py-4">
                                            <p className="font-medium text-gray-900">Subtotal</p>
                                        </td>
                                        <td className="px-4 py-4"></td>
                                        <td className="px-4 py-4"></td>
                                        <td className="px-4 py-4 font-medium text-gray-900">{formatCurrency(subtotal)}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-4">
                                            <div>
                                                <p className="font-medium text-gray-900">Tax (10%)</p>
                                                <p className="text-sm text-gray-500">Value added tax</p>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-gray-900">1</td>
                                        <td className="px-4 py-4 text-gray-900">{formatCurrency(taxes)}</td>
                                        <td className="px-4 py-4 text-gray-900">{formatCurrency(taxes)}</td>
                                    </tr>
                                    <tr className="bg-primary-50">
                                        <td className="px-4 py-4">
                                            <p className="font-bold text-gray-900 text-lg">Total Amount</p>
                                        </td>
                                        <td className="px-4 py-4"></td>
                                        <td className="px-4 py-4"></td>
                                        <td className="px-4 py-4 font-bold text-primary-600 text-lg">{formatCurrency(total)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Terms and Conditions */}
                    <div className="border-t border-gray-200 pt-8">
                        <h4 className="text-sm font-semibold text-gray-900 mb-4">Terms & Conditions</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-600">
                            <div>
                                <p className="font-medium mb-2">Shipping Terms:</p>
                                <ul className="list-disc list-inside space-y-1">
                                    <li>Delivery timeframe is estimated</li>
                                    <li>Signature required upon delivery</li>
                                    <li>Insurance coverage up to declared value</li>
                                </ul>
                            </div>
                            <div>
                                <p className="font-medium mb-2">Payment Terms:</p>
                                <ul className="list-disc list-inside space-y-1">
                                    <li>Net 30 days from invoice date</li>
                                    <li>Late fees apply after due date</li>
                                    <li>Payment via bank transfer or credit card</li>
                                </ul>
                            </div>
                            <div>
                                <p className="font-medium mb-2">Notes:</p>
                                <ul className="list-disc list-inside space-y-1">
                                    <li>Track shipment using tracking number</li>
                                    <li>Contact support for any issues</li>
                                    <li>Keep this invoice for your records</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="border-t border-gray-200 py-8 flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="mb-4 md:mb-0">
                            <p className="text-sm text-gray-500">Thank you for choosing ZillShip Logistics</p>
                            <p className="text-sm text-gray-500">For any questions, contact: support@zillship.com</p>
                        </div>
                        <div className="text-right">
                            <div className="inline-flex items-center px-4 py-2 bg-primary-50 rounded-lg">
                                <FaReceipt className="h-5 w-5 text-primary-600 mr-2" />
                                <span className="font-medium text-primary-700">Invoice #{shipment.tracking_number}</span>
                            </div>
                            <p className="text-sm text-gray-500 mt-2">Issued on {formatDate(shipment.createdAt)}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Print Styles */}
            <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .max-w-4xl, .max-w-4xl * {
            visibility: visible;
          }
          .max-w-4xl {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            margin: 0;
            padding: 0;
            box-shadow: none;
          }
          button, .flex.items-center.space-x-4 {
            display: none !important;
          }
          .bg-gradient-to-r {
            background: linear-gradient(to right, #3b82f6, #1d4ed8) !important;
          }
        }
      `}</style>
        </div>
    )
}

export default InvoiceUI