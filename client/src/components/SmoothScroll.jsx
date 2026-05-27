import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SmoothScroll = ({ children }) => {
    const location = useLocation();

    useEffect(() => {
        // Only scroll to top on route change
        window.scrollTo(0, 0);
        
        // Refresh ScrollTrigger to recalculate heights after route change
        const timeoutId = setTimeout(() => {
            ScrollTrigger.refresh(true);
        }, 100);

        return () => clearTimeout(timeoutId);
    }, [location.pathname]);

    return <>{children}</>;
};

export default SmoothScroll;
