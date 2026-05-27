const users = [
    { name: "Rahul Sharma", email: "rahul@gmail.com", role: "User" },
    { name: "Priya Singh", email: "priya@gmail.com", role: "User" },
    { name: "Amit Kumar", email: "amit@gmail.com", role: "MR" },
];

export default function Users() {
    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-slate-900">Users</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {users.map((u) => (
                    <div
                        key={u.email}
                        className="bg-white rounded-2xl p-5 border shadow-sm"
                    >
                        <div className="h-14 w-14 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xl">
                            {u.name[0]}
                        </div>
                        <h3 className="mt-4 font-bold text-lg">{u.name}</h3>
                        <p className="text-slate-500">{u.email}</p>
                        <span className="inline-block mt-4 px-3 py-1 rounded-full bg-slate-100 text-sm">
                            {u.role}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}