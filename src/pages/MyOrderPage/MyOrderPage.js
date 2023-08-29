import classNames from 'classnames/bind';
import styles from './MyOrderPage.module.scss';

import { ToastContainer } from 'react-toastify';
import { useMutation, useQuery } from '@tanstack/react-query';
import * as OrderService from '~/services/OrderService';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutationHooks } from '~/hooks/useMutationHook';

import ButtonComponent from '~/components/ButtonComponent';

const cx = classNames.bind(styles);

function MyOrderPage() {
    const location = useLocation();
    const { state } = location;
    const navigate = useNavigate();
    const fetchMyOrder = async () => {
        const res = await OrderService.getOrderByUserId(state?.id, state?.token);
        return res.data;
    };
    const queryOrder = useQuery(
        { queryKey: ['orders'], queryFn: fetchMyOrder },
        {
            enabled: state?.id && state?.token,
        },
    );
    const { data } = queryOrder;

    const handleDetailsOrder = (id) => {
        navigate(`/details-order/${id}`, {
            state: {
                token: state?.token,
            },
        });
    };

    const mutation = useMutationHooks((data) => {
        const { id, token, orderItems } = data;
        const res = OrderService.cancelOrder(id, token, orderItems);
        return res;
    });

    const handleCancelOrder = (order) => {
        mutation.mutate(
            { id: order._id, token: state?.token, orderItems: order?.orderItems },
            {
                onSuccess: () => {
                    queryOrder.refetch();
                },
            },
        );
    };

    const renderProduct = (data) => {
        return data?.map((order) => {
            return (
                <div key={order?.name}>
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
                </div>
            );
        });
    };

    return (
        <div className={cx('wrapper')}>
            <h2>Đơn hàng của tôi</h2>

            {data?.map((order) => {
                return (
                    <div key={order?.name}>
                        {/* <div
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
                        <span style={{ fontSize: '13px', color: '#242424', marginLeft: 'auto' }}>{order?.price}</span> */}

                        <div>{renderProduct(order?.orderItems)}</div>
                        <span>Tổng tiền: {order?.totalPrice}</span>
                        <ButtonComponent onClick={() => handleDetailsOrder(order?._id)} outline>
                            Xem chi tiết
                        </ButtonComponent>
                        <ButtonComponent onClick={() => handleCancelOrder(order)} outline>
                            Huỷ đơn hàng
                        </ButtonComponent>
                    </div>
                );
            })}
        </div>
    );
}

export default MyOrderPage;
