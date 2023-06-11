import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEllipsisVertical,
    faEarthAsia,
    faBatteryFull,
    faCircleInfo,
    faTruck,
    faGear,
    faGift,
    faUser,
    faArrowRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart, faMessage } from '@fortawesome/free-regular-svg-icons';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import Button from '~/components/Button';
import image from '~/assets/img';
import styles from './Header.module.scss';
import Menu from '~/components/Popper/Menu';
import Image from '~/components/Image';
import Search from '../Search';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'Tiếng Việt',
        children: {
            title: 'Language',
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
        icon: <FontAwesomeIcon icon={faBatteryFull} />,
        title: 'Kiểm tra pin',
        to: '/batterycheck',
    },
    {
        icon: <FontAwesomeIcon icon={faCircleInfo} />,
        title: 'Liên hệ',
    },
];

function Header() {
    const currentUser = true;

    const handleMenuCHange = (menuItem) => {
        switch (menuItem.type) {
            case 'language':
                break;
            default:
        }
    };

    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'Tài khoản của tôi',
            to: '/myaccount',
        },
        {
            icon: <FontAwesomeIcon icon={faGift} />,
            title: 'Mã giảm giá',
            to: '/voucher',
        },
        {
            icon: <FontAwesomeIcon icon={faGear} />,
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
                <a className={cx('logo-link')} href="/">
                    <img className={cx('logo-src')} src={image.logoHome} alt="logo" />
                </a>

                <Search />

                <div className={cx('action')}>
                    {currentUser ? (
                        <>
                            <Tippy content="Sản phẩm yêu thích" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <FontAwesomeIcon icon={faHeart} />
                                </button>
                            </Tippy>
                            <Tippy content="Theo dõi đơn hàng" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <FontAwesomeIcon icon={faTruck} />
                                    <span className={cx('badge')}>10</span>
                                </button>
                            </Tippy>
                            <Tippy content="Thông báo" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <FontAwesomeIcon icon={faMessage} />
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
