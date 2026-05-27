import { motion } from "framer-motion";
import {
    Users,
    Package,
    ShoppingCart,
    IndianRupee,
    CalendarDays,
    FileText,
} from "lucide-react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";

const stats = [
    { title: "Total Revenue", value: "₹1,24,500", icon: IndianRupee },
    { title: "Total Orders", value: "1,240", icon: ShoppingCart },
    { title: "Products", value: "340", icon: Package },
    { title: "Users", value: "2,890", icon: Users },
    { title: "Appointments", value: "86", icon: CalendarDays },
    { title: "Prescriptions", value: "152", icon: FileText },
];

const chartData = [
    { month: "Jan", sales: 15000 },
    { month: "Feb", sales: 22000 },
    { month: "Mar", sales: 18000 },
    { month: "Apr", sales: 32000 },
    { month: "May", sales: 42000 },
    { month: "Jun", sales: 39000 },
];

export default function Dashboard() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold text-slate-900">Dashboard</h2>
                <p className="text-slate-500">Welcome back, manage your store easily.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {stats.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.08 }}
                            className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-slate-500 text-sm">{item.title}</p>
                                    <h3 className="text-2xl font-bold text-slate-900 mt-1">
                                        {item.value}
                                    </h3>
                                </div>
                                <div className="h-12 w-12 rounded-xl bg-slate-900 text-white flex items-center justify-center">
                                    <Icon />
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-2 bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
                    <h3 className="text-xl font-bold text-slate-900 mb-4">
                        Monthly Sales
                    </h3>

                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="sales" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#0f172a" stopOpacity={0.4} />
                                        <stop offset="95%" stopColor="#0f172a" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Area
                                    type="monotone"
                                    dataKey="sales"
                                    stroke="#0f172a"
                                    fill="url(#sales)"
                                    strokeWidth={3}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
                    <h3 className="text-xl font-bold text-slate-900 mb-4">
                        Recent Activity
                    </h3>

                    <div className="space-y-4">
                        {[
                            "New order placed by Rahul",
                            "Prescription uploaded",
                            "Return request received",
                            "New appointment booked",
                            "Product stock updated",
                        ].map((text) => (
                            <div key={text} className="flex gap-3">
                                <span className="h-3 w-3 rounded-full bg-slate-900 mt-2"></span>
                                <p className="text-sm text-slate-600">{text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}