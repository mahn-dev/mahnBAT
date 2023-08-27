import classNames from 'classnames/bind';
import styles from './OrderSuccessPage.module.scss';
import { useDispatch, useSelector } from 'react-redux';

import Button from '~/components/Button';
import { useMutationHooks } from '~/hooks/useMutationHook';
import * as UserService from '~/services/UserService';
import * as OrderService from '~/services/OrderService';
import { updateUser } from '~/redux/slice/userSlice';

import {
    increaseAmount,
    decreaseAmount,
    removeOrderProduct,
    removeAllOrderProduct,
    selectedOrder,
} from '~/redux/slice/orderSlice';
import { Checkbox, Form, Radio } from 'antd';
import { useEffect, useState } from 'react';
import { convertPrice } from '~/utils';
import { useMemo } from 'react';
import * as toast from '~/components/ToastMessage';
import { ToastContainer } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import { orderContant } from '~/contant';

const cx = classNames.bind(styles);

function OrderSuccessPage() {
    const order = useSelector((state) => state.order);
    const user = useSelector((state) => state.user);
    const location = useLocation();
    const { state } = location;
    const [payment, setPayment] = useState('cod');
    const [delivery, setDelivery] = useState('ghtk');

    const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false);
    const [stateUserDetails, setStateUserDetails] = useState({
        name: '',
        phone: '',
        address: '',
    });

    const [form] = Form.useForm();
    const dispatch = useDispatch();

    useEffect(() => {
        form.setFieldsValue(stateUserDetails);
    }, [form, stateUserDetails]);

    useEffect(() => {
        if (isOpenModalUpdateInfo) {
            setStateUserDetails({
                ...stateUserDetails,
                name: user?.name,
                phone: user?.phone,
                address: user?.address,
            });
        }
    }, [isOpenModalUpdateInfo]);

    const handleChangeAddress = () => {
        setIsOpenModalUpdateInfo(true);
    };

    // const priceMemo = useMemo(() => {
    //     const result = order?.orderItemsSelected?.reduce((total, cur) => {
    //         return total + cur.price * cur.amount;
    //     }, 0);
    //     return result;
    // }, [order]);

    // const deliveryPriceMemo = useMemo(() => {
    //     if (priceMemo > 100000) {
    //         return 10000;
    //     } else if (priceMemo === 0) {
    //         return 0;
    //     } else {
    //         return 20000;
    //     }
    // }, [priceMemo]);

    // const totalPriceMemo = useMemo(() => {
    //     return Number(priceMemo) + Number(deliveryPriceMemo);
    // }, [priceMemo, deliveryPriceMemo]);

    return (
        <div className={cx('wrapper')}>
            <ToastContainer />
            <h2>Đơn hàng đã đặt thành công</h2>

            <div>
                <div>
                    <h3>Đơn vị vận chuyển</h3>
                    <span style={{ color: '#ea8500', fontWeight: 'bold' }}>
                        {orderContant.delivery[state?.delivery]}
                    </span>{' '}
                    Giao hàng tiết kiệm
                </div>
                <div>
                    <h3>Phương thức thanh toán</h3>
                    <span style={{ color: '#ea8500', fontWeight: 'bold' }}>{orderContant.payment[state?.payment]}</span>
                </div>
            </div>

            <div>
                <div>
                    <span>Địa chỉ giao hàng: {user?.address}</span>
                </div>
                {/* <span>Tạm tính: {convertPrice(priceMemo)}</span>
                <span>Phí vận chuyển: {convertPrice(deliveryPriceMemo)}</span> */}
                {/* <span>Tổng cộng: {convertPrice(totalPriceMemo)}</span> */}
            </div>

            {state.order?.map((order) => {
                return (
                    <div key={order?.name}>
                        <img
                            src={order.image}
                            style={{
                                height: '100px',
                                width: '100px',
                                objectFit: 'cover',
                                borderRadius: '12px',
                                border: '1px solid var(--border-color) ',
                            }}
                            alt="img"
                        />

                        <div
                            style={{
                                width: '250px',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            Tên sản phẩm: {order?.name}
                        </div>
                        <div>Giá sản phẩm: {convertPrice(order?.price)}</div>
                        <div>Số lượng: {order?.amount}</div>
                        {/* <div>Thành tiền: {convertPrice(order?.price * order?.amount)}</div> */}
                    </div>
                );
            })}

            <div>
                <span>Tổng cộng: {convertPrice(state?.totalPrice)}</span>
            </div>
        </div>
    );
}

export default OrderSuccessPage;
