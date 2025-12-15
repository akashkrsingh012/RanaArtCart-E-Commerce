"use client"

export default function SalesChart() {
  // Dummy data for chart
  const salesData = [
    { month: "Jan", sales: 12000 },
    { month: "Feb", sales: 19000 },
    { month: "Mar", sales: 15000 },
    { month: "Apr", sales: 22000 },
    { month: "May", sales: 18000 },
    { month: "Jun", sales: 25000 },
  ]

  const maxSales = Math.max(...salesData.map((d) => d.sales))

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Sales Overview</h3>
          <p className="text-sm text-gray-600">Last 6 months revenue</p>
        </div>
        <select className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>Last 6 months</option>
          <option>Last year</option>
        </select>
      </div>

      <div className="flex items-end justify-between gap-2 h-48">
        {salesData.map((data, index) => {
          const height = (data.sales / maxSales) * 100
          return (
            <div key={index} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full flex items-end justify-center" style={{ height: "160px" }}>
                <div
                  className="w-full bg-blue-500 rounded-t-lg transition-all hover:bg-blue-600"
                  style={{ height: `${height}%`, minHeight: "4px" }}
                ></div>
              </div>
              <span className="text-xs text-gray-600">{data.month}</span>
              <span className="text-xs font-semibold text-gray-900">₹{(data.sales / 1000).toFixed(0)}k</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}












