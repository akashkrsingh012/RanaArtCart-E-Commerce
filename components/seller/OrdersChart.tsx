"use client"

export default function OrdersChart() {
  // Dummy data for orders chart
  const ordersData = [
    { day: "Mon", orders: 12 },
    { day: "Tue", orders: 19 },
    { day: "Wed", orders: 15 },
    { day: "Thu", orders: 22 },
    { day: "Fri", orders: 18 },
    { day: "Sat", orders: 25 },
    { day: "Sun", orders: 20 },
  ]

  const maxOrders = Math.max(...ordersData.map((d) => d.orders))

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Orders Overview</h3>
          <p className="text-sm text-gray-600">Last 7 days orders</p>
        </div>
        <select className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>Last 7 days</option>
          <option>Last 30 days</option>
        </select>
      </div>

      <div className="flex items-end justify-between gap-2 h-48">
        {ordersData.map((data, index) => {
          const height = (data.orders / maxOrders) * 100
          return (
            <div key={index} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full flex items-end justify-center" style={{ height: "160px" }}>
                <div
                  className="w-full bg-emerald-500 rounded-t-lg transition-all hover:bg-emerald-600"
                  style={{ height: `${height}%`, minHeight: "4px" }}
                ></div>
              </div>
              <span className="text-xs text-gray-600">{data.day}</span>
              <span className="text-xs font-semibold text-gray-900">{data.orders}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}












