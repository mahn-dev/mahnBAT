import React, { useEffect, useState } from 'react';
import { Menu } from 'antd';

import classNames from 'classnames/bind';
import styles from './AdminPage.module.scss';
import config from '~/config';

import { getItem } from '~/utils';
import AdminUser from '~/layouts/components/AdminUser';
import AdminProduct from '~/layouts/components/AdminProduct';
import AdminOrder from '~/layouts/components/AdminOrder';
import ButtonComponent from '~/components/ButtonComponent';
import { HomeIcon, UserIcon, CartIcon } from '~/components/Icons';
import { useSelector } from 'react-redux';
import ChartComponent from '~/components/ChartComponent';
import { useQuery } from '@tanstack/react-query';
import * as OrderService from '~/services/OrderService';

const cx = classNames.bind(styles);

const items = [
    getItem('User', 'user', <UserIcon width={'2rem'} height={'2rem'} />),
    getItem('Product', 'product', <CartIcon width={'2rem'} height={'2rem'} />),
    getItem('Order', 'order', <CartIcon width={'2rem'} height={'2rem'} />),
];

const AdminPage = () => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const user = useSelector((state) => state.user);
    const getAllOrders = async () => {
        const res = await OrderService.getAllOrder(user?.access_token);
        return res;
    };
    const queryOrder = useQuery({ queryKey: ['orders'], queryFn: getAllOrders });
    const { data: orders } = queryOrder;

    const renderPage = (key) => {
        switch (key) {
            case 'user':
                return <AdminUser />;
            case 'product':
                return <AdminProduct />;
            case 'order':
                return <AdminOrder />;
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
                <ButtonComponent to={config.routes.home} primary>
                    <HomeIcon />
                </ButtonComponent>
                <div className={cx('username')}>
                    <span>{userName}</span>
                    <span>{email}</span>
                </div>
                <Menu theme="dark" className={cx('menu')} items={items} onClick={handleOnClick} />
            </div>
            <div className={cx('content')}>
                {!keySelected ? (
                    <div style={{ height: '200px', width: '200px' }}>
                        <ChartComponent data={orders?.data} />
                    </div>
                ) : (
                    <div>{renderPage(keySelected)}</div>
                )}
            </div>
        </div>
    );
};
export default AdminPage;
