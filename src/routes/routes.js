import config from '~/config';
import { HeaderOnly } from '~/layouts';

import Home from '~/pages/Home';
import Products from '~/pages/Products';
import About from '~/pages/About';
import Cart from '~/pages/Cart';

const publicRoutes = [
    {
        path: config.routes.home,
        page: Home,
    },
    {
        path: config.routes.products,
        page: Products,
    },
    {
        path: config.routes.about,
        page: About,
        // layout: null,
    },
    {
        path: config.routes.cart,
        page: Cart,
        layout: HeaderOnly,
    },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
