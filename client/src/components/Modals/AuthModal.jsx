import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate, useLocation } from 'react-router-dom';
import { X, Mail, Lock, User, ArrowRight, Loader2, Github, CheckCircle } from 'lucide-react';
import api from '../../api/api';
import { useGoogleAuthConfig } from '../../context/GoogleAuthContext';

const AuthModal = ({ isOpen, onClose, initialView = 'login' }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { enabled: googleAuthEnabled, loading: googleAuthLoading } = useGoogleAuthConfig();

    // Determine view mode based on prop or URL path
    const [view, setView] = useState(initialView);

    useEffect(() => {
        if (isOpen) {
            setView(initialView);
        }
    }, [isOpen, initialView]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Form states
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [registerData, setRegisterData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const [verificationEmail, setVerificationEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [forgotEmail, setForgotEmail] = useState('');
    const [resetData, setResetData] = useState({ email: '', otp: '', newPassword: '', confirmPassword: '' });
    const [notification, setNotification] = useState(null);
    const [googleButtonWidth, setGoogleButtonWidth] = useState(0);
    const googleButtonContainerRef = useRef(null);

    useEffect(() => {
        const updateWidth = () => {
            const nextWidth = googleButtonContainerRef.current?.offsetWidth || 0;
            if (nextWidth) {
                setGoogleButtonWidth(nextWidth);
            }
        };

        updateWidth();

        if (typeof ResizeObserver === 'undefined' || !googleButtonContainerRef.current) {
            return undefined;
        }

        const observer = new ResizeObserver(updateWidth);
        observer.observe(googleButtonContainerRef.current);

        return () => observer.disconnect();
    }, [view, isOpen]);

    const showNotification = (message, type = 'success') => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000);
    };

    const handleLoginChange = (e) => setLoginData({ ...loginData, [e.target.name]: e.target.value });
    const handleRegisterChange = (e) => setRegisterData({ ...registerData, [e.target.name]: e.target.value });
    const handleResetChange = (e) => setResetData({ ...resetData, [e.target.name]: e.target.value });
    const openVerificationStep = (email) => {
        const normalizedEmail = email.trim().toLowerCase();
        setVerificationEmail(normalizedEmail);
        setRegisterData((prev) => ({ ...prev, email: normalizedEmail }));
        setLoginData((prev) => ({ ...prev, email: normalizedEmail }));
        setOtp('');
        setView('verify');
    };
    const shouldRetryVerification = (message = '') => /already exist/i.test(message);

    const handleClose = () => {
        if (onClose) {
            onClose();
        } else {
            navigate(-1);
        }
    };

    const closeAndRedirectAfterLogin = (nextPath) => {
        if (onClose) {
            onClose();
        }

        navigate(nextPath);
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await api.post('/auth/login', loginData);

            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user || { role: res.data.role }));

            // Dispatch custom event for Navbar update
            window.dispatchEvent(new Event('storage'));

            showNotification("Login Successful!", "success");
            setTimeout(() => {
                closeAndRedirectAfterLogin(res.data.role === 'admin' ? '/admin' : '/profile');
            }, 1000);
        } catch (err) {
            const msg = err.response?.data?.message || 'Login failed';
            if (err.response?.data?.requiresVerification) {
                openVerificationStep(err.response?.data?.email || loginData.email);
                setError('');
                showNotification(msg, 'success');
                return;
            }

            setError(msg);
            showNotification(`Login Failed: ${msg}`, "error");
        } finally {
            setLoading(false);
        }
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (registerData.password !== registerData.confirmPassword) {
            const msg = 'Passwords do not match';
            setError(msg);
            showNotification(msg, 'error');
            setLoading(false);
            return;
        }

        try {
            const response = await api.post('/auth/register', {
                name: registerData.name,
                email: registerData.email,
                password: registerData.password
            });

            showNotification("Registration Successful. Check email for OTP.", "success");
            openVerificationStep(response.data?.email || registerData.email);
        } catch (err) {
            console.error("Registration Error:", err);
            const msg = err.response?.data?.message || err.message || 'Registration failed. Please try again.';

            if (shouldRetryVerification(msg)) {
                try {
                    const resendResponse = await api.post('/auth/resend-verification-otp', {
                        email: registerData.email,
                    });
                    showNotification('Account found. OTP resent to your email.', 'success');
                    openVerificationStep(resendResponse.data?.email || registerData.email);
                    setError('');
                    return;
                } catch (resendErr) {
                    const resendMessage =
                        resendErr.response?.data?.message ||
                        'Account already exists. Please sign in if your email is already verified.';
                    setError(resendMessage);
                    showNotification(`Registration Failed: ${resendMessage}`, 'error');
                    return;
                }
            }

            setError(msg);
            showNotification(`Registration Failed: ${msg}`, "error");
        } finally {
            setLoading(false);
        }
    };

    const handleVerifySubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const emailToVerify = verificationEmail || registerData.email || loginData.email;

            if (!emailToVerify) {
                const msg = "Email missing. Please try logging in again.";
                setError(msg);
                showNotification(msg, "error");
                return;
            }

            await api.post('/auth/verify-email', {
                email: emailToVerify,
                otp
            });

            setView('login');
            setLoginData((prev) => ({ ...prev, email: emailToVerify, password: '' }));
            setVerificationEmail('');
            setOtp('');
            setError('');
            showNotification('Email verified! Please log in.', 'success');

        } catch (err) {
            const msg = err.response?.data?.message || 'Verification failed. Invalid OTP.';
            setError(msg);
            showNotification(`Verification Failed: ${msg}`, 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleResendVerificationOtp = async () => {
        const emailToVerify = verificationEmail || registerData.email || loginData.email;

        if (!emailToVerify) {
            const msg = 'Email missing. Please register again.';
            setError(msg);
            showNotification(msg, 'error');
            return;
        }

        try {
            setLoading(true);
            setError('');
            await api.post('/auth/resend-verification-otp', { email: emailToVerify });
            showNotification('Verification OTP resent. Check your email.', 'success');
        } catch (err) {
            const msg = err.response?.data?.message || 'Failed to resend verification OTP.';
            setError(msg);
            showNotification(`Resend Failed: ${msg}`, 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleForgotPasswordStart = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const emailToReset = forgotEmail || loginData.email;
        if (!emailToReset) {
            const msg = 'Please enter your email address first.';
            setError(msg);
            showNotification(msg, 'error');
            setLoading(false);
            return;
        }

        try {
            await api.post('/auth/forgot-password', { email: emailToReset });
            setResetData((prev) => ({ ...prev, email: emailToReset, otp: '', newPassword: '', confirmPassword: '' }));
            showNotification('Reset OTP sent. Check your email.', 'success');
            setView('forgot-verify');
        } catch (err) {
            const msg = err.response?.data?.message || 'Failed to send reset OTP.';
            setError(msg);
            showNotification(`Reset Failed: ${msg}`, 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyResetOtpSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await api.post('/auth/verify-reset-otp', {
                email: resetData.email,
                otp: resetData.otp,
            });

            showNotification('OTP verified. Set your new password.', 'success');
            setView('reset');
        } catch (err) {
            const msg = err.response?.data?.message || 'OTP verification failed.';
            setError(msg);
            showNotification(`Verification Failed: ${msg}`, 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleResetPasswordSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (resetData.newPassword !== resetData.confirmPassword) {
            const msg = 'Passwords do not match';
            setError(msg);
            showNotification(msg, 'error');
            setLoading(false);
            return;
        }

        try {
            await api.post('/auth/reset-password', {
                email: resetData.email,
                otp: resetData.otp,
                newPassword: resetData.newPassword,
            });

            showNotification('Password reset successful. Please sign in.', 'success');
            setLoginData((prev) => ({ ...prev, email: resetData.email, password: '' }));
            setResetData({ email: '', otp: '', newPassword: '', confirmPassword: '' });
            setForgotEmail('');
            setView('login');
        } catch (err) {
            const msg = err.response?.data?.message || 'Password reset failed.';
            setError(msg);
            showNotification(`Reset Failed: ${msg}`, 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            setLoading(true);
            const { credential } = credentialResponse;
            const res = await api.post('/auth/google', { token: credential });

            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user || { role: res.data.role }));

            // Dispatch custom event for Navbar update
            window.dispatchEvent(new Event('storage'));

            showNotification("Google Login Successful!", "success");
            setTimeout(() => {
                closeAndRedirectAfterLogin(res.data.role === 'admin' ? '/admin' : '/profile');
            }, 1000);
        } catch (err) {
            console.error('Google Login Error:', err);
            const msg = err.response?.data?.message || err.response?.data?.error || 'Google Login failed. Please try again.';
            setError(msg);
            showNotification(msg, "error");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 bg-gray-950/80 z-[100] flex items-center justify-center p-4 backdrop-blur-md transition-all duration-300 animate-in fade-in" onClick={handleClose}>

            {/* Notification Toast */}
            {notification && (
                <div className={`absolute top-8 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full shadow-2xl z-[150] flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300 ${notification.type === 'success' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'
                    }`}>
                    {notification.type === 'success' ? <CheckCircle className="w-5 h-5 shrink-0" /> : <X className="w-5 h-5 shrink-0" />}
                    <span className="font-bold text-sm tracking-wide">{notification.message}</span>
                </div>
            )}

            {/* Wrapper for positioning Close Button relative to Card */}
            <div className="relative w-full max-w-5xl animate-in zoom-in-95 duration-300 pointer-events-auto" onClick={e => e.stopPropagation()}>

                {/* Close Button - Persistent */}
                <button
                    onClick={handleClose}
                    className="absolute top-3 right-3 z-[110] p-2 text-slate-400 hover:text-slate-950 hover:bg-slate-100/90 rounded-full transition-all duration-300 backdrop-blur-sm cursor-pointer"
                    aria-label="Close modal"
                >
                    <X className="w-5 h-5 shadow-sm" />
                </button>

                {/* Scrollable Content Card */}
                <div className="bg-white rounded-[2rem] w-full shadow-2xl flex flex-col md:flex-row border border-white/10 overflow-hidden md:h-[min(680px,calc(100vh-2rem))]">

                    {/* Left Side: Visuals */}
                    <div className="w-full md:w-1/2 bg-[#0f172a] p-8 md:p-10 text-white relative overflow-hidden flex flex-col justify-center gap-8 md:gap-10 min-h-[320px] md:h-full">
                        {/* Background Elements */}
                        <div className="absolute top-[-20%] right-[-20%] w-64 h-64 bg-blue-600/20 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-purple-600/20 rounded-full blur-3xl"></div>

                        <div className="relative z-10">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-[10px] font-bold uppercase tracking-[0.2em] mb-5">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
                                Secure Access
                            </div>

                            <h2 className="text-3xl md:text-[2.1rem] font-black mb-3 leading-tight">
                                {view === 'login' && 'Welcome Back.'}
                                {view === 'register' && 'Join the Revolution.'}
                                {view === 'verify' && 'Verify Email.'}
                                {view === 'forgot' && 'Reset Access.'}
                                {view === 'forgot-verify' && 'Verify Reset OTP.'}
                                {view === 'reset' && 'Create New Password.'}
                            </h2>
                            <p className="text-slate-400 text-sm leading-7 font-medium max-w-md">
                                {view === 'login' && 'Access your dashboard, manage your projects, and track your growth metrics.'}
                                {view === 'register' && 'Create your account to start your journey with AI-driven growth strategies.'}
                                {view === 'verify' && 'Enter the OTP sent to your email to verify your account.'}
                                {view === 'forgot' && 'Enter your email and we will send you an OTP to reset your password.'}
                                {view === 'forgot-verify' && 'Enter the OTP sent to your email. After verification, the reset password page will open.'}
                                {view === 'reset' && 'Choose a new password for your account after successful OTP verification.'}
                            </p>
                        </div>

                        <div className="relative z-10 space-y-3.5">
                            <div className="flex items-center gap-3 text-sm text-slate-300">
                                <CheckCircle className="w-4 h-4 text-green-400" />
                                <span>Real-time Analytics Dashboard</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-slate-300">
                                <CheckCircle className="w-4 h-4 text-green-400" />
                                <span>AI-Powered Insights</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-slate-300">
                                <CheckCircle className="w-4 h-4 text-green-400" />
                                <span>Premium Support Access</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Form */}
                    <div className="w-full md:w-1/2 p-6 md:px-10 md:py-8 relative flex flex-col justify-center bg-white md:h-full">

                        <div className="mb-4">
                            <h3 className="text-[1.7rem] font-bold text-slate-900 mb-1">
                                {view === 'login' && 'Sign in'}
                                {view === 'register' && 'Create Account'}
                                {view === 'verify' && 'Verification'}
                                {view === 'forgot' && 'Forgot Password'}
                                {view === 'forgot-verify' && 'Verify OTP'}
                                {view === 'reset' && 'Reset Password'}
                            </h3>
                            <p className="text-slate-500 text-sm">
                                {view === 'login' && 'Enter your details to proceed'}
                                {view === 'register' && 'Get started for free'}
                                {view === 'verify' && 'Check your email for code'}
                                {view === 'forgot' && 'We will send an OTP to your email'}
                                {view === 'forgot-verify' && 'Check your email for the reset code'}
                                {view === 'reset' && 'Enter your new password'}
                            </p>
                            {view === 'verify' && (verificationEmail || registerData.email) && (
                                <p className="mt-2 text-xs font-medium text-slate-500">
                                    OTP sent to <span className="text-slate-900">{verificationEmail || registerData.email}</span>
                                </p>
                            )}
                        </div>



                        <form onSubmit={
                            view === 'login' ? handleLoginSubmit :
                                view === 'register' ? handleRegisterSubmit :
                                    view === 'verify' ? handleVerifySubmit :
                                        view === 'forgot' ? handleForgotPasswordStart :
                                            view === 'forgot-verify' ? handleVerifyResetOtpSubmit :
                                                handleResetPasswordSubmit
                        } className="space-y-3">

                            {view === 'verify' && (
                                <div className="space-y-1">
                                    <label className="text-xs font-bold uppercase text-slate-500 ml-1">OTP Code</label>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                        <input
                                            type="text"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm font-medium text-slate-900 transition-all"
                                            placeholder="123456"
                                            required
                                        />
                                    </div>
                                </div>
                            )}

                            {view === 'forgot-verify' && (
                                <div className="space-y-1">
                                    <label className="text-xs font-bold uppercase text-slate-500 ml-1">OTP Code</label>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                        <input
                                            type="text"
                                            name="otp"
                                            value={resetData.otp}
                                            onChange={handleResetChange}
                                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm font-medium text-slate-900 transition-all"
                                            placeholder="123456"
                                            required
                                        />
                                    </div>
                                </div>
                            )}

                            {view === 'register' && (
                                <div className="space-y-1">
                                    <label className="text-xs font-bold uppercase text-slate-500 ml-1">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                        <input
                                            type="text"
                                            name="name"
                                            value={registerData.name}
                                            onChange={handleRegisterChange}
                                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm font-medium text-slate-900 transition-all"
                                            placeholder="John Doe"
                                            required
                                        />
                                    </div>
                                </div>
                            )}

                            {view !== 'verify' && view !== 'forgot-verify' && view !== 'reset' && (
                                <>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold uppercase text-slate-500 ml-1">Email Address</label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                            <input
                                                type="email"
                                                name="email"
                                                value={view === 'login' ? loginData.email : view === 'register' ? registerData.email : forgotEmail}
                                                onChange={view === 'login' ? handleLoginChange : view === 'register' ? handleRegisterChange : (e) => setForgotEmail(e.target.value)}
                                                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm font-medium text-slate-900 transition-all"
                                                placeholder="name@company.com"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {(view === 'login' || view === 'register') && (
                                        <div className="space-y-1">
                                        <div className="flex justify-between ml-1">
                                            <label className="text-xs font-bold uppercase text-slate-500">Password</label>
                                            {view === 'login' && (
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setForgotEmail(loginData.email);
                                                        setError('');
                                                        setView('forgot');
                                                    }}
                                                    className="text-xs text-blue-600 font-semibold hover:text-blue-700"
                                                >
                                                    Forgot?
                                                </button>
                                            )}
                                        </div>
                                        <div className="relative">
                                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                            <input
                                                type="password"
                                                name="password"
                                                value={view === 'login' ? loginData.password : registerData.password}
                                                onChange={view === 'login' ? handleLoginChange : handleRegisterChange}
                                                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm font-medium text-slate-900 transition-all"
                                                placeholder="••••••••"
                                                required
                                            />
                                        </div>
                                        </div>
                                    )}
                                </>
                            )}

                            {view === 'reset' && (
                                <>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold uppercase text-slate-500 ml-1">Email Address</label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                            <input
                                                type="email"
                                                name="email"
                                                value={resetData.email}
                                                readOnly
                                                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm font-medium text-slate-900 transition-all"
                                                placeholder="name@company.com"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-xs font-bold uppercase text-slate-500 ml-1">New Password</label>
                                        <div className="relative">
                                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                            <input
                                                type="password"
                                                name="newPassword"
                                                value={resetData.newPassword}
                                                onChange={handleResetChange}
                                                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm font-medium text-slate-900 transition-all"
                                                placeholder="••••••••"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-xs font-bold uppercase text-slate-500 ml-1">Confirm Password</label>
                                        <div className="relative">
                                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                            <input
                                                type="password"
                                                name="confirmPassword"
                                                value={resetData.confirmPassword}
                                                onChange={handleResetChange}
                                                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm font-medium text-slate-900 transition-all"
                                                placeholder="••••••••"
                                                required
                                            />
                                        </div>
                                    </div>
                                </>
                            )}

                            {view === 'register' && (
                                <div className="space-y-1">
                                    <label className="text-xs font-bold uppercase text-slate-500 ml-1">Confirm Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            value={registerData.confirmPassword}
                                            onChange={handleRegisterChange}
                                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm font-medium text-slate-900 transition-all"
                                            placeholder="••••••••"
                                            required
                                        />
                                    </div>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 flex items-center justify-center gap-2 mt-1"
                            >
                                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                                    <>
                                        {view === 'login' && 'Sign In'}
                                        {view === 'register' && 'Create Account'}
                                        {view === 'verify' && 'Verify'}
                                        {view === 'forgot' && 'Send OTP'}
                                        {view === 'forgot-verify' && 'Verify OTP'}
                                        {view === 'reset' && 'Reset Password'}
                                        <ArrowRight className="w-4 h-4" />
                                    </>
                                )}
                            </button>

                            {view === 'verify' && (
                                <button
                                    type="button"
                                    onClick={handleResendVerificationOtp}
                                    disabled={loading}
                                    className="w-full py-2.5 border border-slate-200 text-slate-700 font-semibold rounded-xl transition-all duration-300 hover:bg-slate-50 disabled:opacity-60"
                                >
                                    Resend OTP
                                </button>
                            )}
                        </form>

                        {view !== 'verify' && view !== 'forgot' && view !== 'forgot-verify' && view !== 'reset' && (
                            <>
                                <div className="relative my-3">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-200"></div>
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-2 bg-white text-gray-500">Or continue with</span>
                                    </div>
                                </div>

                                {/* Google Login Button */}
                                <div ref={googleButtonContainerRef} className="mb-2 w-full">
                                    {googleAuthEnabled ? (
                                        <GoogleLogin
                                            onSuccess={handleGoogleSuccess}
                                            onError={() => {
                                                setError('Google Login Failed');
                                            }}
                                            useOneTap
                                            theme="outline"
                                            size="large"
                                            shape="rectangular"
                                            text="continue_with"
                                            width={googleButtonWidth ? String(googleButtonWidth) : undefined}
                                            containerProps={{
                                                style: { width: '100%' }
                                            }}
                                        />
                                    ) : (
                                        <div className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-center text-sm font-medium text-slate-500">
                                            {googleAuthLoading
                                                ? 'Loading Google sign-in...'
                                                : 'Google sign-in is not configured yet. Add the Google client ID to frontend or server config.'}
                                        </div>
                                    )}
                                </div>
                            </>
                        )}

                        <div className="mt-2 pt-3 border-t border-slate-100">
                            <div className="text-center">
                                <p className="text-sm text-slate-500 font-medium">
                                    {view === 'login' && "Don't have an account?"}
                                    {view === 'register' && "Already have an account?"}
                                    {view === 'verify' && "Incorrect email?"}
                                    {view === 'forgot' && "Remembered your password?"}
                                    {view === 'forgot-verify' && "Want to sign in instead?"}
                                    {view === 'reset' && "Want to sign in instead?"}

                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (view === 'verify') setView('register');
                                            else if (view === 'forgot' || view === 'forgot-verify' || view === 'reset') setView('login');
                                            else setView(view === 'login' ? 'register' : 'login');
                                        }}
                                        className="ml-2 text-blue-600 font-bold hover:text-blue-700 hover:underline transition-colors"
                                    >
                                        {view === 'login' && 'Sign up free'}
                                        {view === 'register' && 'Sign in'}
                                        {view === 'verify' && 'Register again'}
                                        {view === 'forgot' && 'Sign in'}
                                        {view === 'forgot-verify' && 'Sign in'}
                                        {view === 'reset' && 'Sign in'}
                                    </button>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default AuthModal;
