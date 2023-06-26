import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import config from '~/config';

import Menu, { MenuItem } from './Menu';
import {
    BatteryIcon,
    SaleIcon,
    CartIcon,
    AdapterIcon,
    CircuitIcon,
    ShieldIcon,
    ElectronicComponentsIcon,
    DrillIcon,
    RequestIcon,
} from '~/components/Icons';

const cx = classNames.bind(styles);

function Sidebar() {
    return (
        <aside className={cx('wrapper')}>
            <Menu>
                <MenuItem title="Hàng mới về" to={config.routes.newproducts} icon={<CartIcon />} />
                <MenuItem title="Hàng khuyến mãi" to={config.routes.saleproducts} icon={<SaleIcon />} />
                <MenuItem
                    title="Pin 1-5S"
                    to={config.routes.saleproducts}
                    icon={<BatteryIcon className={cx('battery-icon')} />}
                />
                <MenuItem title="Đóng pin theo yêu cầu" to={config.routes.saleproducts} icon={<RequestIcon />} />
                <MenuItem title="Pin dòng xả cao" to={config.routes.saleproducts} icon={<DrillIcon />} />
                <MenuItem title="Mạch sạc cân bằng pin" to={config.routes.saleproducts} icon={<CircuitIcon />} />
                <MenuItem title="Nguồn sạc pin" to={config.routes.saleproducts} icon={<AdapterIcon />} />
                <MenuItem
                    title="Linh kiện điện tử"
                    to={config.routes.saleproducts}
                    icon={<ElectronicComponentsIcon />}
                />
                <MenuItem title="Kiểm tra pin / Bảo hành" to={config.routes.batterycheck} icon={<ShieldIcon />} />
            </Menu>
        </aside>
    );
}

export default Sidebar;
