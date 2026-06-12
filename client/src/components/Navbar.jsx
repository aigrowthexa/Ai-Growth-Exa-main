import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import api from '../api/api';
import logo from '../assets/images/site/AI_Growth_Exa_logo_designs22-removebg-preview.png';
import { FaBars, FaTimes } from 'react-icons/fa';
import AuthModal from './Modals/AuthModal';

const readStoredUser = () => {
    try {
        return JSON.parse(localStorage.getItem('user') || 'null');
    } catch {
        return null;
    }
};

const Navbar = () => {
    const navRef = useRef(null);
    const logoRef = useRef(null);
    const linksRef = useRef([]);
    const mobileMenuRef = useRef(null);
    const dropdownRef = useRef(null);

    const navigate = useNavigate();
    const location = useLocation();

    const [navbarSearch, setNavbarSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [authModalView, setAuthModalView] = useState('login');
    const [openDropdown, setOpenDropdown] = useState(null);
    const [currentUser, setCurrentUser] = useState(readStoredUser);

    const openAuthModal = (view) => {
        setAuthModalView(view);
        setIsAuthModalOpen(true);
        setIsMenuOpen(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setCurrentUser(null);
        window.dispatchEvent(new Event('storage'));
        navigate('/');
    };

    useEffect(() => {
        const syncUser = () => {
            setCurrentUser(readStoredUser());
        };

        window.addEventListener('storage', syncUser);
        syncUser();

        return () => window.removeEventListener('storage', syncUser);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }

            if (navRef.current && !navRef.current.contains(event.target)) {
                setOpenDropdown(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const timer = setTimeout(async () => {
            if (navbarSearch.trim().length > 1) {
                try {
                    setIsSearching(true);
                    const response = await api.get(`/services/search?q=${navbarSearch}`);
                    if (response.data.success) {
                        setSearchResults(response.data.data);
                        setShowDropdown(true);
                    }
                } catch (error) {
                    console.error('Navbar search error:', error);
                } finally {
                    setIsSearching(false);
                }
            } else {
                setSearchResults([]);
                setShowDropdown(false);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [navbarSearch]);

    const handleResultClick = (service) => {
        navigate('/services');
        setNavbarSearch('');
        setShowDropdown(false);
    };

    useEffect(() => {
        setOpenDropdown(null);
        setIsMenuOpen(false);
    }, [location.pathname]);

    useEffect(() => {
        if (!navRef.current || !logoRef.current || linksRef.current.length === 0) {
            return;
        }

        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.fromTo(
            navRef.current,
            { y: -100, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8 }
        )
            .fromTo(
                logoRef.current,
                { opacity: 0, x: -20 },
                { opacity: 1, x: 0, duration: 0.5 },
                '-=0.4'
            )
            .fromTo(
                linksRef.current,
                { opacity: 0, y: -20 },
                { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
                '-=0.3'
            );
    }, []);

    useEffect(() => {
        if (isMenuOpen && mobileMenuRef.current) {
            gsap.fromTo(
                mobileMenuRef.current,
                { height: 0, opacity: 0 },
                { height: 'auto', opacity: 1, duration: 0.3, ease: 'power2.out' }
            );
        }
    }, [isMenuOpen]);

    const toggleMenu = () => {
        setIsMenuOpen((current) => !current);
    };

    const navLinks = [
        { name: 'Home', path: '/' },
        {
            name: 'About',
            path: '/about',
            dropdown: [
                { name: 'About Us', path: '/about' },
                { name: 'About The Founder', path: '/founder' },
                { name: 'Awards & Recognition', path: '/awards' },
                { name: 'Industries We Serve', path: '/industries' },
                { name: 'Case Studies', path: '/case-studies' },
            ],
        },
        {
            name: 'Services',
            path: '/services',
            dropdown: [
                { name: 'Services', path: '/services' },
                { name: 'Ai Solutions', path: '/ai_solutions' },
            ],
        },
        { name: 'Blog', path: '/blog' },
        { name: 'Careers', path: '/careers' },
    ];

    const addToRefs = (el) => {
        if (el && !linksRef.current.includes(el)) {
            linksRef.current.push(el);
        }
    };

    const isAboutActive =
        location.pathname === '/about' ||
        location.pathname === '/founder' ||
        location.pathname === '/awards' ||
        location.pathname === '/industries' ||
        location.pathname.startsWith('/case-studies');

    return (
        <nav
            ref={navRef}
            className="fixed top-0 left-0 w-full z-50 bg-gray-900/95 backdrop-blur-md border-b border-gray-800"
        >
            <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-8 lg:gap-12">
                    <Link to="/" ref={logoRef} className="shrink-0">
                        <img src={logo} alt="Ai Growth Exa" className="h-10 md:h-12 w-auto object-contain" />
                    </Link>

                    <div className="hidden md:flex items-center space-x-5 lg:space-x-6">
                        {navLinks.map((link, index) => {
                            const isDropdownOpen = openDropdown === link.name;
                            const isActive = link.name === 'About'
                                ? isAboutActive
                                : location.pathname === link.path;

                            return (
                                <div
                                    key={link.name}
                                    className="relative"
                                    onMouseEnter={() => link.dropdown && setOpenDropdown(link.name)}
                                    onMouseLeave={() => link.dropdown && setOpenDropdown(null)}
                                >
                                    {link.dropdown ? (
                                        <button
                                            ref={index < 3 ? addToRefs : undefined}
                                            type="button"
                                            onClick={() => setOpenDropdown(isDropdownOpen ? null : link.name)}
                                            className={`flex items-center gap-1 text-base font-medium transition-colors hover:text-blue-400 ${isActive ? 'text-blue-400' : 'text-gray-300'
                                                }`}
                                        >
                                            {link.name}
                                            <svg
                                                className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                    ) : (
                                        <NavLink
                                            to={link.path}
                                            ref={addToRefs}
                                            className={({ isActive: navActive }) =>
                                                `text-base font-medium transition-colors hover:text-blue-400 ${navActive ? 'text-blue-400' : 'text-gray-300'}`
                                            }
                                        >
                                            {link.name}
                                        </NavLink>
                                    )}

                                    {link.dropdown && (
                                        <div
                                            className={`absolute top-full left-0 mt-2 w-56 bg-gray-900 border border-gray-800 rounded-xl shadow-2xl py-2 transition-all duration-200 ${isDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                                                }`}
                                        >
                                            {link.dropdown.map((subItem) => (
                                                <Link
                                                    key={subItem.name}
                                                    to={subItem.path}
                                                    className={`block px-4 py-2 text-sm transition-colors hover:bg-blue-600/10 hover:text-blue-400 ${location.pathname === subItem.path ? 'text-blue-400 bg-blue-600/5' : 'text-gray-300'
                                                        }`}
                                                >
                                                    {subItem.name}
                                                </Link>
                                            ))}
                                        </div>
                                    )}

                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="hidden md:flex items-center gap-6">
                    <div
                        ref={dropdownRef}
                        className={`relative group ${navbarSearch.trim().length > 0 ? 'w-56' : 'w-11 hover:w-56 focus-within:w-56'} transition-all duration-300 ease-out`}
                    >
                        <div className="absolute inset-y-0 left-0 z-10 flex items-center pl-3 pointer-events-none text-gray-400 group-focus-within:text-blue-400 group-hover:text-blue-400 transition-colors">
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            value={navbarSearch}
                            onChange={(e) => setNavbarSearch(e.target.value)}
                            onFocus={() => navbarSearch.trim().length > 1 && setShowDropdown(true)}
                            className={`block h-11 w-full rounded-full border border-gray-700 bg-gray-800 pr-4 pl-10 text-sm text-white placeholder-gray-400 transition-all duration-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 ${navbarSearch.trim().length > 0
                                ? 'opacity-100'
                                : 'opacity-0 group-hover:opacity-100 group-focus-within:opacity-100'
                                }`}
                            placeholder="Search services..."
                        />

                        {showDropdown && (
                            <div className="absolute top-full right-0 mt-2 w-72 bg-gray-900/95 backdrop-blur-xl border border-gray-700 rounded-xl shadow-2xl overflow-hidden z-[60]">
                                {isSearching ? (
                                    <div className="p-4 text-center text-gray-400 text-sm">
                                        Searching...
                                    </div>
                                ) : searchResults.length > 0 ? (
                                    <div className="max-h-80 overflow-y-auto">
                                        {searchResults.map((service, index) => (
                                            <button
                                                key={service._id || index}
                                                onClick={() => handleResultClick(service)}
                                                className="w-full text-left px-4 py-3 hover:bg-white/5 transition-colors border-b border-gray-800 last:border-0"
                                            >
                                                <div className="text-sm font-semibold text-white truncate">
                                                    {service.title}
                                                </div>
                                                <div className="text-xs text-blue-400 font-medium">
                                                    {service.category}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="p-4 text-center text-gray-400 text-sm">
                                        No results found
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <div ref={addToRefs} className="flex items-center gap-3">
                        {currentUser ? (
                            <>
                                <button
                                    onClick={() => navigate(currentUser.role === 'admin' ? '/admin' : '/profile')}
                                    className="px-5 py-2.5 border border-gray-700 hover:border-blue-500 hover:text-blue-400 text-gray-200 rounded-full text-base font-medium transition-all"
                                >
                                    {currentUser.role === 'admin' ? 'Dashboard' : 'My Profile'}
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-full text-base font-medium transition-all shadow-lg shadow-blue-500/20"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => openAuthModal('register')}
                                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-full text-base font-medium transition-all shadow-lg shadow-blue-500/20"
                            >
                                Get Started
                            </button>
                        )}
                    </div>
                </div>

                <button
                    onClick={toggleMenu}
                    className="md:hidden text-gray-300 focus:outline-none p-2"
                >
                    {isMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
                </button>

                {isMenuOpen && (
                    <div
                        ref={mobileMenuRef}
                        className="absolute top-full left-0 w-full bg-gray-900 border-b border-gray-800 shadow-xl md:hidden overflow-hidden"
                    >
                        <div className="flex flex-col p-4 space-y-1">
                            {navLinks.map((link) => (
                                <div key={link.name}>
                                    {link.dropdown ? (
                                        <>
                                            <button
                                                type="button"
                                                onClick={() => setOpenDropdown(openDropdown === link.name ? null : link.name)}
                                                className="w-full flex items-center justify-between px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg text-base font-medium transition-colors"
                                            >
                                                {link.name}
                                                <svg className={`w-4 h-4 transition-transform ${openDropdown === link.name ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </button>

                                            {openDropdown === link.name && link.dropdown && (
                                                <div className="bg-gray-800/50 rounded-lg mt-1 space-y-1">
                                                    {link.dropdown.map((subItem) => (
                                                        <Link
                                                            key={subItem.name}
                                                            to={subItem.path}
                                                            onClick={() => setIsMenuOpen(false)}
                                                            className={`block px-8 py-2.5 text-sm transition-colors ${location.pathname === subItem.path ? 'text-blue-400' : 'text-gray-400 hover:text-white'
                                                                }`}
                                                        >
                                                            {subItem.name}
                                                        </Link>
                                                    ))}
                                                </div>
                                            )}

                                        </>
                                    ) : (
                                        <NavLink
                                            to={link.path}
                                            onClick={() => setIsMenuOpen(false)}
                                            className={({ isActive }) =>
                                                `block px-4 py-3 rounded-lg text-base font-medium transition-colors ${isActive
                                                    ? 'bg-blue-600/10 text-blue-400'
                                                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                                                }`
                                            }
                                        >
                                            {link.name}
                                        </NavLink>
                                    )}
                                </div>
                            ))}

                            <div className="pt-2 mt-2 border-t border-gray-800">
                                {currentUser ? (
                                    <div className="space-y-2">
                                        <button
                                            onClick={() => {
                                                navigate(currentUser.role === 'admin' ? '/admin' : '/profile');
                                                setIsMenuOpen(false);
                                            }}
                                            className="block w-full text-center px-4 py-3 border border-gray-700 text-gray-200 rounded-lg text-base font-medium transition-colors hover:border-blue-500 hover:text-blue-400"
                                        >
                                            {currentUser.role === 'admin' ? 'Dashboard' : 'My Profile'}
                                        </button>
                                        <button
                                            onClick={() => {
                                                handleLogout();
                                                setIsMenuOpen(false);
                                            }}
                                            className="block w-full text-center px-4 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-base font-medium transition-colors"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => openAuthModal('register')}
                                        className="block w-full text-center px-4 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-base font-medium transition-colors"
                                    >
                                        Get Started
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <AuthModal
                isOpen={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
                initialView={authModalView}
            />
        </nav>
    );
};

export default Navbar;
