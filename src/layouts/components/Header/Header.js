import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import {
    CartIcon,
    HeartIcon,
    VoucherIcon,
    UserIcon,
    LanguageIcon,
    BatteryIcon,
    InfoIcon,
    AdminIcon,
} from '~/components/Icons';

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import config from '~/config';

import Button from '~/components/Button';
import image from '~/assets/img';
import Menu from '~/components/Popper/Menu';
import Image from '~/components/Image';
import Search from '../Search';
import * as UserService from '~/services/UserService';
import { resetUser } from '~/redux/slice/userSlice';

const cx = classNames.bind(styles);

function Header() {
    const [userName, setUserName] = useState('');
    const [nameUser, setNameUser] = useState('');
    const [userAvatar, setUserAvatar] = useState('');
    const navigate = useNavigate();
    const order = useSelector((state) => state.order);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    const handleLogout = async () => {
        await UserService.logoutUser();
        dispatch(resetUser());
    };

    const handleClickNavigate = () => {
        navigate('/my-order', {
            state: {
                id: user?.id,
                token: user?.access_token,
            },
        });
    };

    const notLoggedMenu = [
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
            title: 'Tra cứu bảo hành',
            to: '/batterycheck',
        },
        {
            icon: <InfoIcon />,
            title: 'Liên hệ',
            to: '/voucher',
        },
    ];

    const handleMenuChange = (notLoggedMenu) => {
        switch (notLoggedMenu.type) {
            case 'language':
                break;
            default:
        }
    };

    const loggedMenu = [
        {
            icon: <UserIcon />,
            title: 'Tài khoản của tôi',
            to: '/profile-user',
        },
        {
            icon: <UserIcon />,
            title: 'Đơn hàng của tôi',
            // to: '/my-order',
            onClick: handleClickNavigate,
        },
        {
            icon: <VoucherIcon />,
            title: 'Mã giảm giá',
            to: '/voucher',
        },
        ...notLoggedMenu,
        {
            icon: <FontAwesomeIcon icon={faArrowRightFromBracket} />,
            title: 'Đăng xuất',
            separate: true,
            onClick: handleLogout,
        },
    ];

    useEffect(() => {
        setUserName(user?.username);
        setNameUser(user?.name);
        setUserAvatar(user?.avatar);
    }, [user?.username, user?.name, user?.avatar]);
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link className={cx('logo-link')} to={config.routes.home}>
                    <img className={cx('logo-src')} src={image.logoHome} alt="logo" />
                </Link>

                <Search />

                <div className={cx('action')}>
                    {user?.access_token ? (
                        <>
                            <div>
                                <span>Xin chào </span>
                                <span>{nameUser?.length ? nameUser : user?.userName}</span>
                            </div>

                            {user?.isAdmin && (
                                <Button className={cx('admin-btn')} to="/system/admin" primary>
                                    <AdminIcon />
                                </Button>
                            )}

                            <Tippy content="Sản phẩm yêu thích" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <HeartIcon className={cx('heart-icon')} />
                                </button>
                            </Tippy>
                            <Tippy content="Theo dõi đơn hàng" placement="bottom">
                                <Button to={config.routes.order} className={cx('action-btn')}>
                                    <CartIcon />
                                    <span className={cx('badge')}>{order?.orderItems?.length}</span>
                                </Button>
                            </Tippy>

                            <Menu items={user?.access_token ? loggedMenu : notLoggedMenu} onChange={handleMenuChange}>
                                {user?.access_token ? (
                                    <Image
                                        className={cx('user-avt')}
                                        src={userAvatar}
                                        alt="User avatar"
                                        fallback={image.noImage}
                                    />
                                ) : (
                                    <button className={cx('more-btn')}>
                                        <FontAwesomeIcon icon={faEllipsisVertical} />
                                    </button>
                                )}
                            </Menu>
                        </>
                    ) : (
                        <>
                            <Button to="/sign-in" primary>
                                Đăng nhập
                            </Button>
                            <Menu items={user?.access_token ? loggedMenu : notLoggedMenu} onChange={handleMenuChange}>
                                {user?.access_token ? (
                                    <Image
                                        className={cx('user-avt')}
                                        src={userAvatar}
                                        alt="User avatar"
                                        fallback={image.noImage}
                                    />
                                ) : (
                                    <button className={cx('more-btn')}>
                                        <FontAwesomeIcon icon={faEllipsisVertical} />
                                    </button>
                                )}
                            </Menu>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
