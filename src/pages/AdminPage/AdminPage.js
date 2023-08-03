import React, { useState } from 'react';
import { Menu } from 'antd';
import { PieChartOutlined, DesktopOutlined } from '@ant-design/icons';

import classNames from 'classnames/bind';
import styles from './AdminPage.module.scss';

import { getItem } from '~/utils';
import AdminUser from '~/layouts/components/AdminUser';
import AdminProduct from '~/layouts/components/AdminProduct';

const cx = classNames.bind(styles);

const items = [
    getItem('User', 'user', <PieChartOutlined />),
    getItem('Product', 'product', <DesktopOutlined />),
    // getItem('Option 3', '3', <ContainerOutlined />),
    // getItem('User', 'sub1', <UserOutlined />, [
    //     getItem('Option 5', '5'),
    //     getItem('Option 6', '6'),
    //     getItem('Option 7', '7'),
    //     getItem('Option 8', '8'),
    // ]),
    // getItem('Product', 'sub2', <AppstoreOutlined />, [
    //     getItem('Option 9', '9'),
    //     getItem('Option 10', '10'),
    //     getItem('Submenu', 'sub3', null, [getItem('Option 11', '11'), getItem('Option 12', '12')]),
    // ]),
];

const AdminPage = () => {
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
    return (
        <div className={cx('wrapper')}>
            <div className={cx('side-menu')}>
                <Menu className={cx('menu')} items={items} onClick={handleOnClick} />
            </div>
            <div className={cx('content')}>{renderPage(keySelected)}</div>
        </div>
    );
};
export default AdminPage;
