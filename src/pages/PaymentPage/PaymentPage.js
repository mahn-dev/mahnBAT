import classNames from 'classnames/bind';
import styles from './PaymentPage.module.scss';
import { useDispatch, useSelector } from 'react-redux';

import ButtonComponent from '~/components/ButtonComponent';
import ModalComponent from '~/components/ModalComponent';
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
import InputFormComponent from '~/components/InputFormComponent';
import * as toast from '~/components/ToastMessageComponent';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function PaymentPage() {
    const order = useSelector((state) => state.order);
    const user = useSelector((state) => state.user);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [payment, setPayment] = useState('cod');
    const [delivery, setDelivery] = useState('ghtk');
    const navigate = useNavigate();

    useEffect(() => {
        setName(user?.name);
        setPhone(user?.phone);
        setAddress(user?.address);
    }, [user]);

    const handleOnChangeName = (value) => {
        setName(value);
    };
    const handleOnChangePhone = (value) => {
        setPhone(value);
    };
    const handleOnChangeAddress = (value) => {
        setAddress(value);
    };

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

    const priceMemo = useMemo(() => {
        const result = order?.orderItemsSelected?.reduce((total, cur) => {
            return total + cur.price * cur.amount;
        }, 0);
        return result;
    }, [order]);

    const deliveryPriceMemo = useMemo(() => {
        if (priceMemo > 100000) {
            return 10000;
        } else if (priceMemo === 0 || priceMemo >= 200000) {
            return 0;
        } else {
            return 20000;
        }
    }, [priceMemo]);

    const totalPriceMemo = useMemo(() => {
        return Number(priceMemo) + Number(deliveryPriceMemo);
    }, [priceMemo, deliveryPriceMemo]);

    const handleAddOrder = () => {
        if (
            user?.access_token &&
            order?.orderItemsSelected &&
            user?.name &&
            user?.address &&
            user?.phone &&
            priceMemo &&
            user?.id
        ) {
            mutationAddOrder.mutate({
                token: user?.access_token,
                orderItems: order?.orderItemsSelected,
                fullName: user?.name,
                address: user?.address,
                phone: user?.phone,
                paymentMethod: payment,
                itemsPrice: priceMemo,
                shippingPrice: deliveryPriceMemo,
                totalPrice: totalPriceMemo,
                user: user?.id,
                email: user?.email,
            });
        }
    };

    const mutationUpdate = useMutationHooks((data) => {
        const { id, token, ...rests } = data;
        const res = UserService.updateUser(id, { ...rests }, token);
        return res;
    });
    const mutationAddOrder = useMutationHooks((data) => {
        const { token, ...rests } = data;
        const res = OrderService.createOrder({ ...rests }, token);
        return res;
    });

    const { data } = mutationUpdate;
    const { data: dataAdd, isSuccess, isError } = mutationAddOrder;

    useEffect(() => {
        if (isSuccess && dataAdd?.status === 'OK') {
            const arrOrdered = [];
            order?.orderItemsSelected?.forEach((element) => {
                arrOrdered.push(element.product);
            });
            dispatch(removeAllOrderProduct({ listChecked: arrOrdered }));
            toast.success('Đặt hàng thành công');
            navigate('/order-success', {
                state: {
                    delivery,
                    payment,
                    order: order?.orderItemsSelected,
                    totalPrice: totalPriceMemo,
                },
            });
        } else if (isError) {
            toast.error('Đặt hàng thất bại');
        }
    }, [isSuccess, isError]);

    const handleCancelUpdate = () => {
        setStateUserDetails({
            name: '',
            email: '',
            phone: '',
            address: '',
            isAdmin: false,
        });
        form.resetFields();
        setIsOpenModalUpdateInfo(false);
    };

    // const handleUpdateInfoUser = () => {
    //     const { name, phone, address } = stateUserDetails;
    //     if (name && phone && address) {
    //         mutationUpdate.mutate(
    //             { id: user?.id, token: user?.access_token, ...stateUserDetails },
    //             {
    //                 onSuccess: () => {
    //                     dispatch(updateUser({ name, phone, address }));
    //                     setIsOpenModalUpdateInfo(false);
    //                 },
    //             },
    //         );
    //     }
    // };

    const handleUpdateInfoUser = () => {
        // const { name, phone, address } = stateUserDetails;
        if (name && phone && address) {
            // mutationUpdate.mutate(
            //     { id: user?.id, token: user?.access_token, ...stateUserDetails },
            //     {
            //         onSuccess: () => {
            //             dispatch(updateUser({ name, phone, address }));
            //             setIsOpenModalUpdateInfo(false);
            //         },
            //     },
            // );

            mutationUpdate.mutate(
                {
                    id: user?.id,
                    name,
                    phone,
                    address,
                    access_token: user?.access_token,
                    // ...stateUserDetails,
                },
                {
                    onSuccess: () => {
                        dispatch(updateUser({ name, phone, address }));
                        setIsOpenModalUpdateInfo(false);
                    },
                },
            );
        }
    };

    // const handleOnChangeDetails = (e) => {
    //     setStateUserDetails({
    //         ...stateUserDetails,
    //         [e.target.name]: e.target.value,
    //     });
    // };

    const handleDelivery = (e) => {
        setDelivery(e.target.value);
    };

    const handlePayment = (e) => {
        setPayment(e.target.value);
    };

    return (
        <div className={cx('wrapper')}>
            <ToastContainer />
            <h2>payment</h2>

            <div>
                <div>
                    <h3>Chọn đơn vị vận chuyển</h3>
                    <Radio.Group onChange={handleDelivery} value={delivery}>
                        <Radio value="ghtk">
                            <span style={{ color: '#ea8500', fontWeight: 'bold' }}>GHTK</span> Giao hàng tiết kiệm
                        </Radio>
                        <Radio value="ghn">
                            <span style={{ color: '#ea8500', fontWeight: 'bold' }}>GHN</span> Giao hàng nhanh
                        </Radio>
                        <Radio value="j&t">
                            <span style={{ color: '#ea8500', fontWeight: 'bold' }}>J&T</span> J&T Express
                        </Radio>
                    </Radio.Group>
                </div>
                <div>
                    <h3>Chọn phương thức thanh toán</h3>
                    <Radio.Group onChange={handlePayment} value={payment}>
                        <Radio value="cod">Thanh toán khi nhận hàng (COD)</Radio>
                        <Radio value="banking">Chuyển khoản ngân hàng</Radio>
                    </Radio.Group>
                </div>
            </div>

            <div>
                <div>
                    <span>Địa chỉ giao hàng: {user?.address}</span>
                    <ButtonComponent outline onClick={handleChangeAddress}>
                        Đổi địa chỉ
                    </ButtonComponent>
                </div>
                <span>Tạm tính: {convertPrice(priceMemo)}</span>
                <span>Phí vận chuyển: {convertPrice(deliveryPriceMemo)}</span>
                <span>Tổng cộng: {convertPrice(totalPriceMemo)}</span>
                <ButtonComponent onClick={() => handleAddOrder()} primary>
                    Đặt hàng
                </ButtonComponent>
            </div>
            <ModalComponent
                title="Cập nhật thông tin giao hàng"
                open={isOpenModalUpdateInfo}
                onCancel={handleCancelUpdate}
                onOk={handleUpdateInfoUser}
            >
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 800,
                    }}
                    // onFinish={onUpdateUser}
                    autoComplete="on"
                    form={form}
                >
                    <Form.Item
                        label="Tên người dùng"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Nhập tên người dùng!',
                            },
                        ]}
                    >
                        <InputFormComponent value={stateUserDetails?.name} onChange={handleOnChangeName} name="name" />
                    </Form.Item>

                    <Form.Item
                        label="Số điện thoại"
                        name="phone"
                        rules={[
                            {
                                required: true,
                                message: 'Nhập số điện thoại!',
                            },
                        ]}
                    >
                        <InputFormComponent
                            value={stateUserDetails?.phone}
                            onChange={handleOnChangePhone}
                            name="phone"
                        />
                    </Form.Item>
                    <Form.Item
                        label="Địa chỉ"
                        name="address"
                        rules={[
                            {
                                required: true,
                                message: 'Nhập địa chỉ!',
                            },
                        ]}
                    >
                        <InputFormComponent
                            value={stateUserDetails?.address}
                            onChange={handleOnChangeAddress}
                            name="address"
                        />
                    </Form.Item>
                </Form>
            </ModalComponent>
        </div>
    );
}

export default PaymentPage;
