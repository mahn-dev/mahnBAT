import React, { useEffect, useState } from 'react';
import { Menu } from 'antd';

import classNames from 'classnames/bind';
import styles from './AdminPage.module.scss';
import config from '~/config';

import { getItem } from '~/utils';
import AdminUser from '~/layouts/components/AdminUser';
import AdminProduct from '~/layouts/components/AdminProduct';
import Button from '~/components/Button';
import { HomeIcon, UserIcon, CartIcon } from '~/components/Icons';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

const items = [
    getItem('User', 'user', <UserIcon width={'2rem'} height={'2rem'} />),
    getItem('Product', 'product', <CartIcon width={'2rem'} height={'2rem'} />),
];

const AdminPage = () => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const user = useSelector((state) => state.user);

    const renderPage = (key) => {
        switch (key) {
            case 'user':
                return <AdminUser />;
            case 'product':
                return <AdminProduct />;
            default:
                return <></>;
        }
    };

    const [keySelected, setKeySelected] = useState('');

    const handleOnClick = ({ key }) => {
        setKeySelected(key);
    };
    useEffect(() => {
        setUserName(user?.username);
        setEmail(user?.email);
    }, [user?.username, user?.email]);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('side-menu')}>
                <Button to={config.routes.home} primary>
                    <HomeIcon />
                </Button>
                <div className={cx('username')}>
                    <span>{userName}</span>
                    <span>{email}</span>
                </div>
                <Menu className={cx('menu')} items={items} onClick={handleOnClick} />
            </div>
            <div className={cx('content')}>{renderPage(keySelected)}</div>
        </div>
    );
};
export default AdminPage;
