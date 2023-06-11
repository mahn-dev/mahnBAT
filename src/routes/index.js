import routesConfig from '~/config/routes';
import { HeaderOnly } from '~/components/Layout';

import Home from '~/pages/Home';
import Products from '~/pages/Products';
import About from '~/pages/About';
import Cart from '~/pages/Cart';

const publicRoutes = [
    {
        path: routesConfig.home,
        page: Home,
    },
    {
        path: routesConfig.products,
        page: Products,
    },
    {
        path: routesConfig.about,
        page: About,
        // layout: null,
    },
    {
        path: routesConfig.cart,
        page: Cart,
        layout: HeaderOnly,
    },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
