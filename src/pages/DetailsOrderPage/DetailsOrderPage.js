import classNames from 'classnames/bind';
import styles from './DetailsOrderPage.module.scss';

import { ToastContainer } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import * as OrderService from '~/services/OrderService';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import Button from '~/components/Button';
import { useEffect } from 'react';
import { orderContant } from '~/contant';

const cx = classNames.bind(styles);

function DetailsOrderPage() {
    const params = useParams();
    const { id } = params;
    const location = useLocation();
    const { state } = location;

    const fetchDetailsOrder = async () => {
        const res = await OrderService.getDetailsOrder(id, state?.token);
        return res.data;
    };
    const queryOrder = useQuery(
        { queryKey: ['orders-details'], queryFn: fetchDetailsOrder },
        {
            enabled: id,
        },
    );
    const { data } = queryOrder;

    return (
        <div className={cx('wrapper')}>
            <h2>Chi tiết đơn hàng đã đặt</h2>
            <div>
                <h3>Thông tin địa chỉ người nhận</h3>
                <div>{data?.shippingAddress?.fullName}</div>
                <div>{data?.shippingAddress?.phone}</div>
                <div>{data?.shippingAddress?.address}</div>
            </div>
            <div>
                <h3>Hình thức giao hàng</h3>
                <div>Giao hàng tiết kiệm</div>
                <div>Phí giao hàng: {data?.shippingPrice}</div>
            </div>
            <div>
                <h3>Hình thức thanh toán</h3>
                <div>{orderContant[data?.paymentMethod]}</div>
                <div>{data?.isPaid ? 'Chưa thanh toán' : 'Đã thanh toán'}</div>
            </div>
            {data?.orderItems?.map((order) => {
                return (
                    <>
                        <img
                            src={order?.image}
                            style={{
                                width: '70px',
                                height: '70px',
                                objectFit: 'cover',
                                border: '1px solid rgb(238, 238, 238)',
                                padding: '2px',
                            }}
                        />
                        <div
                            style={{
                                width: 260,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                marginLeft: '10px',
                            }}
                        >
                            {order?.name}
                        </div>
                        <span style={{ fontSize: '13px', color: '#242424', marginLeft: 'auto' }}>{order?.price}</span>
                        <span style={{ fontSize: '13px', color: '#242424', marginLeft: 'auto' }}>{order?.amount}</span>
                    </>
                );
            })}
            <span>Tổng tiền: {data?.totalPrice}</span>
        </div>
    );
}

export default DetailsOrderPage;
