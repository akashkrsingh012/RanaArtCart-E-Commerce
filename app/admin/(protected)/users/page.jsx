import Card from "@/components/admin/Card";
import UserTable from "@/components/admin/UserTable";
import { Users, TrendingUp } from "lucide-react";

export default function UsersPage() {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Users</h2>
                <p className="text-slate-500">Manage user accounts and roles.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card
                    title="Total Users"
                    value="892"
                    icon={Users}
                    color="bg-purple-500"
                />
                <Card
                    title="New Users (MoM)"
                    value="+12%"
                    icon={TrendingUp}
                    color="bg-blue-500"
                />
                <Card
                    title="Active Sellers"
                    value="45"
                    icon={Users}
                    color="bg-orange-500"
                />
            </div>

            <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">All Users</h3>
                <UserTable />
            </div>
        </div>
    );
}
