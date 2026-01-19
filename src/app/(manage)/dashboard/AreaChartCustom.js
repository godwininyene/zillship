'use client'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
const AreaChartCustom = ({stats}) => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={stats.monthlyStats}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis
                    dataKey="month"
                    stroke="#6B7280"
                    fontSize={12}
                />
                <YAxis
                    stroke="#6B7280"
                    fontSize={12}
                    tickFormatter={(value) => `$${value / 1000}k`}
                />
                <Tooltip
                    formatter={(value, name) => {
                        if (name === 'revenue') return [`$${value.toLocaleString()}`, 'Revenue']
                        return [value, 'Shipments']
                    }}
                    labelFormatter={(label) => `Month: ${label}`}
                    contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #E5E7EB',
                        borderRadius: '8px'
                    }}
                />
                <Area
                    type="monotone"
                    dataKey="shipments"
                    stroke="#3B82F6"
                    fill="#3B82F6"
                    fillOpacity={0.2}
                    strokeWidth={2}
                    name="Shipments"
                />
                <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#10B981"
                    fill="#10B981"
                    fillOpacity={0.2}
                    strokeWidth={2}
                    name="Revenue"
                />
            </AreaChart>
        </ResponsiveContainer>
    )
}

export default AreaChartCustom 