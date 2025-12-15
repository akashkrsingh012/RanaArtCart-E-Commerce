import Card from "@/components/admin/Card";
import OrderTable from "@/components/admin/OrderTable";
import { DailyOrdersChart } from "@/components/admin/Chart";
import { ShoppingCart } from "lucide-react";

export default function OrdersPage() {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Orders</h2>
                <p className="text-slate-500">Manage and view order details.</p>
            </div>

            {/* Top Section: Card + Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 space-y-6">
                    <Card
                        title="Total Orders"
                        value="456"
                        icon={ShoppingCart}
                        color="bg-emerald-500"
                        className="h-[180px] flex flex-col justify-center"
                    />
                    <Card
                        title="Pending Orders"
                        value="23"
                        icon={ShoppingCart}
                        color="bg-yellow-500"
                        className="h-[180px] flex flex-col justify-center"
                    />
                </div>
                <div className="lg:col-span-2">
                    <DailyOrdersChart />
                </div>
            </div>

            {/* Order List Table */}
            <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Orders</h3>
                <OrderTable />
            </div>
        </div>
    );
}
