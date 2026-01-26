import Link from "next/link"
import {
  FaCheckCircle, FaTruck, FaBoxOpen, FaClipboardCheck, FaMapMarkerAlt,
  FaUser, FaHome, FaArrowLeft, FaWeight, FaCalendarAlt, FaPhone,
  FaEnvelope, FaMap, FaFileInvoiceDollar, FaPrint, FaCreditCard,
  FaCube, FaPlane, FaRoute, FaExclamationTriangle, FaWarehouse,
  FaBox, FaShippingFast, FaLocationArrow, FaClipboardList, FaHistory,
  FaInfoCircle, FaCircle, FaDotCircle, FaRegCircle, FaShip
} from "react-icons/fa"
import {
  MdEmail,
  MdPhone,
  MdLocationOn,
  MdAccessTime,
  MdOutlineCheckCircle,
  MdOutlineErrorOutline,
  MdOutlineLocalShipping,
  MdOutlineSchedule
} from "react-icons/md"
import Image from "next/image"

import { getShipmentByTracking } from "@/controllers/shipmentController"

// Helper function to get status color
const getStatusColor = (status) => {
  switch (status) {
    case 'Order Confirmed': return 'bg-blue-100 text-blue-800'
    case 'Picked by Courier': return 'bg-purple-100 text-purple-800'
    case 'On The Way': return 'bg-indigo-100 text-indigo-800'
    case 'Custom Hold': return 'bg-amber-100 text-amber-800'
    case 'Delivered': return 'bg-green-100 text-green-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

// Helper function to get status icon
const getStatusIcon = (status) => {
  switch (status) {
    case 'Order Confirmed': return <FaClipboardCheck className="h-6 w-6" />
    case 'Picked by Courier': return <FaTruck className="h-6 w-6" />
    case 'On The Way': return <MdOutlineLocalShipping className="h-6 w-6" />
    case 'Custom Hold': return <MdOutlineErrorOutline className="h-6 w-6" />
    case 'Delivered': return <FaBoxOpen className="h-6 w-6" />
    default: return <FaInfoCircle className="h-6 w-6" />
  }
}

// Helper function to format date
const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Helper function to format date with time
const formatDateTime = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

// Helper function to get last updated time from histories
const getLastUpdated = (histories) => {
  if (!histories || histories.length === 0) return null;
  const sortedHistories = [...histories].sort((a, b) => new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date));
  return sortedHistories[0];
}

// Main component
const Page = async ({ searchParams }) => {
  const { tracking } = await searchParams;

  if (!tracking) {
    return (
      <div className="bg-gray-50 py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">No Tracking Number Provided</h2>
            <p className="text-gray-600 mb-6">Please enter a tracking number to view shipment details.</p>
            <Link href="/track-order" className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
              Go to Tracking Page
            </Link>
          </div>
        </div>
      </div>
    );
  }



  const shipment = await getShipmentByTracking(tracking);


  // Sort histories by date (newest first)
  const sortedHistories = shipment.histories
    ? [...shipment.histories].sort((a, b) => new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date))
    : [];

  const lastUpdated = getLastUpdated(shipment.histories);
  const currentLocation = lastUpdated?.location || 'Not Available';

  // Get status order for progress tracker
  const statusOrder = ['Order Confirmed', 'Picked by Courier', 'On The Way', 'Custom Hold', 'Delivered'];

  return (
    <div className="bg-gray-50 py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tracking result container */}
        <div>
          {/* Tracking & Navigation */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <FaCube className="h-5 w-5 text-primary-600" />
                <h1 className="text-2xl font-bold text-gray-800">Shipment Tracking</h1>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Link href="/" className="flex items-center hover:text-primary-600 transition-colors">
                  <FaHome className="h-4 w-4 mr-1" />
                  Home
                </Link>
                <span>/</span>
                <Link href="/track-order" className="hover:text-primary-600 transition-colors">
                  Tracking
                </Link>
                <span>/</span>
                <span>{shipment.tracking_number}</span>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <Link href="/track-order" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all">
                <FaArrowLeft className="h-4 w-4 mr-2" />
                Back to Tracking
              </Link>
            </div>
          </div>

          {/* Tracking Summary Card */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
            <div className="px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-primary-700 to-primary-600">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="mb-4 md:mb-0">
                  <div className="flex items-center">
                    <FaCube className="h-6 w-6 text-white/90 mr-2" />
                    <h2 className="text-xl font-bold text-white">Tracking Number</h2>
                  </div>
                  <div className="mt-2 font-mono text-2xl md:text-3xl font-bold text-white opacity-90 flex items-center">
                    {shipment.tracking_number}
                    <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white text-primary-800">
                      Verified
                    </span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center px-4 py-2 bg-white/20 backdrop-filter backdrop-blur-sm rounded-lg mb-2">
                    <FaUser className="h-5 w-5 mr-2 text-white" />
                    <span className="text-white font-medium">Current Status:</span>
                    <div className={`ml-2 px-2 py-0.5 rounded-full  text-sm font-medium ${getStatusColor(lastUpdated?.status || shipment.status)}`}>
                      {lastUpdated?.status || shipment.status}
                    </div>
                  </div>
                  <div className="flex items-center text-white text-sm">
                    <MdOutlineSchedule className="h-4 w-4 mr-2 opacity-80" />
                    <span className="opacity-90">
                      Last Updated: {formatDateTime(lastUpdated?.createdAt || lastUpdated?.date || shipment.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipment Information */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Sender Information */}
                <div className="space-y-3 bg-primary-50/60 p-4 rounded-lg border border-primary-100">
                  <div className="flex items-center text-primary-600 mb-2">
                    <FaUser className="h-5 w-5 mr-2" />
                    <h3 className="text-base font-semibold">Sender Information</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <FaUser className="h-4 w-4 text-gray-500 mr-2 shrink-0" />
                      <span className="font-medium text-gray-800">{shipment.sender_name}</span>
                    </div>
                    <div className="flex items-start">
                      <MdLocationOn className="h-4 w-4 text-gray-500 mr-2 shrink-0 mt-0.5" />
                      <span className="font-medium text-gray-700">{shipment.sender_address}</span>
                    </div>
                    <div className="flex items-center">
                      <FaPhone className="h-4 w-4 text-gray-500 mr-2 shrink-0" />
                      <span className="font-medium text-gray-700">{shipment.sender_phone}</span>
                    </div>
                    <div className="flex items-center">
                      <MdEmail className="h-4 w-4 text-gray-500 mr-2 shrink-0" />
                      <span className="font-medium text-gray-700">{shipment.sender_email}</span>
                    </div>
                  </div>
                </div>

                {/* Receiver Information */}
                <div className="space-y-3 bg-primary-50/60 p-4 rounded-lg border border-primary-100">
                  <div className="flex items-center text-primary-600 mb-2">
                    <FaUser className="h-5 w-5 mr-2" />
                    <h3 className="text-base font-semibold">Receiver Information</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <FaUser className="h-4 w-4 text-gray-500 mr-2 shrink-0" />
                      <span className="font-medium text-gray-800">{shipment.receiver_name}</span>
                    </div>
                    <div className="flex items-start">
                      <MdLocationOn className="h-4 w-4 text-gray-500 mr-2 shrink-0 mt-0.5" />
                      <span className="font-medium text-gray-700">{shipment.receiver_address}</span>
                    </div>
                    <div className="flex items-center">
                      <FaPhone className="h-4 w-4 text-gray-500 mr-2 shrink-0" />
                      <span className="font-medium text-gray-700">{shipment.receiver_phone}</span>
                    </div>
                    <div className="flex items-center">
                      <MdEmail className="h-4 w-4 text-gray-500 mr-2 shrink-0" />
                      <span className="font-medium text-gray-700">{shipment.receiver_email}</span>
                    </div>
                  </div>
                </div>

                {/* Shipment Details */}
                <div className="space-y-3 bg-primary-50/60 p-4 rounded-lg border border-primary-100">
                  <div className="flex items-center text-primary-600 mb-2">
                    <FaClipboardList className="h-5 w-5 mr-2" />
                    <h3 className="text-base font-semibold">Shipment Details</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <FaCube className="h-4 w-4 text-gray-500 mr-2 shrink-0" />
                      <span className="text-gray-500 mr-2">Quantity:</span>
                      <span className="font-medium text-gray-800">{shipment.quantity} items</span>
                    </div>
                    <div className="flex items-center">
                      <FaWeight className="h-4 w-4 text-gray-500 mr-2 shrink-0" />
                      <span className="text-gray-500 mr-2">Weight:</span>
                      <span className="font-medium text-gray-800">{shipment.weight || 'N/A'}</span>
                    </div>
                    <div className="flex items-center">
                      <MdOutlineSchedule className="h-4 w-4 text-gray-500 mr-2 shrink-0" />
                      <span className="text-gray-500 mr-2">Shipped:</span>
                      <span className="font-medium text-gray-800">{formatDate(shipment.shipped_date)}</span>
                    </div>
                  </div>
                </div>


                {/* Status Information */}
                <div className="space-y-3 bg-primary-50/60 p-4 rounded-lg border border-primary-100">
                  <div className="flex items-center text-primary-600 mb-2">
                    <FaRoute className="h-5 w-5 mr-2" />
                    <h3 className="text-base font-semibold">Status Information</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <MdAccessTime className="h-4 w-4 text-gray-500 mr-2 shrink-0" />
                      <span className="text-gray-500 mr-2">Status:</span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(lastUpdated?.status || shipment.status)}`}>
                        {lastUpdated?.status || shipment.status}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <FaMapMarkerAlt className="h-4 w-4 text-gray-500 mr-2 shrink-0" />
                      <span className="text-gray-500 mr-2">Location:</span>
                      <span className="font-medium text-gray-800">{lastUpdated?.location || shipment.sender_origin || 'Not Available'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Shipment Progress Tracker */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-800">Shipment Progress</h3>
            </div>
            <div className="p-6">
              <div className="relative">
                {/* Progress Lines */}
                <div className="hidden md:flex absolute top-1/2 left-0 w-full h-1 transform -translate-y-1/2 z-0">
                  {statusOrder.map((status, index) => {
                    // Check if this status exists in histories
                    const statusExists = sortedHistories.some(h => h.status === status);
                    let bgColor = 'bg-gray-200';

                    if (statusExists) {
                      switch (status) {
                        case 'Order Confirmed':
                        case 'Picked by Courier':
                          bgColor = 'bg-blue-500';
                          break;
                        case 'On The Way':
                          bgColor = 'bg-indigo-500';
                          break;
                        case 'Custom Hold':
                          bgColor = 'bg-amber-500';
                          break;
                        case 'Delivered':
                          bgColor = 'bg-green-500';
                          break;
                        default:
                          bgColor = 'bg-gray-200';
                      }
                    }
                    return <div key={index} className={`h-full flex-1 ${bgColor}`}></div>
                  })}
                </div>

                {/* Mobile Progress Line */}
                <div className="md:hidden absolute top-0 left-8 h-full z-0 flex flex-col">
                  {statusOrder.map((status, index) => {
                    // Check if this status exists in histories
                    const statusExists = sortedHistories.some(h => h.status === status);
                    let bgColor = 'bg-gray-200';

                    if (statusExists) {
                      switch (status) {
                        case 'Order Confirmed':
                        case 'Picked by Courier':
                          bgColor = 'bg-blue-500';
                          break;
                        case 'On The Way':
                          bgColor = 'bg-indigo-500';
                          break;
                        case 'Custom Hold':
                          bgColor = 'bg-amber-500';
                          break;
                        case 'Delivered':
                          bgColor = 'bg-green-500';
                          break;
                        default:
                          bgColor = 'bg-gray-200';
                      }
                    }
                    return <div key={index} className={`w-1 flex-1 ${bgColor}`}></div>
                  })}
                </div>

                {/* Progress Steps */}
                <div className="flex flex-col md:flex-row justify-between relative z-10">
                  {statusOrder.map((status, index) => {
                    // Find history for this status
                    const statusHistory = sortedHistories.find(h => h.status === status);
                    const hasStatus = !!statusHistory;

                    let bgColor = 'bg-gray-200';
                    let isCurrent = false;

                    if (hasStatus) {
                      // Determine if this is the current status based on the most recent history
                      const mostRecentHistory = sortedHistories[0];
                      isCurrent = mostRecentHistory.status === status;

                      switch (status) {
                        case 'Order Confirmed':
                        case 'Picked by Courier':
                          bgColor = 'bg-blue-500';
                          break;
                        case 'On The Way':
                          bgColor = 'bg-indigo-500';
                          break;
                        case 'Custom Hold':
                          bgColor = 'bg-amber-500';
                          break;
                        case 'Delivered':
                          bgColor = 'bg-green-500';
                          break;
                        default:
                          bgColor = 'bg-gray-200';
                      }
                    }

                    return (
                      <div key={status} className="flex md:block md:text-center mb-8 md:mb-0">
                        <div className={`shrink-0 flex items-center justify-center w-16 h-16 md:mx-auto rounded-full ${bgColor} text-white shadow-lg border-4 border-white`}>
                          {getStatusIcon(status)}
                        </div>
                        <div className="ml-4 md:ml-0 md:mt-3">
                          <h4 className="text-sm font-semibold text-gray-900">{status}</h4>
                          <p className="text-xs text-gray-500 mt-1">
                            {statusHistory
                              ? formatDateTime(statusHistory.createdAt || statusHistory.date)
                              : 'Pending'
                            }
                          </p>
                          {isCurrent && (
                            <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium bg-amber-100 text-amber-800 rounded-full">
                              Current
                            </span>
                          )}
                          {hasStatus && !isCurrent && (
                            <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                              Completed
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Content Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Left column: Shipment History Timeline */}
            <div className="lg:order-1 bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                <div className="flex items-center">
                  <FaHistory className="h-5 w-5 text-primary-600 mr-2" />
                  <h3 className="text-lg font-bold text-gray-800">Shipment History</h3>
                </div>
              </div>
              <div className="p-6">
                <div className="relative">
                  {/* Timeline Line */}
                  <div className="absolute top-0 left-4 h-full w-0.5 bg-gray-200 z-0"></div>

                  {/* Timeline Items */}
                  <div className="space-y-6">
                    {sortedHistories.length > 0 ? (
                      sortedHistories.map((history, index) => (
                        <div key={history._id} className="relative z-10 flex items-start">
                          <div className={`shrink-0 flex items-center justify-center w-8 h-8 rounded-full text-white shadow-md border-2 border-white ${getStatusColor(history.status).replace('text-', 'bg-').replace('-100', '-500').replace('text-', '')}`}>
                            {getStatusIcon(history.status)}
                          </div>
                          <div className="ml-4">
                            <div className="flex items-center">
                              <span className="text-xs font-medium text-gray-500">
                                {formatDateTime(history.createdAt || history.date)} {history.time && `- ${history.time}`}
                              </span>
                            </div>
                            <div className="mt-1">
                              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(history.status)}`}>
                                {history.status}
                              </span>
                            </div>
                            <div className="mt-2 text-sm text-gray-700">
                              {history.location && (
                                <p className="font-medium">{history.location}</p>
                              )}
                              {history.remark && (
                                <p className="mt-1 text-gray-600">{history.remark}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <FaHistory className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">No shipment history available</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Center/Right column: Live Tracking Map */}
            <div className="lg:order-2 lg:col-span-2 bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="flex items-center px-6 py-4 bg-gray-50 border-b border-gray-200">
                <FaMap className="h-5 w-5 text-primary-600 mr-2" />
                <h3 className="text-lg font-bold text-gray-800">Shipment Route</h3>
                <span className="ml-auto text-xs text-gray-500">Route Visualization</span>
              </div>
              <div className="p-4">
                <div className="relative h-137.5">
                  {/* <div id="shipment_map" className="w-full h-full overflow-hidden leaflet-container leaflet-touch leaflet-retina leaflet-fade-anim">
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                      <div className="text-center">
                        <FaMap className="text-4xl text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-600">Map loading...</p>
                        <p className="text-sm text-gray-500 mt-2">Route visualization</p>
                      </div>
                    </div>
                  </div> */}

                  {/* Route Info Overlay will be position absolute bottom-4 left-4 when map appear*/}
                  <div className=" bg-white bg-opacity-90 backdrop-filter backdrop-blur-sm p-4 rounded-lg shadow-lg max-w-sm">
                    <h4 className="text-sm font-semibold text-gray-800 mb-3">Shipment Route</h4>

                    <div className="space-y-3">
                      <div className="flex items-start">
                        <div className="shrink-0 h-5 w-5 rounded-full bg-blue-500 border-2 border-white shadow-sm flex items-center justify-center mt-0.5">
                          <span className="text-white text-xs font-bold">A</span>
                        </div>
                        <div className="ml-2">
                          <p className="text-xs font-medium text-gray-900">Origin</p>
                          <p className="text-xs text-gray-600 truncate">{shipment.sender_origin || shipment.sender_address}</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="shrink-0 h-5 w-5 rounded-full bg-amber-500 border-2 border-white shadow-sm flex items-center justify-center mt-0.5">
                          <span className="text-white text-xs font-bold">B</span>
                        </div>
                        <div className="ml-2">
                          <p className="text-xs font-medium text-gray-900">Current Location</p>
                          <p className="text-xs text-gray-600 truncate">{currentLocation}</p>
                          {lastUpdated && (
                            <p className="text-xs text-gray-500">
                              Updated: {formatDateTime(lastUpdated.createdAt || lastUpdated.date)}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="shrink-0 h-5 w-5 rounded-full bg-green-500 border-2 border-white shadow-sm flex items-center justify-center mt-0.5">
                          <span className="text-white text-xs font-bold">C</span>
                        </div>
                        <div className="ml-2">
                          <p className="text-xs font-medium text-gray-900">Destination</p>
                          <p className="text-xs text-gray-600 truncate">{shipment.receiver_destination || shipment.receiver_address}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <FaCalendarAlt className="h-4 w-4 text-primary-600 mr-1" />
                          <span className="text-xs font-medium">Expected Delivery:</span>
                        </div>
                        <span className="text-xs font-semibold text-primary-700">
                          {formatDate(shipment.expected_date)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Parcel Information Card */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <div className="flex items-center">
                <FaCube className="h-5 w-5 text-primary-600 mr-2" />
                <h3 className="text-lg font-bold text-gray-800">Parcel Information</h3>
              </div>
            </div>
            <div className="p-6">
              <div className="flex flex-col md:flex-row">
                {/* Parcel Photo */}
                <div className="md:w-1/4 mb-6 md:mb-0 md:pr-6">
                  <div className="bg-gray-100 p-2 rounded-lg aspect-square relative">
                    {shipment.photo ? (
                      <Image
                        src={shipment.photo}
                        className=" rounded-lg object-cover"
                        alt="Parcel"
                        fill
                      />
                    ) : (
                      <div className="w-full h-48 md:h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                        <FaBox className="text-4xl text-gray-400" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Parcel Details */}
                <div className="md:w-3/4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <FaFileInvoiceDollar className="h-5 w-5 text-primary-600 mr-2" />
                        <h4 className="text-sm font-semibold text-gray-800">Payment Method</h4>
                      </div>
                      <p className="text-gray-700 font-medium">{shipment.payment_method}</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <FaWeight className="h-5 w-5 text-primary-600 mr-2" />
                        <h4 className="text-sm font-semibold text-gray-800">Shipping Cost</h4>
                      </div>
                      <p className="text-gray-700">${shipment.shipping_cost?.toLocaleString()}</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <FaCalendarAlt className="h-5 w-5 text-primary-600 mr-2" />
                        <h4 className="text-sm font-semibold text-gray-800">Pickup Date</h4>
                      </div>
                      <p className="text-gray-700">{formatDate(shipment.pickup_date)}</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <FaShippingFast className="h-5 w-5 text-primary-600 mr-2" />
                        <h4 className="text-sm font-semibold text-gray-800">Expected Delivery</h4>
                      </div>
                      <p className="text-gray-700">{formatDate(shipment.expected_date)}</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <FaTruck className="h-5 w-5 text-primary-600 mr-2" />
                        <h4 className="text-sm font-semibold text-gray-800">Carrier</h4>
                      </div>
                      <p className="text-gray-700">{shipment.carrier}</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <FaRoute className="h-5 w-5 text-primary-600 mr-2" />
                        <h4 className="text-sm font-semibold text-gray-800">Tracking Status</h4>
                      </div>
                      <p className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(lastUpdated?.status || shipment.status)}`}>
                        {lastUpdated?.status || shipment.status}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3 justify-center md:justify-start">
                    <Link href={`/invoice/${shipment._id}`} className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all">
                      <FaPrint className="h-4 w-4 mr-2" />
                      Print Receipt
                    </Link>

                    {shipment.payment_method === 'Receiver Pays' && (
                      <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all">
                        <FaCreditCard className="h-4 w-4 mr-2" />
                        Pay Clearance Fee (${shipment.clearance_cost?.toLocaleString()})
                      </button>
                    )}
                  </div>

                  {/* Cost Summary */}
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h4 className="text-sm font-semibold text-gray-800 mb-3">Cost Summary</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Shipping Cost:</span>
                        <span className="font-medium">${shipment.shipping_cost?.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Clearance Cost:</span>
                        <span className="font-medium">${shipment.clearance_cost?.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm border-t border-gray-300 pt-2">
                        <span className="font-semibold text-gray-800">Total Cost:</span>
                        <span className="font-bold text-primary-700">${shipment.total_cost?.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page