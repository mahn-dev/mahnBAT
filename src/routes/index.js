import { HeaderOnly } from '~/components/Layout';

import Home from '~/pages/Home';
import Products from '~/pages/Products';
import About from '~/pages/About';
import Cart from '~/pages/Cart';

const publicRoutes = [
    {
        path: '/',
        page: Home,
    },
    {
        path: '/products',
        page: Products,
    },
    {
        path: '/about',
        page: About,
        layout: null,
    },
    {
        path: '/cart',
        page: Cart,
        layout: HeaderOnly,
    },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
