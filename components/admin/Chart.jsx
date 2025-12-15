"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CarteisandGrid, CartesianGrid, PieChart, Pie, Cell, Legend } from "recharts";

const revenueData = [
    { name: "Jan", total: 1500 },
    { name: "Feb", total: 2300 },
    { name: "Mar", total: 3200 },
    { name: "Apr", total: 2900 },
    { name: "May", total: 4500 },
    { name: "Jun", total: 5100 },
    { name: "Jul", total: 4800 },
];

const orderStatusData = [
    { name: "Completed", value: 50, color: "#10B981" },
    { name: "Pending", value: 30, color: "#F59E0B" },
    { name: "Cancelled", value: 20, color: "#EF4444" },
];

export function RevenueChart() {
    return (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-[400px]">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Revenue Overview</h3>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis
                        dataKey="name"
                        stroke="#64748B"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis
                        stroke="#64748B"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `$${value}`}
                    />
                    <Tooltip
                        cursor={{ fill: 'transparent' }}
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Bar dataKey="total" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export function OrderStatusChart() {
    return (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-[400px]">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Order Status</h3>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={orderStatusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {orderStatusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Legend verticalAlign="bottom" height={36} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}

const dailyOrdersData = [
    { date: "Mon", orders: 12 },
    { date: "Tue", orders: 19 },
    { date: "Wed", orders: 15 },
    { date: "Thu", orders: 25 },
    { date: "Fri", orders: 32 },
    { date: "Sat", orders: 40 },
    { date: "Sun", orders: 28 },
];

export function DailyOrdersChart() {
    return (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-[400px]">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Daily Orders</h3>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailyOrdersData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis
                        dataKey="date"
                        stroke="#64748B"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis
                        stroke="#64748B"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                    />
                    <Tooltip
                        cursor={{ fill: 'transparent' }}
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Bar dataKey="orders" fill="#10B981" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
