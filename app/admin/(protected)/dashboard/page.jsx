import Card from "@/components/admin/Card";
import { RevenueChart, OrderStatusChart } from "@/components/admin/Chart";
import { ShoppingBag, ShoppingCart, Users, DollarSign } from "lucide-react";

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Dashboard</h2>
                <p className="text-slate-500">Welcome back to your admin panel.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card
                    title="Total Products"
                    value="1,234"
                    icon={ShoppingBag}
                    color="bg-blue-500"
                />
                <Card
                    title="Total Orders"
                    value="456"
                    icon={ShoppingCart}
                    color="bg-emerald-500"
                />
                <Card
                    title="Total Users"
                    value="892"
                    icon={Users}
                    color="bg-purple-500"
                />
                <Card
                    title="Total Revenue"
                    value="$12,345"
                    icon={DollarSign}
                    color="bg-yellow-500"
                />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <RevenueChart />
                <OrderStatusChart />
            </div>
        </div>
    );
}
