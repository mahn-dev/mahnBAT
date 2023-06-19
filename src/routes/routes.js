import config from '~/config';
import { HeaderOnly } from '~/layouts';

import Home from '~/pages/Home';
import Products from '~/pages/Products';
// import About from '~/pages/About';
import Cart from '~/pages/Cart';
import BatteryCheck from '~/pages/BatteryCheck';
import NotFound from '~/pages/NotFound';

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
        path: config.routes.batterycheck,
        page: BatteryCheck,
    },
    // {
    //     path: config.routes.about,
    //     page: About,
    //     // layout: null,
    // },
    {
        path: config.routes.cart,
        page: Cart,
        layout: HeaderOnly,
    },
    {
        path: config.routes.notfound,
        page: NotFound,
        layout: HeaderOnly,
    },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
