import classNames from 'classnames/bind';
import styles from './Header.module.scss';

import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import {
    CartIcon,
    HeartIcon,
    VoucherIcon,
    SettingIcon,
    UserIcon,
    LanguageIcon,
    BatteryIcon,
    InfoIcon,
} from '~/components/Icons';

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import config from '~/config';

import Button from '~/components/Button';
import image from '~/assets/img';
import Menu from '~/components/Popper/Menu';
import Image from '~/components/Image';
import Search from '../Search';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        icon: <LanguageIcon />,
        title: 'Tiếng Việt',
        children: {
            title: 'Ngôn Ngữ',
            data: [
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
            ],
        },
    },
    {
        icon: <BatteryIcon />,
        title: 'Kiểm tra pin',
        to: '/batterycheck',
    },
    {
        icon: <InfoIcon />,
        title: 'Liên hệ',
    },
];

function Header() {
    const currentUser = false;

    const handleMenuCHange = (menuItem) => {
        switch (menuItem.type) {
            case 'language':
                break;
            default:
        }
    };

    const userMenu = [
        {
            icon: <UserIcon />,
            title: 'Tài khoản của tôi',
            to: '/myaccount',
        },
        {
            icon: <VoucherIcon />,
            title: 'Mã giảm giá',
            to: '/voucher',
        },
        {
            icon: <SettingIcon />,
            title: 'Cài đặt',
            to: '/settings',
        },
        ...MENU_ITEMS,
        {
            icon: <FontAwesomeIcon icon={faArrowRightFromBracket} />,
            title: 'Đăng xuất',
            to: '/logout',
            separate: true,
        },
    ];

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link className={cx('logo-link')} to={config.routes.home}>
                    <img className={cx('logo-src')} src={image.logoHome} alt="logo" />
                </Link>

                <Search />

                <div className={cx('action')}>
                    {currentUser ? (
                        <>
                            <Tippy content="Sản phẩm yêu thích" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <HeartIcon className={cx('heart-icon')} />
                                </button>
                            </Tippy>
                            <Tippy content="Theo dõi đơn hàng" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <CartIcon />
                                    <span className={cx('badge')}>10</span>
                                </button>
                            </Tippy>
                        </>
                    ) : (
                        <>
                            {/* <Button primary to="/products" target="_blank">
                            Đăng nhập
                        </Button> */}
                            {/* <Button primary leftIcon={<FontAwesomeIcon icon={faSignIn} />}>
                            Đăng nhập
                        </Button> */}
                            {/* <Button outline className={cx('login-btn')}>
                            Đăng nhập
                        </Button> */}
                            <Button primary>Đăng nhập</Button>
                        </>
                    )}
                    <Menu items={currentUser ? userMenu : MENU_ITEMS} onChange={handleMenuCHange}>
                        {currentUser ? (
                            <Image
                                className={cx('user-avt')}
                                src="https://klbtheme.com/partdo/wp-content/uploads/2022/10/1-15-600x600.jpg"
                                alt="User avatar"
                                fallback="https://klbtheme.com/partdo/wp-content/uploads/2022/10/1-36.jpg"
                            />
                        ) : (
                            <button className={cx('more-btn')}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        )}
                    </Menu>
                </div>
            </div>
        </header>
    );
}

export default Header;
