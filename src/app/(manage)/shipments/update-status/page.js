import { getShipment } from "@/controllers/shipmentController";
import Link from "next/link";
import {
    FaArrowLeft,
    FaBox,
    FaUser,
    FaPhone,
    FaEnvelope,
    FaMapMarkerAlt,
    FaCalendarAlt,
    FaWeightHanging,
    FaDollarSign,
    FaTruck,
    FaShippingFast,
    FaCheckCircle,
    FaClock,
    FaExclamationTriangle,
    FaEdit,
    FaSync,
    FaLocationArrow
} from "react-icons/fa";
import UpdateStatusForm from "./UpdateStatusForm";

// Helper functions
const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
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
    switch (status?.toLowerCase()) {
        case 'delivered': return <FaCheckCircle className="h-4 w-4" />
        case 'in transit':
        case 'on the way': return <FaTruck className="h-4 w-4" />
        case 'picked by courier': return <FaShippingFast className="h-4 w-4" />
        case 'custom hold': return <FaExclamationTriangle className="h-4 w-4" />
        case 'order confirmed': return <FaClock className="h-4 w-4" />
        default: return <FaBox className="h-4 w-4" />
    }
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

const formatCurrency = (amount) => {
    if (!amount) return '$0.00'
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount)
}

const Page = async ({ searchParams }) => {
    const { id } = await searchParams;
    const shipment = await getShipment(id);

    if (!shipment) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <FaBox className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Shipment Not Found</h2>
                    <p className="text-gray-600 mb-6">The requested shipment could not be found.</p>
                    <Link
                        href="/shipments"
                        className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                    >
                        <FaArrowLeft className="mr-2 h-4 w-4" />
                        Back to Shipments
                    </Link>
                </div>
            </div>
        )
    }

    
    return (
        <div className="min-h-screen bg-gray-50 ">
            {/* Navigation */}
            <div className="mb-6">
                <Link
                    href="/shipments"
                    className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
                >
                    <FaArrowLeft className="mr-2 h-4 w-4" />
                    Back to Shipments
                </Link>
            </div>

            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Update Shipment Status</h1>
                            <p className="text-gray-600 mt-1">Update tracking information for shipment #{shipment.tracking_number}</p>
                        </div>
                        <div className="mt-4 md:mt-0 flex items-center space-x-4">
                            <Link
                                href={`/shipments/edit/${shipment._id}`}
                                className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors font-medium"
                            >
                                <FaEdit className="mr-2 h-4 w-4" />
                                Edit Details
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Shipment Information */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Shipment Overview Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center">
                                    <div className="p-3 bg-primary-50 rounded-lg mr-4">
                                        <FaBox className="h-6 w-6 text-primary-600" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900">Shipment Information</h2>
                                        <p className="text-gray-600">Tracking: {shipment.tracking_number}</p>
                                    </div>
                                </div>
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(shipment.status)}`}>
                                    {getStatusIcon(shipment.status)}
                                    <span className="ml-2">{shipment.status}</span>
                                </span>
                            </div>

                            {/* Sender and Receiver */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                {/* Sender Card */}
                                <div className="border border-gray-200 rounded-xl p-5">
                                    <div className="flex items-center mb-4">
                                        <div className="p-2 bg-blue-50 rounded-lg mr-3">
                                            <FaUser className="h-5 w-5 text-blue-600" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-900">Sender</h3>
                                    </div>
                                    <div className="space-y-3">
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">Name</p>
                                            <p className="font-medium">{shipment.sender_name}</p>
                                        </div>
                                        <div className="flex items-center text-gray-600">
                                            <FaPhone className="h-4 w-4 mr-2" />
                                            <span className="text-sm">{shipment.sender_phone}</span>
                                        </div>
                                        <div className="flex items-center text-gray-600">
                                            <FaEnvelope className="h-4 w-4 mr-2" />
                                            <span className="text-sm">{shipment.sender_email}</span>
                                        </div>
                                        <div className="flex items-start text-gray-600">
                                            <FaMapMarkerAlt className="h-4 w-4 mr-2 mt-1" />
                                            <div>
                                                <p className="text-sm">{shipment.sender_address}</p>
                                                <p className="text-xs text-gray-500">Origin: {shipment.sender_origin}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Receiver Card */}
                                <div className="border border-gray-200 rounded-xl p-5">
                                    <div className="flex items-center mb-4">
                                        <div className="p-2 bg-green-50 rounded-lg mr-3">
                                            <FaUser className="h-5 w-5 text-green-600" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-900">Receiver</h3>
                                    </div>
                                    <div className="space-y-3">
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">Name</p>
                                            <p className="font-medium">{shipment.receiver_name}</p>
                                        </div>
                                        <div className="flex items-center text-gray-600">
                                            <FaPhone className="h-4 w-4 mr-2" />
                                            <span className="text-sm">{shipment.receiver_phone}</span>
                                        </div>
                                        <div className="flex items-center text-gray-600">
                                            <FaEnvelope className="h-4 w-4 mr-2" />
                                            <span className="text-sm">{shipment.receiver_email}</span>
                                        </div>
                                        <div className="flex items-start text-gray-600">
                                            <FaMapMarkerAlt className="h-4 w-4 mr-2 mt-1" />
                                            <div>
                                                <p className="text-sm">{shipment.receiver_address}</p>
                                                <p className="text-xs text-gray-500">Destination: {shipment.receiver_destination}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Shipment Details Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <div className="flex items-center text-gray-600">
                                        <FaWeightHanging className="h-4 w-4 mr-2" />
                                        <span className="text-sm">Quantity: {shipment.quantity} items</span>
                                    </div>
                                    {shipment.weight && (
                                        <div className="flex items-center text-gray-600">
                                            <FaWeightHanging className="h-4 w-4 mr-2" />
                                            <span className="text-sm">Weight: {shipment.weight} kg</span>
                                        </div>
                                    )}
                                    {shipment.photo && (
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500 mb-1">Package Photo</p>
                                            <img
                                                src={shipment.photo}
                                                alt="Package"
                                                className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                                            />
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center text-gray-600">
                                        <FaDollarSign className="h-4 w-4 mr-2" />
                                        <span className="text-sm">Shipping: {formatCurrency(shipment.shipping_cost)}</span>
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                        <FaDollarSign className="h-4 w-4 mr-2" />
                                        <span className="text-sm">Clearance: {formatCurrency(shipment.clearance_cost)}</span>
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                        <FaDollarSign className="h-4 w-4 mr-2" />
                                        <span className="text-sm font-medium">Total: {formatCurrency(shipment.total_cost)}</span>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center text-gray-600">
                                        <FaCalendarAlt className="h-4 w-4 mr-2" />
                                        <span className="text-sm">Shipped: {formatDate(shipment.shipped_date)}</span>
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                        <FaCalendarAlt className="h-4 w-4 mr-2" />
                                        <span className="text-sm">Pickup: {formatDate(shipment.pickup_date)}</span>
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                        <FaCalendarAlt className="h-4 w-4 mr-2" />
                                        <span className="text-sm">Expected: {formatDate(shipment.expected_date)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Carrier Info */}
                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <div className="flex items-center">
                                    <FaTruck className="h-5 w-5 text-gray-400 mr-3" />
                                    <div>
                                        <p className="text-sm text-gray-500">Carrier</p>
                                        <p className="font-medium">{shipment.carrier}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Route Visualization */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Route Information</h3>
                            <div className="flex items-center justify-between">
                                <div className="text-center">
                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                                        <FaMapMarkerAlt className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <p className="font-medium text-sm">{shipment.sender_origin}</p>
                                    <p className="text-xs text-gray-500">Origin</p>
                                </div>
                                <div className="flex-1 mx-4">
                                    <div className="h-1 bg-linear-to-r from-blue-500 via-purple-500 to-green-500 rounded-full"></div>
                                    <div className="flex justify-between mt-1">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                                        <FaMapMarkerAlt className="h-6 w-6 text-green-600" />
                                    </div>
                                    <p className="font-medium text-sm">{shipment.receiver_destination}</p>
                                    <p className="text-xs text-gray-500">Destination</p>
                                </div>
                            </div>
                            <div className="mt-6 text-center">
                                <p className="text-sm text-gray-600">
                                    <span className="font-medium">Payment Method:</span> {shipment.payment_method}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Update Status Form */}
                    <div className="space-y-6">
                        {/* Update Status Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center mb-6">
                                <div className="p-2 bg-primary-50 rounded-lg mr-3">
                                    <FaSync className="h-5 w-5 text-primary-600" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-900">Update Status</h2>
                            </div>
                            <UpdateStatusForm shipment={shipment} />
                        </div>

                        {/* Status History (Placeholder) */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Status History</h3>
                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <div className="shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                                        <FaCheckCircle className="h-4 w-4 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">Order Confirmed</p>
                                        <p className="text-xs text-gray-500">{formatDate(shipment.createdAt)}</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className="shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                        <FaClock className="h-4 w-4 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">Awaiting Pickup</p>
                                        <p className="text-xs text-gray-500">Pickup scheduled for {formatDate(shipment.pickup_date)}</p>
                                    </div>
                                </div>
                            </div>
                            <button className="w-full mt-4 py-2 text-primary-600 hover:text-primary-700 font-medium text-sm">
                                View Full History →
                            </button>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                            <div className="space-y-3">
                                <Link
                                    href={`/shipments/invoice/${shipment._id}`}
                                    className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <FaBox className="h-5 w-5 text-primary-600 mr-3" />
                                    <span>View Invoice</span>
                                </Link>
                                <Link
                                    href={`/trackingResult?tracking=${shipment.tracking_number}`}
                                    className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <FaMapMarkerAlt className="h-5 w-5 text-blue-600 mr-3" />
                                    <span>Track Shipment</span>
                                </Link>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page