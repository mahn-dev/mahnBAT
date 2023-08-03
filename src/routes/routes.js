import config from '~/config';
import { HeaderOnly } from '~/layouts';

import Home from '~/pages/Home';
import Products from '~/pages/Products';
import About from '~/pages/About';
import Cart from '~/pages/Cart';
import BatteryCheck from '~/pages/BatteryCheck';
import NotFound from '~/pages/NotFound';
import TypeProductsPage from '~/pages/TypeProductsPage';
import SignInPage from '~/pages/SignInPage';
import SignUpPage from '~/pages/SignUpPage';
import ProductDetailPage from '~/pages/ProductDetailPage';
import Profile from '~/pages/Profile';
import AdminPage from '~/pages/AdminPage';

const publicRoutes = [
    {
        path: config.routes.home,
        page: Home,
        isShowHeader: true,
    },
    {
        path: config.routes.products,
        page: Products,
    },
    {
        path: config.routes.batterycheck,
        page: BatteryCheck,
        layout: HeaderOnly,
    },
    {
        path: config.routes.about,
        page: About,
        layout: HeaderOnly,
    },
    {
        path: config.routes.cart,
        page: Cart,
        layout: HeaderOnly,
    },
    {
        path: config.routes.typeProducts,
        page: TypeProductsPage,
        layout: HeaderOnly,
    },
    {
        path: config.routes.notfound,
        page: NotFound,
        layout: HeaderOnly,
    },
    {
        path: config.routes.signIn,
        page: SignInPage,
        layout: HeaderOnly,
    },
    {
        path: config.routes.signUp,
        page: SignUpPage,
        layout: HeaderOnly,
    },
    {
        path: config.routes.productDetail,
        page: ProductDetailPage,
        layout: HeaderOnly,
    },
    {
        path: config.routes.profile,
        page: Profile,
        layout: HeaderOnly,
    },
    {
        path: config.routes.admin,
        page: AdminPage,
        layout: null,
        isPrivate: true,
    },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
