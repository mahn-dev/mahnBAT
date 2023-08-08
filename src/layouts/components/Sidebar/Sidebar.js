import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import config from '~/config';

import Menu, { MenuItem } from './Menu';
import { SaleIcon, CartIcon, ShieldIcon, RequestIcon, BlogIcon, SupportIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

function Sidebar() {
    return (
        <aside className={cx('wrapper')}>
            <Menu>
                <MenuItem title="Tất cả sản phẩm" to={config.routes.products} icon={<CartIcon />} />
                <MenuItem title="Hàng khuyến mãi" to={config.routes.saleproducts} icon={<SaleIcon />} />
                <MenuItem title="Đóng pin theo yêu cầu" to={config.routes.saleproducts} icon={<RequestIcon />} />
                <MenuItem title="Blog / Bài viết" to={config.routes.saleproducts} icon={<BlogIcon />} />
                <MenuItem title="Tra cứu bảo hành" to={config.routes.batterycheck} icon={<ShieldIcon />} />
                <MenuItem title="Hỗ trợ khách hàng" to={config.routes.saleproducts} icon={<SupportIcon />} />
            </Menu>
        </aside>
    );
}

export default Sidebar;
