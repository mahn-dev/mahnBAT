import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import config from '~/config';

import Menu, { MenuItem } from './Menu';
import { BatteryIcon, SaleIcon, CartIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

function Sidebar() {
    return (
        <aside className={cx('wrapper')}>
            <Menu>
                <MenuItem title="Hàng mới về" to={config.routes.newproducts} icon={<CartIcon />} />
                <MenuItem title="Hàng khuyến mãi" to={config.routes.saleproducts} icon={<SaleIcon />} />
                <MenuItem
                    title="Kiểm tra pin"
                    to={config.routes.batterycheck}
                    icon={<BatteryIcon className={cx('battery-icon')} />}
                />
            </Menu>
        </aside>
    );
}

export default Sidebar;
