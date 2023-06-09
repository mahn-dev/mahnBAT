import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleXmark,
    faSpinner,
    faMagnifyingGlass,
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
import HeadlessTippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';

import Button from '~/components/Button';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import logoHome from '~/assets/img/logomahnBatFinal.png';
import styles from './Header.module.scss';
import ProductsItem from '~/components/ProductsItem';
import Menu from '~/components/Popper/Menu';

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
    const [searchResult, setSearchResult] = useState([]);

    const currentUser = true;

    useEffect(() => {
        setTimeout(() => {
            setSearchResult([]);
        }, 0);
    }, []);

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
                    <img className={cx('logo-src')} src={logoHome} alt="logo" />
                </a>
                <HeadlessTippy
                    interactive
                    visible={searchResult.length > 0}
                    render={(attrs) => (
                        <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                            <PopperWrapper>
                                <h4 className={cx('search-title')}>Sản phẩm</h4>
                                <ProductsItem />
                                <ProductsItem />
                                <ProductsItem />
                                <ProductsItem />
                            </PopperWrapper>
                        </div>
                    )}
                >
                    <div className={cx('search')}>
                        <input placeholder="Tìm kiếm sản phẩm..." spellCheck={false} />
                        <button className={cx('clear')}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                        <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />

                        <button className={cx('search-btn')}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </div>
                </HeadlessTippy>

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
                                </button>
                            </Tippy>
                            <Tippy content="Thông báo" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <FontAwesomeIcon icon={faMessage} />
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
                            <img
                                className={cx('user-avt')}
                                src="https://res.cloudinary.com/daily-now/image/upload/f_auto,q_auto/v1/posts/7eb5b67e2ccb838a5986662cb9daf4a3?_a=AQADKdt"
                                alt=""
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
