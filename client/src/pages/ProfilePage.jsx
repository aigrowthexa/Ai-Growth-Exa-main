import React, { useEffect, useState } from 'react';
import { Mail, ShieldCheck, UserCircle2, Sparkles, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

const getStoredUser = () => {
    try {
        return JSON.parse(localStorage.getItem('user') || 'null');
    } catch {
        return null;
    }
};

const ProfilePage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(getStoredUser);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadProfile = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const response = await api.get('/auth/me', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setUser(response.data.user);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                window.dispatchEvent(new Event('storage'));
            } catch (err) {
                const message = err.response?.data?.message || 'Failed to load your profile.';
                setError(message);

                if (err.response?.status === 401) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    window.dispatchEvent(new Event('storage'));
                    navigate('/login');
                    return;
                }
            } finally {
                setLoading(false);
            }
        };

        loadProfile();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.dispatchEvent(new Event('storage'));
        navigate('/');
    };

    if (loading) {
        return (
            <section className="min-h-screen bg-[radial-gradient(circle_at_top,#dbeafe_0%,#ffffff_45%,#f8fafc_100%)] px-6 pt-32 pb-20">
                <div className="mx-auto max-w-5xl">
                    <div className="rounded-[2rem] border border-slate-200 bg-white/80 p-10 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur">
                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Loading Profile</p>
                        <h1 className="mt-4 text-4xl font-black text-slate-900">Fetching your account details...</h1>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="min-h-screen bg-[radial-gradient(circle_at_top,#dbeafe_0%,#ffffff_45%,#f8fafc_100%)] px-6 pt-32 pb-20">
            <div className="mx-auto max-w-5xl space-y-8">
                <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_20px_80px_rgba(15,23,42,0.08)]">
                    <div className="relative overflow-hidden bg-slate-950 px-8 py-12 text-white md:px-12">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.35),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.2),transparent_30%)]" />
                        <div className="relative flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
                            <div className="flex items-start gap-5">
                                <div className="rounded-[1.75rem] border border-white/10 bg-white/10 p-4 backdrop-blur">
                                    <UserCircle2 className="h-16 w-16 text-blue-300" />
                                </div>
                                <div>
                                    <p className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-1 text-[11px] font-bold uppercase tracking-[0.24em] text-blue-200">
                                        <Sparkles className="h-3.5 w-3.5" />
                                        Member Profile
                                    </p>
                                    <h1 className="mt-4 text-3xl font-black md:text-5xl">{user?.name || 'Welcome back'}</h1>
                                    <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300 md:text-base">
                                        This is your personal profile space after login. You can quickly confirm your account details and access status here.
                                    </p>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={handleLogout}
                                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/10 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/15"
                            >
                                <LogOut className="h-4 w-4" />
                                Log Out
                            </button>
                        </div>
                    </div>

                    <div className="grid gap-5 p-8 md:grid-cols-3 md:p-12">
                        <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6">
                            <div className="flex items-center gap-3 text-slate-900">
                                <UserCircle2 className="h-5 w-5 text-blue-600" />
                                <h2 className="text-sm font-black uppercase tracking-[0.18em]">Full Name</h2>
                            </div>
                            <p className="mt-4 text-xl font-bold text-slate-900">{user?.name || 'Not available'}</p>
                        </div>

                        <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6">
                            <div className="flex items-center gap-3 text-slate-900">
                                <Mail className="h-5 w-5 text-blue-600" />
                                <h2 className="text-sm font-black uppercase tracking-[0.18em]">Email Address</h2>
                            </div>
                            <p className="mt-4 break-all text-xl font-bold text-slate-900">{user?.email || 'Not available'}</p>
                        </div>

                        <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6">
                            <div className="flex items-center gap-3 text-slate-900">
                                <ShieldCheck className="h-5 w-5 text-blue-600" />
                                <h2 className="text-sm font-black uppercase tracking-[0.18em]">Account Status</h2>
                            </div>
                            <p className="mt-4 text-xl font-bold capitalize text-slate-900">{user?.role || 'User'}</p>
                            <p className="mt-2 text-sm font-medium text-slate-500">
                                {user?.isVerified ? 'Email verified and active' : 'Verification pending'}
                            </p>
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="rounded-[1.5rem] border border-red-200 bg-red-50 px-6 py-4 text-sm font-semibold text-red-700">
                        {error}
                    </div>
                )}
            </div>
        </section>
    );
};

export default ProfilePage;
