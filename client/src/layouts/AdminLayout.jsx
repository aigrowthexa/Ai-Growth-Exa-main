import { Outlet, NavLink } from "react-router-dom";
import {
    LayoutDashboard,
    Users,
    Briefcase,
    Newspaper,
    Cpu,
    Mail,
    Menu,
    X,
    Bell,
    Search,
} from "lucide-react";
import { useState } from "react";

const links = [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { name: "Users", path: "/admin/users", icon: Users },
    { name: "Career", path: "/admin/careers", icon: Briefcase },
    { name: "Blog", path: "/admin/blogs", icon: Newspaper },
    { name: "Services", path: "/admin/services", icon: Cpu },
    { name: "Contact", path: "/admin/contacts", icon: Mail },
];

export default function AdminLayout() {
    const [open, setOpen] = useState(false);

    return (
        <div className="min-h-screen bg-slate-100">
            <aside
                className={`fixed left-0 top-0 z-50 h-screen w-72 bg-slate-950 text-white transition-transform duration-300 
        ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
            >
                <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
                    <div>
                        <h1 className="text-2xl font-bold">Admin Panel</h1>
                        <p className="text-sm text-slate-400">Health Dashboard</p>
                    </div>
                    <button onClick={() => setOpen(false)} className="lg:hidden">
                        <X />
                    </button>
                </div>

                <nav className="p-4 space-y-2">
                    {links.map((item) => {
                        const Icon = item.icon;
                        return (
                            <NavLink
                                key={item.name}
                                to={item.path}
                                end={item.path === "/"}
                                onClick={() => setOpen(false)}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${isActive
                                        ? "bg-white text-slate-950"
                                        : "text-slate-300 hover:bg-white/10 hover:text-white"
                                    }`
                                }
                            >
                                <Icon size={20} />
                                {item.name}
                            </NavLink>
                        );
                    })}
                </nav>
            </aside>

            <div className="lg:ml-72">
                <header className="sticky top-0 z-40 bg-white border-b border-slate-200 px-4 sm:px-6 py-4">
                    <div className="flex items-center justify-between gap-4">
                        <button
                            onClick={() => setOpen(true)}
                            className="lg:hidden rounded-lg bg-slate-900 text-white p-2"
                        >
                            <Menu />
                        </button>

                        <div className="hidden md:flex items-center gap-3 bg-slate-100 rounded-xl px-4 py-2 w-96">
                            <Search size={18} className="text-slate-500" />
                            <input
                                placeholder="Search..."
                                className="bg-transparent outline-none w-full text-sm"
                            />
                        </div>

                        <div className="flex items-center gap-4 ml-auto">
                            <button className="relative rounded-xl bg-slate-100 p-2">
                                <Bell size={20} />
                                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] text-white flex items-center justify-center">
                                    3
                                </span>
                            </button>

                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold">
                                    A
                                </div>
                                <div className="hidden sm:block">
                                    <p className="text-sm font-bold text-slate-900">Admin</p>
                                    <p className="text-xs text-slate-500">admin@gmail.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <main className="p-4 sm:p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}