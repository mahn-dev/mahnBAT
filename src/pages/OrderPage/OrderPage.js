import classNames from 'classnames/bind';
import styles from './OrderPage.module.scss';
import { useDispatch, useSelector } from 'react-redux';

import ButtonComponent from '~/components/ButtonComponent';
import ModalComponent from '~/components/ModalComponent';
import { useMutationHooks } from '~/hooks/useMutationHook';
import * as UserService from '~/services/UserService';
import { updateUser } from '~/redux/slice/userSlice';

import {
    increaseAmount,
    decreaseAmount,
    removeOrderProduct,
    removeAllOrderProduct,
    selectedOrder,
} from '~/redux/slice/orderSlice';
import { Checkbox, Form } from 'antd';
import { useEffect, useState } from 'react';
import { convertPrice } from '~/utils';
import { useMemo } from 'react';
import InputFormComponent from '~/components/InputFormComponent';
import * as toast from '~/components/ToastMessageComponent';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function OrderPage() {
    const order = useSelector((state) => state.order);
    const user = useSelector((state) => state.user);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    const [listChecked, setListChecked] = useState([]);
    const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false);
    const [stateUserDetails, setStateUserDetails] = useState({
        name: '',
        phone: '',
        address: '',
    });

    const navigate = useNavigate();
    const [form] = Form.useForm();
    const dispatch = useDispatch();

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

    const handleChangeCheck = (e) => {
        if (listChecked.includes(e.target.value)) {
            const newListChecked = listChecked.filter((item) => item !== e.target.value);
            setListChecked(newListChecked);
        } else {
            setListChecked([...listChecked, e.target.value]);
        }
    };

    const handleChangeCount = (type, idProduct, limit) => {
        if (type === 'increase') {
            if (!limit) {
                dispatch(increaseAmount({ idProduct }));
            }
        } else {
            if (!limit) {
                dispatch(decreaseAmount({ idProduct }));
            }
        }
    };
    const handleDeleteOrder = (idProduct) => {
        dispatch(removeOrderProduct({ idProduct }));
    };

    const handleChangeCheckAll = (e) => {
        if (e.target.checked) {
            const newListChecked = [];
            order?.orderItems?.forEach((item) => {
                newListChecked.push(item?.product);
            });
            setListChecked(newListChecked);
        } else {
            setListChecked([]);
        }
    };

    useEffect(() => {
        dispatch(selectedOrder({ listChecked }));
    }, [listChecked]);

    useEffect(() => {
        form.setFieldsValue(stateUserDetails);
    }, [form, stateUserDetails]);

    useEffect(() => {
        if (isOpenModalUpdateInfo) {
            setStateUserDetails({
                // ...stateUserDetails,
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
        } else if (priceMemo === 0) {
            return 0;
        } else {
            return 20000;
        }
    }, [priceMemo]);

    const totalPriceMemo = useMemo(() => {
        return Number(priceMemo) + Number(deliveryPriceMemo);
    }, [priceMemo, deliveryPriceMemo]);

    const handleDeleteAllOrder = () => {
        if (listChecked?.length > 1) {
            dispatch(removeAllOrderProduct({ listChecked }));
        }
    };

    const handleAddCart = () => {
        if (!order?.orderItemsSelected?.length) {
            toast.error('Vui lòng chọn sản phẩm');
        } else if (!user?.phone || !user?.address || !user?.name) {
            setIsOpenModalUpdateInfo(true);
        } else {
            navigate('/payment');
        }
    };

    const mutationUpdate = useMutationHooks((data) => {
        const { id, token, ...rests } = data;
        const res = UserService.updateUser(id, { ...rests }, token);
        return res;
    });

    const { data } = mutationUpdate;

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

    console.log(stateUserDetails);
    return (
        <div className={cx('wrapper')}>
            <ToastContainer />
            <h2>order</h2>
            <Checkbox
                checked={listChecked?.length === order?.orderItems?.length}
                onChange={handleChangeCheckAll}
                value={order?.product}
            ></Checkbox>
            <span>Có {order?.orderItems?.length} sản phẩm</span>
            <ButtonComponent outline onClick={handleDeleteAllOrder}>
                Xoá tất cả
            </ButtonComponent>
            {order?.orderItems?.map((order) => {
                return (
                    <div key={order?.product}>
                        <Checkbox
                            checked={listChecked.includes(order?.product)}
                            onChange={handleChangeCheck}
                            value={order?.product}
                        ></Checkbox>
                        <img
                            src={order?.image}
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
                        <div className={cx('action-input')}>
                            <ButtonComponent
                                onClick={() => handleChangeCount('decrease', order?.product, order?.amount === 1)}
                            >
                                -
                            </ButtonComponent>
                            <input
                                min={1}
                                max={order?.countInStock}
                                placeholder="1"
                                className={cx('input')}
                                type="number"
                                // defaultValue={order?.amount}
                                value={order?.amount}
                                // onChange={handleChange}
                            />
                            <ButtonComponent
                                onClick={() =>
                                    handleChangeCount('increase', order?.product, order?.amount === order?.countInStock)
                                }
                            >
                                +
                            </ButtonComponent>
                        </div>
                        <div>Thành tiền: {convertPrice(order?.price * order?.amount)}</div>
                        <ButtonComponent outline onClick={() => handleDeleteOrder(order?.product)}>
                            Xoá
                        </ButtonComponent>
                    </div>
                );
            })}
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
                <ButtonComponent primary onClick={() => handleAddCart()}>
                    Mua hàng
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

export default OrderPage;
