import {
  FaBox,
  FaTruck,
  FaPlane,
  FaShip,
  FaPlusCircle,
  FaCalendarAlt,
  FaCheckCircle,
  FaExclamationTriangle,
  FaClock,
  FaArrowRight,
  FaDownload,
  FaFilter
} from "react-icons/fa"
import {
  MdEmail,
  MdLocationOn,
  MdAccessTime
} from "react-icons/md"
// import {
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
//   Legend
// } from 'recharts'
import { getAllShipments } from "@/controllers/shipmentController"
import PieChartCustom from "./PieChartCustom"
import AreaChartCustom from "./AreaChartCustom"
import Link from "next/link"

// Helper function to get status color
const getStatusColor = (status) => {
  switch (status) {
    case 'Delivered':
      return 'bg-green-100 text-green-800'
    case 'Order Confirmed':
      return 'bg-blue-100 text-blue-800'
    case 'Picked by Courier':
      return 'bg-yellow-100 text-yellow-800'
    case 'In Transit':
      return 'bg-purple-100 text-purple-800'
    case 'Pending':
      return 'bg-orange-100 text-orange-800'
    case 'Custom Hold':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

// Helper function to format date
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

// Helper function to calculate statistics from shipments data
const calculateStatistics = (shipments) => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  
  // Filter shipments for current month
  const currentMonthShipments = shipments.filter(shipment => {
    const shipmentDate = new Date(shipment.createdAt);
    return shipmentDate.getMonth() === currentMonth && 
           shipmentDate.getFullYear() === currentYear;
  });
  
  // Status counts
  const statusCounts = {
    delivered: shipments.filter(s => s.status === 'Delivered').length,
    inTransit:shipments?.filter(s => s.status === 'On The Way' || s.status === 'Picked by Courier')?.length || 0,
    pending: shipments.filter(s => s.status === 'Order Confirmed' || s.status === 'Pending').length,
    picked: shipments.filter(s => s.status === 'Picked by Courier').length,
    customHold: shipments.filter(s => s.status === 'Custom Hold').length,
  };
  
  // Total revenue
  const totalRevenue = shipments.reduce((sum, shipment) => sum + (shipment.total_cost || 0), 0);
  
  // Monthly revenue (last 6 months)
  const monthlyStats = [];
  for (let i = 5; i >= 0; i--) {
    const date = new Date(currentYear, currentMonth - i, 1);
    const monthName = date.toLocaleDateString('en-US', { month: 'short' });
    
    const monthShipments = shipments.filter(shipment => {
      const shipmentDate = new Date(shipment.createdAt);
      return shipmentDate.getMonth() === date.getMonth() && 
             shipmentDate.getFullYear() === date.getFullYear();
    });
    
    const monthRevenue = monthShipments.reduce((sum, s) => sum + (s.total_cost || 0), 0);
    
    monthlyStats.push({
      month: monthName,
      shipments: monthShipments.length,
      revenue: monthRevenue
    });
  }
  
  // Transport mode distribution (simplified - in real app, you'd have this data)
  const transportModeData = [
    { name: 'Air Freight', value: Math.floor(shipments.length * 0.4), color: '#3B82F6' },
    { name: 'Sea Freight', value: Math.floor(shipments.length * 0.3), color: '#10B981' },
    { name: 'Road Transport', value: Math.floor(shipments.length * 0.2), color: '#F59E0B' },
    { name: 'Rail', value: Math.floor(shipments.length * 0.1), color: '#8B5CF6' },
  ];
  
  // Status distribution based on actual data
  const statusData = [
    { 
      name: 'Delivered', 
      value: statusCounts.delivered, 
      color: '#10B981' 
    },
    { 
      name: 'In Transit', 
      value: statusCounts.inTransit, 
      color: '#3B82F6' 
    },
    { 
      name: 'Confirmed/Pending', 
      value: statusCounts.pending, 
      color: '#F59E0B' 
    },
    { 
      name: 'Picked by Courier', 
      value: statusCounts.picked, 
      color: '#8B5CF6' 
    },
    { 
      name: 'Custom Hold', 
      value: statusCounts.customHold, 
      color: '#EF4444' 
    },
  ].filter(item => item.value > 0); // Only show statuses that exist

  return {
    totalShipments: shipments.length,
    inTransit: statusCounts.inTransit,
    pending: statusCounts.pending,
    totalRevenue,
    monthlyStats,
    transportModeData,
    statusData,
    currentMonthShipments: currentMonthShipments.length
  };
}

const Page = async () => {
  const shipments = await getAllShipments();
  
  // Calculate statistics from real data
  const stats = calculateStatistics(shipments || []);
  
  // Stats cards data
  const statsCards = [
    {
      title: 'Total Shipments',
      value: stats.totalShipments.toLocaleString(),
      change: '+12%', // You would calculate this based on previous period
      trend: 'up',
      icon: <FaBox className="h-8 w-8" />,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      title: 'In Transit',
      value: stats.inTransit.toString(),
      change: '+8%',
      trend: 'up',
      icon: <FaTruck className="h-8 w-8" />,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      title: 'Pending',
      value: stats.pending.toString(),
      change: '-3%',
      trend: 'down',
      icon: <FaClock className="h-8 w-8" />,
      color: 'bg-yellow-500',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600'
    },
    {
      title: 'Revenue',
      value: `$${stats.totalRevenue.toLocaleString()}`,
      change: '+18%',
      trend: 'up',
      icon: <FaShip className="h-8 w-8" />,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    }
  ];

  // Get latest shipments (sorted by creation date)
  const latestShipments = shipments
    ?.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5) || [];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-linear-to-r from-primary-600 to-primary-700 rounded-2xl p-6 text-white">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold mb-2">Welcome back, Admin Manager!</h1>
            <p className="text-primary-100 text-lg max-w-2xl">
              Yesterday I was clever, so I wanted to change the world. Today I am wiser,
              so I am changing myself.
            </p>
          </div>
          <Link href='/create-shipment' className="mt-4 lg:mt-0 inline-flex items-center justify-center bg-white text-primary-700 hover:bg-gray-100 font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl">
            <FaPlusCircle className="mr-2 h-5 w-5" />
            Create New Shipment
          </Link>
         
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => (
          <div key={index} className={`${stat.bgColor} rounded-xl p-5 shadow-sm border border-gray-100`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mb-2">{stat.value}</p>
                <div className="flex items-center">
                  <span className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change} from last month
                  </span>
                </div>
              </div>
              <div className={`p-3 rounded-full ${stat.textColor} ${stat.bgColor}`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Tables Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Shipment Statistics Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Shipment Statistics</h2>
              <p className="text-gray-600 text-sm">Monthly shipment and revenue overview</p>
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1.5 text-sm font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors">
                Monthly
              </button>
              <button className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 rounded-lg transition-colors">
                Quarterly
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700 rounded-lg">
                <FaDownload className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="h-80">
            <AreaChartCustom stats={stats} />
          </div>
        </div>

        {/* Status Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Status Distribution</h2>
          <div className="h-64">
            <PieChartCustom stats={stats} />
          </div>
        </div>
      </div>

      {/* Additional Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Shipment History */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Latest Shipments</h2>
              <p className="text-gray-600 text-sm">Recently created shipments</p>
            </div>
            <Link href='/shipments' className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center">
              View All
              <FaArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </div>

          {/* Shipments List */}
          <div className="space-y-4">
            {latestShipments.map((shipment) => (
              <div
                key={shipment._id}
                className="p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-bold text-gray-900">{shipment.tracking_number}</h3>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(shipment.status)}`}>
                        {shipment.status}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <MdEmail className="h-4 w-4 mr-2" />
                      <span>{shipment.receiver_email}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center">
                        <MdLocationOn className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-gray-600">
                          {shipment.sender_origin} → {shipment.receiver_destination}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <FaBox className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-gray-600">
                          {shipment.weight ? `${shipment.weight}kg` : `${shipment.quantity} items`}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <MdAccessTime className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-gray-600">Est: {formatDate(shipment.expected_date)}</span>
                      </div>
                      <div className="flex items-center">
                        <FaCalendarAlt className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-gray-600">Shipped: {formatDate(shipment.shipped_date)}</span>
                      </div>
                    </div>
                  </div>
                  <button className="ml-4 p-2 text-gray-400 hover:text-primary-600 rounded-lg hover:bg-gray-50">
                    <FaArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Transport Mode Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Transport Mode</h2>
              <p className="text-gray-600 text-sm">Distribution by transportation type</p>
            </div>
            <button className="p-2 text-gray-500 hover:text-gray-700 rounded-lg">
              <FaFilter className="h-4 w-4" />
            </button>
          </div>
          <div className="h-64">
            {/* <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats.transportModeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={70}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {stats.transportModeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [value, 'Shipments']}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page