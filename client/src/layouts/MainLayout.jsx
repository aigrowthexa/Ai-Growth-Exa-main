import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SmoothScroll from '../components/SmoothScroll';

const MainLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-white light:bg-white dark:bg-gray-950 text-gray-900 light:text-gray-900 dark:text-white flex flex-col font-sans transition-colors duration-500">
            <Navbar />

            <SmoothScroll>
                <main className="flex-grow">
                    {children}
                </main>

                <Footer />
            </SmoothScroll>
        </div>
    );
};

export default MainLayout;
