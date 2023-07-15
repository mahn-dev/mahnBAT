import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { useSelector } from 'react-redux';

import { Link, useNavigate } from 'react-router-dom';
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
    const user = useSelector((state) => state.user);
    console.log(user);
    const navigate = useNavigate();
    const handleNavigateLogin = () => {
        navigate('/sign-in');
    };

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
                            {user?.username ? (
                                <div>{user.username}</div>
                            ) : (
                                <Button onClick={handleNavigateLogin} primary>
                                    Đăng nhập
                                </Button>
                            )}
                            {/* <Button primary to="/products" target="_blank">
                            Đăng nhập
                        </Button> */}
                            {/* <Button primary leftIcon={<FontAwesomeIcon icon={faSignIn} />}>
                            Đăng nhập
                        </Button> */}
                            {/* <Button outline className={cx('login-btn')}>
                            Đăng nhập
                        </Button> */}
                        </>
                    )}
                    <Menu items={currentUser ? userMenu : MENU_ITEMS} onChange={handleMenuCHange}>
                        {currentUser ? (
                            <Image
                                className={cx('user-avt')}
                                src="data:image/jpeg;base64,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"
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
