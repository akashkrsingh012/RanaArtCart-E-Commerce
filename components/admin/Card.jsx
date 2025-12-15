import { cn } from "@/lib/utils";

export default function Card({ title, value, icon: Icon, color, className }) {
    return (
        <div className={cn("bg-white p-6 rounded-xl border border-slate-200 shadow-sm", className)}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
                    <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
                </div>
                <div className={cn("p-3 rounded-lg", color)}>
                    <Icon className="h-6 w-6 text-white" />
                </div>
            </div>
        </div>
    );
}
