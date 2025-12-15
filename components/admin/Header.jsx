import { User } from "lucide-react";

const ADMIN_NAME = "Admin User";
const ADMIN_EMAIL = "admin@ranaartcart.com";

export default function Header() {
    return (
        <header className="fixed top-0 right-0 left-64 h-16 bg-white border-b border-slate-200 z-40 flex items-center justify-between px-8">
            <div className="flex items-center text-slate-800">
                <span className="text-lg font-semibold">Admin Panel</span>
            </div>
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-medium text-slate-900">Admin User</p>
                        <p className="text-xs text-slate-500">admin@ranaartcart.com</p>
                    </div>
                    <div className="h-10 w-10 bg-slate-100 rounded-full flex items-center justify-center border border-slate-200 text-slate-600">
                        <User className="h-5 w-5" />
                    </div>
                </div>
            </div>
        </header>
    );
}
