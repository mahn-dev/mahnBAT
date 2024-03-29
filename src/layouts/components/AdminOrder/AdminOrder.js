import { Form, Space, Upload } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';

import ButtonComponent from '~/components/ButtonComponent';
import ChartComponent from '~/components/ChartComponent';
import TableComponent from '~/components/TableComponent';
import DrawerComponent from '~/components/DrawerComponent';
import InputComponent from '~/components/InputComponent';
import ModalComponent from '~/components/ModalComponent';
import { getBase64 } from '~/utils';
import { useMutationHooks } from '~/hooks/useMutationHook';
import * as UserService from '~/services/UserService';
import * as OrderService from '~/services/OrderService';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { orderContant } from '~/contant';
import { convertPrice } from '~/utils';

function AdminOrder() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    const [rowSelected, setRowSelected] = useState('');
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const user = useSelector((state) => state?.user);

    const [stateUserDetails, setStateUserDetails] = useState({
        username: '',
        name: '',
        avatar: '',
        email: '',
        phone: '',
        address: '',
        isAdmin: false,
    });

    const [form] = Form.useForm();

    const mutationUpdate = useMutationHooks((data) => {
        const { id, token, ...rests } = data;
        const res = UserService.updateUser(id, { ...rests }, token);
        return res;
    });
    const mutationDelete = useMutationHooks((data) => {
        const { id, token } = data;
        const res = UserService.deleteUser(id, token);
        return res;
    });

    const mutationDeleteMany = useMutationHooks((data) => {
        const { token, ...ids } = data;
        const res = UserService.deleteManyUser(ids, token);
        return res;
    });

    const getAllOrders = async () => {
        const res = await OrderService.getAllOrder(user?.access_token);
        return res;
    };

    const fetchGetDetailsUser = async (rowSelected) => {
        const res = await UserService.getDetailsUser(rowSelected);
        if (res?.data) {
            setStateUserDetails({
                username: res?.data?.username,
                name: res?.data?.name,
                email: res?.data?.email,
                avatar: res?.data?.avatar,
                phone: res?.data?.phone,
                address: res?.data?.address,
                isAdmin: res?.data?.isAdmin,
            });
        }
    };

    useEffect(() => {
        form.setFieldsValue(stateUserDetails);
    }, [form, stateUserDetails]);

    useEffect(() => {
        if (rowSelected && isOpenDrawer) {
            fetchGetDetailsUser(rowSelected);
        }
    }, [rowSelected, isOpenDrawer]);

    const handleDetailUser = () => {
        // if (rowSelected) {
        //     fetchGetDetailsUser();
        // }
        setIsOpenDrawer(true);
    };

    const handleDeleteManyUsers = (ids) => {
        mutationDeleteMany.mutate(
            { ids: ids, token: user?.access_token },
            {
                onSettled: () => {
                    queryOrder.refetch();
                },
            },
        );
    };

    const { data: dataUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate;
    const { data: dataDeleted, isSuccess: isSuccessDeleted, isError: isErrorDeleted } = mutationDelete;
    const { data: dataDeletedMany, isSuccess: isSuccessDeletedMany, isError: isErrorDeletedMany } = mutationDeleteMany;

    const queryOrder = useQuery({ queryKey: ['orders'], queryFn: getAllOrders });
    const { data: orders } = queryOrder;
    const renderAction = () => {
        return (
            <div>
                <DeleteOutlined onClick={() => setIsModalOpenDelete(true)} />
                <EditOutlined onClick={handleDetailUser} />
            </div>
        );
    };

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        // setSearchText(selectedKeys[0]);
        // setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        // setSearchText('');
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <InputComponent
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <ButtonComponent
                        primary
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </ButtonComponent>
                    <ButtonComponent
                        primary
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </ButtonComponent>

                    <ButtonComponent
                        primary
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </ButtonComponent>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        // render: (text) =>
        //     searchedColumn === dataIndex ? (
        //         <Highlighter
        //             highlightStyle={{
        //                 backgroundColor: '#ffc069',
        //                 padding: 0,
        //             }}
        //             searchWords={[searchText]}
        //             autoEscape
        //             textToHighlight={text ? text.toString() : ''}
        //         />
        //     ) : (
        //         text
        //     ),
    });

    const columns = [
        {
            title: 'Tên khách hàng',
            dataIndex: 'userName',
            sorter: (a, b) => a.userName.length - b.userName.length,
            ...getColumnSearchProps('userName'),
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            sorter: (a, b) => a.phone.length - b.phone.length,
            ...getColumnSearchProps('phone'),
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
        },
        {
            title: 'Ngày đặt hàng',
            dataIndex: 'createdAt',
        },
        {
            title: 'Tổng tiền hàng',
            dataIndex: 'itemsPrice',
        },
        {
            title: 'Phí vận chuyển',
            dataIndex: 'shippingPrice',
        },
        {
            title: 'Thành tiền',
            dataIndex: 'totalPrice',
        },
        {
            title: 'Trạng thái giao hàng',
            dataIndex: 'isDelivered',
        },
        {
            title: 'Hình thức thanh toán',
            dataIndex: 'paymentMethod',
            sorter: (a, b) => a.paymentMethod.length - b.paymentMethod.length,
            ...getColumnSearchProps('paymentMethod'),
        },
        {
            title: 'Trạng thái thanh toán',
            dataIndex: 'isPaid',
        },
        {
            title: 'Sửa/Xoá người dùng',
            dataIndex: 'action',
            render: renderAction,
        },
    ];
    const dataTable =
        orders?.data?.length &&
        orders?.data?.map((order) => {
            return {
                ...order,
                key: order._id,
                userName: order?.shippingAddress?.fullName,
                phone: order?.shippingAddress?.phone,
                address: order?.shippingAddress?.address,
                // itemsPrice: order?.itemsPrice,
                // shippingPrice: order?.shippingPrice,
                totalPrice: convertPrice(order?.totalPrice),
                // createdAt: order?.createdAt,
                paymentMethod: orderContant.payment[order?.paymentMethod],
                isDelivered: order?.isDelivered ? 'Đã giao hàng' : 'Chưa giao hàng',
                isPaid: order?.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán',
            };
        });

    useEffect(() => {
        if (isSuccessUpdated && dataUpdated?.status === 'ok') {
            handleCloseDrawer();
        }
    }, [isSuccessUpdated]);

    useEffect(() => {
        if (isSuccessDeleted && dataDeleted?.status === 'ok') {
            handleCancelDelete();
        }
    }, [isSuccessDeleted]);

    useEffect(() => {
        if (isSuccessDeletedMany && dataDeletedMany?.status === 'ok') {
        }
    }, [isSuccessDeletedMany]);

    const handleCloseDrawer = () => {
        setIsOpenDrawer(false);
        setStateUserDetails({
            username: '',
            name: '',
            email: '',
            avatar: '',
            phone: '',
            address: '',
            isAdmin: false,
        });
        form.resetFields();
    };

    // const handleOk = () => {
    //     onFinish();
    // };

    const handleCancelDelete = () => {
        setIsModalOpenDelete(false);
    };

    const handleDeleteUser = () => {
        mutationDelete.mutate(
            { id: rowSelected, token: user?.access_token },
            {
                onSettled: () => {
                    queryOrder.refetch();
                },
            },
        );
    };

    const handleOnChangeDetails = (e) => {
        setStateUserDetails({
            ...stateUserDetails,
            [e.target.name]: e.target.value,
        });
    };

    const handleOnChangeImageDetails = async ({ fileList }) => {
        const file = fileList[0];
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateUserDetails({
            ...stateUserDetails,
            avatar: file.preview,
        });
    };
    const onUpdateUser = () => {
        mutationUpdate.mutate(
            { id: rowSelected, token: user?.access_token, ...stateUserDetails },
            {
                onSettled: () => {
                    queryOrder.refetch();
                },
            },
        );
    };
    return (
        <div>
            <h2>Quản lý đơn hàng</h2>
            <div style={{ height: '200px', width: '200px' }}>
                <ChartComponent data={orders?.data} />
            </div>
            <TableComponent
                handleDeleteMany={handleDeleteManyUsers}
                columns={columns}
                data={dataTable}
                onRow={(record, rowIndex) => {
                    return {
                        onClick: (event) => {
                            setRowSelected(record._id);
                        },
                    };
                }}
            />
            <DrawerComponent
                title="Chỉnh sửa thông tin đơn hàng"
                isOpen={isOpenDrawer}
                onClose={() => {
                    setIsOpenDrawer(false);
                }}
                width="50%"
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
                    onFinish={onUpdateUser}
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
                        <InputComponent value={stateUserDetails.name} onChange={handleOnChangeDetails} name="name" />
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
                        <InputComponent value={stateUserDetails.phone} onChange={handleOnChangeDetails} name="phone" />
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
                        <InputComponent
                            value={stateUserDetails.address}
                            onChange={handleOnChangeDetails}
                            name="address"
                        />
                    </Form.Item>
                    <Form.Item
                        label="Ảnh người dùng"
                        name="avatar"
                        rules={[
                            {
                                required: true,
                                message: 'Thêm ảnh người dùng!',
                            },
                        ]}
                    >
                        <Upload onChange={handleOnChangeImageDetails} maxCount={1}>
                            <ButtonComponent outline>Chọn ảnh</ButtonComponent>
                            {stateUserDetails?.avatar && (
                                <img
                                    src={stateUserDetails?.avatar}
                                    style={{
                                        border: '1px solid #ccc',
                                        height: '150px',
                                        width: '150px',
                                        objectFit: 'contain',
                                    }}
                                    alt="user-img"
                                />
                            )}
                        </Upload>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <ButtonComponent primary htmlType="submit">
                            Update
                        </ButtonComponent>
                    </Form.Item>
                </Form>
            </DrawerComponent>
            <ModalComponent
                forceRender
                title="Xoá đơn hàng này?"
                open={isModalOpenDelete}
                onOk={handleDeleteUser}
                onCancel={handleCancelDelete}
            >
                <div>Xác nhận xoá ?</div>
            </ModalComponent>
        </div>
    );
}

export default AdminOrder;
