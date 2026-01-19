import Link from "next/link"
import {
  FaCheckCircle, FaTruck, FaBoxOpen, FaClipboardCheck, FaMapMarkerAlt,
  FaUser, FaHome, FaArrowLeft, FaWeight, FaCalendarAlt, FaPhone,
  FaEnvelope, FaMap, FaFileInvoiceDollar, FaPrint, FaCreditCard,
  FaCube, FaPlane, FaRoute, FaExclamationTriangle, FaWarehouse,
  FaBox, FaShippingFast, FaLocationArrow, FaClipboardList, FaHistory,
  FaInfoCircle, FaCircle, FaDotCircle, FaRegCircle
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

import { trackShipment } from "@/lib/shipments"
import { getShipmentByTracking } from "@/controllers/shipmentController"

const Page = async({searchParams}) => {

  const{tracking} = await searchParams;

  const shipment = await getShipmentByTracking(tracking);
  console.log(shipment);
  


  
  
  return (
    <div className="bg-gray-50 py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hide this container for now */}
        <div className="hidden">
          {/* Loading State */}
          <div className="flex flex-col items-center justify-center p-8 bg-white rounded-xl shadow-lg">
            <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <h4 className="text-lg font-medium text-gray-700">
              Fetching Result for Tracking Number: 1234567890...
            </h4>
          </div>
        </div>

        {/* Tracking result container  */}
        <div className="">
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
                <span>Tracking</span>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <Link href="/" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all">
                <FaArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
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
                    1234567890
                                    <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white text-primary-800">
                                        Verified
                                    </span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center px-4 py-2 bg-white/20 backdrop-filter backdrop-blur-sm rounded-lg mb-2">
                    <FaUser className="h-5 w-5 mr-2 text-white" />
                    <span className="text-white font-medium">Current Status:</span>
                    <div className="ml-2 px-2 py-0.5 rounded-full bg-amber-600 text-white text-sm font-medium">
                      Custom Hold
                    </div>
                  </div>
                  <div className="flex items-center text-white text-sm">
                    <MdOutlineSchedule className="h-4 w-4 mr-2 opacity-80" />
                    <span className="opacity-90">Last Updated: Aug 26, 2025 - 09:56 AM</span>
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
                      <FaUser className="h-4 w-4 text-gray-500 mr-2 flex-shrink-0" />
                      <span className="font-medium text-gray-800">eva cruise</span>
                    </div>
                    <div className="flex items-start">
                      <MdLocationOn className="h-4 w-4 text-gray-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="font-medium text-gray-700">sssssssssssssssss</span>
                    </div>
                    <div className="flex items-center">
                      <FaPhone className="h-4 w-4 text-gray-500 mr-2 flex-shrink-0" />
                      <span className="font-medium text-gray-700">12334455555</span>
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
                      <FaUser className="h-4 w-4 text-gray-500 mr-2 flex-shrink-0" />
                      <span className="font-medium text-gray-800">User Test</span>
                    </div>
                    <div className="flex items-start">
                      <MdLocationOn className="h-4 w-4 text-gray-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="font-medium text-gray-700">ssfffddddddddddddd</span>
                    </div>
                    <div className="flex items-center">
                      <FaPhone className="h-4 w-4 text-gray-500 mr-2 flex-shrink-0" />
                      <span className="font-medium text-gray-700">34444443</span>
                    </div>
                    <div className="flex items-center">
                      <MdEmail className="h-4 w-4 text-gray-500 mr-2 flex-shrink-0" />
                      <span className="font-medium text-gray-700">brytedree@gmail.com</span>
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
                      <FaWeight className="h-4 w-4 text-gray-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-500 mr-2">Weight:</span>
                      <span className="font-medium text-gray-800">3 kg</span>
                    </div>
                    <div className="flex items-center">
                      <FaPlane className="h-4 w-4 text-gray-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-500 mr-2">Type:</span>
                      <span className="font-medium text-gray-800">Air Freight</span>
                    </div>
                    <div className="flex items-center">
                      <MdOutlineSchedule className="h-4 w-4 text-gray-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-500 mr-2">Shipped:</span>
                      <span className="font-medium text-gray-800">May 07, 2025</span>
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
                      <MdAccessTime className="h-4 w-4 text-gray-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-500 mr-2">Status:</span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                        Custom Hold
                      </span>
                    </div>
                    <div className="flex items-center">
                      <FaMapMarkerAlt className="h-4 w-4 text-gray-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-500 mr-2">Location:</span>
                      <span className="font-medium text-gray-800">East Midlands Airport</span>
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
                  {/* Line 1: Order Confirmed to Picked */}
                  <div className="h-full flex-1 bg-primary-600"></div>

                  {/* Line 2: Picked to On The Way */}
                  <div className="h-full flex-1 bg-primary-600"></div>

                  {/* Line 3: On The Way to Custom Hold */}
                  <div className="h-full flex-1 bg-amber-500"></div>

                  {/* Line 4: Custom Hold to Delivered */}
                  <div className="h-full flex-1 bg-green-500"></div>
                </div>

                {/* Mobile Progress Line with Colored Segments */}
                <div className="md:hidden absolute top-0 left-8 h-full z-0 flex flex-col">
                  {/* Line 1: To Picked */}
                  <div className="w-1 flex-1 bg-primary-600"></div>

                  {/* Line 2: To On The Way */}
                  <div className="w-1 flex-1 bg-primary-600"></div>

                  {/* Line 3: To Custom Hold */}
                  <div className="w-1 flex-1 bg-amber-500"></div>

                  {/* Line 4: To Delivered */}
                  <div className="w-1 flex-1 bg-green-500"></div>
                </div>

                {/* Progress Steps */}
                <div className="flex flex-col md:flex-row justify-between relative z-10">
                  {/* Step 1: Order Confirmed */}
                  <div className="flex md:block md:text-center mb-8 md:mb-0">
                    <div className="shrink-0 flex items-center justify-center w-16 h-16 md:mx-auto rounded-full bg-primary-600 text-white shadow-lg border-4 border-white">
                      <FaCheckCircle className="h-6 w-6" />
                    </div>
                    <div className="ml-4 md:ml-0 md:mt-3">
                      <h4 className="text-sm font-semibold text-gray-900">Order Confirmed</h4>
                      <p className="text-xs text-gray-500 mt-1">May 07, 2025</p>
                    </div>
                  </div>

                  {/* Step 2: Picked by Courier */}
                  <div className="flex md:block md:text-center mb-8 md:mb-0">
                    <div className="shrink-0 flex items-center justify-center w-16 h-16 md:mx-auto rounded-full bg-primary-600 text-white shadow-lg border-4 border-white">
                      <FaTruck className="h-6 w-6" />
                    </div>
                    <div className="ml-4 md:ml-0 md:mt-3">
                      <h4 className="text-sm font-semibold text-gray-900">Picked by Courier</h4>
                      <p className="text-xs text-gray-500 mt-1">May 10, 2025</p>
                    </div>
                  </div>

                  {/* Step 3: On The Way */}
                  <div className="flex md:block md:text-center mb-8 md:mb-0">
                    <div className="shrink-0 flex items-center justify-center w-16 h-16 md:mx-auto rounded-full bg-primary-600 text-white shadow-lg border-4 border-white">
                      <MdOutlineLocalShipping className="h-6 w-6" />
                    </div>
                    <div className="ml-4 md:ml-0 md:mt-3">
                      <h4 className="text-sm font-semibold text-gray-900">On The Way</h4>
                      <p className="text-xs text-gray-500 mt-1">May 10, 2025</p>
                    </div>
                  </div>

                  {/* Step 4: Custom Hold */}
                  <div className="flex md:block md:text-center mb-8 md:mb-0">
                    <div className="shrink-0 flex items-center justify-center w-16 h-16 md:mx-auto rounded-full bg-amber-500 text-white shadow-lg border-4 border-white">
                      <MdOutlineErrorOutline className="h-6 w-6" />
                    </div>
                    <div className="ml-4 md:ml-0 md:mt-3">
                      <h4 className="text-sm font-semibold text-gray-900">Custom Hold</h4>
                      <p className="text-xs text-gray-500 mt-1">Aug 26, 2025</p>
                    </div>
                  </div>

                  {/* Step 5: Delivered */}
                  <div className="flex md:block md:text-center">
                    <div className="shrink-0 flex items-center justify-center w-16 h-16 md:mx-auto rounded-full bg-green-500 text-white shadow-lg border-4 border-white">
                      <FaBoxOpen className="h-6 w-6" />
                    </div>
                    <div className="ml-4 md:ml-0 md:mt-3">
                      <h4 className="text-sm font-semibold text-gray-900">Delivered</h4>
                      <p className="text-xs text-gray-500 mt-1">May 10, 2025</p>
                    </div>
                  </div>
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
                    <div className="relative z-10 flex items-start">
                      <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-amber-500 text-white shadow-md border-2 border-white">
                        <MdOutlineErrorOutline className="h-4 w-4" />
                      </div>
                      <div className="ml-4">
                        <div className="flex items-center">
                          <span className="text-xs font-medium text-gray-500">Aug 26, 2025 - 09:56 AM</span>
                        </div>
                        <div className="mt-1">
                          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-amber-100 text-amber-800">
                            Custom Hold
                          </span>
                        </div>
                        <div className="mt-2 text-sm text-gray-700">
                          <p className="font-medium"></p>
                          <p className="mt-1 text-gray-600">Pending customs clearance.</p>
                        </div>
                      </div>
                    </div>
                    <div className="relative z-10 flex items-start">
                      <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-green-500 text-white shadow-md border-2 border-white">
                        <FaCheckCircle className="h-4 w-4" />
                      </div>
                      <div className="ml-4">
                        <div className="flex items-center">
                          <span className="text-xs font-medium text-gray-500">May 10, 2025 - 07:00 PM</span>
                        </div>
                        <div className="mt-1">
                          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                            Delivered
                          </span>
                        </div>
                        <div className="mt-2 text-sm text-gray-700">
                          <p className="font-medium">Garden City, GA 31408</p>
                          <p className="mt-1 text-gray-600">Delivery</p>
                        </div>
                      </div>
                    </div>
                    <div className="relative z-10 flex items-start">
                      <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-amber-500 text-white shadow-md border-2 border-white">
                        <MdOutlineErrorOutline className="h-4 w-4" />
                      </div>
                      <div className="ml-4">
                        <div className="flex items-center">
                          <span className="text-xs font-medium text-gray-500">May 10, 2025 - 06:58 PM</span>
                        </div>
                        <div className="mt-1">
                          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-amber-100 text-amber-800">
                            Custom Hold
                          </span>
                        </div>
                        <div className="mt-2 text-sm text-gray-700">
                          <p className="font-medium">Hustfed</p>
                          <p className="mt-1 text-gray-600">Blob</p>
                        </div>
                      </div>
                    </div>
                    <div className="relative z-10 flex items-start">
                      <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary-600 text-white shadow-md border-2 border-white">
                        <FaLocationArrow className="h-4 w-4" />
                      </div>
                      <div className="ml-4">
                        <div className="flex items-center">
                          <span className="text-xs font-medium text-gray-500">May 10, 2025 - 02:30 PM</span>
                        </div>
                        <div className="mt-1">
                          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                            On The Way
                          </span>
                        </div>
                        <div className="mt-2 text-sm text-gray-700">
                          <p className="font-medium">Abuja</p>
                          <p className="mt-1 text-gray-600">ddddddddd</p>
                        </div>
                      </div>
                    </div>
                    <div className="relative z-10 flex items-start">
                      <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary-600 text-white shadow-md border-2 border-white">
                        <FaTruck className="h-4 w-4" />
                      </div>
                      <div className="ml-4">
                        <div className="flex items-center">
                          <span className="text-xs font-medium text-gray-500">May 10, 2025 - 02:16 PM</span>
                        </div>
                        <div className="mt-1">
                          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                            Picked by Courier
                          </span>
                        </div>
                        <div className="mt-2 text-sm text-gray-700">
                          <p className="font-medium">London</p>
                          <p className="mt-1 text-gray-600">Order picked up awaiting transportation</p>
                        </div>
                      </div>
                    </div>
                    <div className="relative z-10 flex items-start">
                      <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary-600 text-white shadow-md border-2 border-white">
                        <FaClipboardCheck className="h-4 w-4" />
                      </div>
                      <div className="ml-4">
                        <div className="flex items-center">
                          <span className="text-xs font-medium text-gray-500">May 10, 2025 - 02:12 PM</span>
                        </div>
                        <div className="mt-1">
                          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                            Order confirmed
                          </span>
                        </div>
                        <div className="mt-2 text-sm text-gray-700">
                          <p className="font-medium">Finland</p>
                          <p className="mt-1 text-gray-600">Order confirmed awaiting pickup</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Center/Right column: Live Tracking Map (span 2 columns on larger screen) */}
            <div className="lg:order-2 lg:col-span-2 bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="flex items-center px-6 py-4 bg-gray-50 border-b border-gray-200">
                <FaMap className="h-5 w-5 text-primary-600 mr-2" />
                <h3 className="text-lg font-bold text-gray-800">Complete Shipment Route</h3>
                <span className="ml-auto text-xs text-gray-500">(Fixed Map View)</span>
              </div>
              <div className="p-0">
                <div className="relative h-137.5">
                  {/* Using Leaflet.js for mapping with yellow route lines - doesn't require API key */}
                  <div id="shipment_map" className="w-full h-full overflow-hidden leaflet-container leaflet-touch leaflet-retina leaflet-fade-anim">
                    {/* Map placeholder */}
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                      <div className="text-center">
                        <FaMap className="text-4xl text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-600">Map loading...</p>
                        <p className="text-sm text-gray-500 mt-2">Open in Google Maps</p>
                      </div>
                    </div>
                  </div>
                  {/* Route Info Overlay */}
                  <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 backdrop-filter backdrop-blur-sm p-4 rounded-lg shadow-lg max-w-sm">
                    <h4 className="text-sm font-semibold text-gray-800 mb-3">Shipment Route</h4>

                    <div className="space-y-3">
                      <div className="flex items-start">
                        <div className="shrink-0 h-5 w-5 rounded-full bg-blue-500 border-2 border-white shadow-sm flex items-center justify-center mt-0.5">
                          <span className="text-white text-xs font-bold">A</span>
                        </div>
                        <div className="ml-2">
                          <p className="text-xs font-medium text-gray-900">Origin Point</p>
                          <p className="text-xs text-gray-600 truncate">sssssssssssssssss</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="shrink-0 h-5 w-5 rounded-full bg-amber-500 border-2 border-white shadow-sm flex items-center justify-center mt-0.5">
                          <span className="text-white text-xs font-bold">B</span>
                        </div>
                        <div className="ml-2">
                          <p className="text-xs font-medium text-gray-900">Current Location</p>
                          <p className="text-xs text-gray-600 truncate">East Midlands Airport</p>
                          <p className="text-xs text-gray-500">
                            Updated: Aug 26, 2025 - 09:56 AM
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="shrink-0 h-5 w-5 rounded-full bg-green-500 border-2 border-white shadow-sm flex items-center justify-center mt-0.5">
                          <span className="text-white text-xs font-bold">C</span>
                        </div>
                        <div className="ml-2">
                          <p className="text-xs font-medium text-gray-900">Destination</p>
                          <p className="text-xs text-gray-600 truncate">ssfffddddddddddddd</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <FaMapMarkerAlt className="h-4 w-4 text-primary-600 mr-1" />
                          <span className="text-xs font-medium">Estimated Distance:</span>
                        </div>
                        <span id="route_distance" className="text-xs font-semibold text-primary-700">Calculating...</span>
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
                <div className="md:w-1/4 mb-6 md:mb-0 md:pr-6">
                  <div className="bg-gray-100 p-2 rounded-lg">
                    <img 
                      src="https://zillship.karamelscript.com.ng/public/shipment_photos/1763899157_20251030_080223.png" 
                      className="w-full h-auto rounded-lg object-cover" 
                      alt="Parcel photo" 
                    />
                  </div>
                </div>

                <div className="md:w-3/4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <FaFileInvoiceDollar className="h-5 w-5 text-primary-600 mr-2" />
                        <h4 className="text-sm font-semibold text-gray-800">Duty Fees</h4>
                      </div>
                      <p className="text-green-600 font-semibold">Paid</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <FaWeight className="h-5 w-5 text-primary-600 mr-2" />
                        <h4 className="text-sm font-semibold text-gray-800">Weight</h4>
                      </div>
                      <p className="text-gray-700">3 kg</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <FaCalendarAlt className="h-5 w-5 text-primary-600 mr-2" />
                        <h4 className="text-sm font-semibold text-gray-800">Pickup Date</h4>
                      </div>
                      <p className="text-gray-700">May 07, 2025 - 04:09 PM</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <FaShippingFast className="h-5 w-5 text-primary-600 mr-2" />
                        <h4 className="text-sm font-semibold text-gray-800">Expected Delivery</h4>
                      </div>
                      <p className="text-gray-700">May 04, 2025 - 06:11 PM</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <FaPlane className="h-5 w-5 text-primary-600 mr-2" />
                        <h4 className="text-sm font-semibold text-gray-800">Delivery Mode</h4>
                      </div>
                      <p className="text-gray-700">Air Freight</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <FaRoute className="h-5 w-5 text-primary-600 mr-2" />
                        <h4 className="text-sm font-semibold text-gray-800">Tracking Status</h4>
                      </div>
                      <p className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                        Custom Hold
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3 justify-center md:justify-start">
                    <a 
                      href="https://zillship.karamelscript.com.ng/printnow/218" 
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all"
                    >
                      <FaPrint className="h-4 w-4 mr-2" />
                      Print Receipt
                    </a>

                    <a 
                      href="https://zillship.karamelscript.com.ng/deposits?courier_id=218" 
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all"
                    >
                      <FaCreditCard className="h-4 w-4 mr-2" />
                      Pay Clearance Fee (4,688.00)
                    </a>
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