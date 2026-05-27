

import { lazy } from 'react';

const lazyWithPreload = (factory) => {
    const Component = lazy(factory);
    Component.preload = factory;
    return Component;
};

export const loadServicesPage = () => import('../pages/Services');

export const Services = lazyWithPreload(loadServicesPage);
