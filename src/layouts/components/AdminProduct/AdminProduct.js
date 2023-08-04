import { Form, Space, Upload } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';

import { SearchIcon, UndoIcon, CloseIcon } from '~/components/Icons';
import Button from '~/components/Button';
import TableComponent from '~/components/TableComponent';
import DrawerComponent from '~/components/DrawerComponent';
import InputComponent from '~/components/InputComponent';
import ModalComponent from '~/components/ModalComponent';
import { getBase64 } from '~/utils';
import { useMutationHooks } from '~/hooks/useMutationHook';
import * as ProductService from '~/services/ProductService';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';

function AdminProduct() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    const [rowSelected, setRowSelected] = useState('');
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const user = useSelector((state) => state?.user);
    const [stateProduct, setStateProduct] = useState({
        name: '',
        image: '',
        type: '',
        price: '',
        countInStock: '',
        percentDiscount: '',
        description: '',
    });
    const [stateProductDetails, setStateProductDetails] = useState({
        name: '',
        image: '',
        type: '',
        price: '',
        countInStock: '',
        percentDiscount: '',
        description: '',
    });

    const [form] = Form.useForm();

    const mutation = useMutationHooks((data) => {
        const { name, image, type, price, countInStock, percentDiscount, description } = data;
        const res = ProductService.createProduct({
            name,
            image,
            type,
            price,
            countInStock,
            percentDiscount,
            description,
        });
        return res;
    });
    const mutationUpdate = useMutationHooks((data) => {
        const { id, token, ...rests } = data;
        const res = ProductService.updateProduct(id, token, { ...rests });
        return res;
    });
    const mutationDelete = useMutationHooks((data) => {
        const { id, token } = data;
        const res = ProductService.deleteProduct(id, token);
        return res;
    });
    const mutationDeleteMany = useMutationHooks((data) => {
        const { token, ...ids } = data;
        const res = ProductService.deleteManyProduct(ids, token);
        return res;
    });

    const getAllProducts = async () => {
        const res = await ProductService.getAllProduct();
        return res;
    };

    const fetchGetDetailsProduct = async (rowSelected) => {
        const res = await ProductService.getDetailsProduct(rowSelected);
        if (res?.data) {
            setStateProductDetails({
                name: res?.data?.name,
                image: res?.data?.image,
                type: res?.data?.type,
                price: res?.data?.price,
                countInStock: res?.data?.countInStock,
                percentDiscount: res?.data?.percentDiscount,
                description: res?.data?.description,
            });
        }
    };

    useEffect(() => {
        form.setFieldsValue(stateProductDetails);
    }, [form, stateProductDetails]);

    useEffect(() => {
        if (rowSelected && isOpenDrawer) {
            fetchGetDetailsProduct(rowSelected);
        }
    }, [rowSelected, isOpenDrawer]);

    const handleDetailProduct = () => {
        setIsOpenDrawer(true);
    };

    const handleDeleteManyProducts = (ids) => {
        mutationDeleteMany.mutate(
            { ids: ids, token: user?.access_token },
            {
                onSettled: () => {
                    queryProduct.refetch();
                },
            },
        );
    };

    const { data, isSuccess, isError } = mutation;
    const { data: dataUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate;
    const { data: dataDeleted, isSuccess: isSuccessDeleted, isError: isErrorDeleted } = mutationDelete;
    const { data: dataDeletedMany, isSuccess: isSuccessDeletedMany, isError: isErrorDeletedMany } = mutationDeleteMany;

    const queryProduct = useQuery({ queryKey: ['products'], queryFn: getAllProducts });
    const { data: products } = queryProduct;
    const renderAction = () => {
        return (
            <div>
                <DeleteOutlined onClick={() => setIsModalOpenDelete(true)} />
                <EditOutlined onClick={handleDetailProduct} />
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
                    <Button primary onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}>
                        <SearchIcon />
                    </Button>
                    <Button primary onClick={() => clearFilters && handleReset(clearFilters)}>
                        <UndoIcon />
                    </Button>
                    <Button
                        outline
                        onClick={() => {
                            close();
                        }}
                    >
                        <CloseIcon />
                    </Button>
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
    });

    const columns = [
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            sorter: (a, b) => a.name.length - b.name.length,
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Giá tiền',
            dataIndex: 'price',
            sorter: (a, b) => a.price - b.price,
        },
        {
            title: 'Phân loại',
            dataIndex: 'type',
            sorter: (a, b) => a.type.length - b.type.length,
        },
        {
            title: 'Số lượng hàng trong kho',
            dataIndex: 'countInStock',
            sorter: (a, b) => a.countInStock - b.countInStock,
        },
        {
            title: '% giảm giá',
            dataIndex: 'percentDiscount',
            sorter: (a, b) => a.percentDiscount - b.percentDiscount,
        },
        {
            title: 'Sửa/Xoá sản phẩm',
            dataIndex: 'action',
            render: renderAction,
        },
    ];
    const dataTable =
        products?.data?.length &&
        products?.data?.map((product) => {
            return {
                ...product,
                key: product._id,
            };
        });

    useEffect(() => {
        if (isSuccess && data?.status === 'ok') {
            handleCancel();
        }
    }, [isSuccess]);

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
        setStateProductDetails({
            name: '',
            image: '',
            type: '',
            price: '',
            countInStock: '',
            percentDiscount: '',
            description: '',
        });
        form.resetFields();
    };

    const handleOk = () => {
        onFinish();
    };

    const handleCancelDelete = () => {
        setIsModalOpenDelete(false);
    };

    const handleDeleteProduct = () => {
        mutationDelete.mutate(
            { id: rowSelected, token: user?.access_token },
            {
                onSettled: () => {
                    queryProduct.refetch();
                },
            },
        );
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setStateProduct({
            name: '',
            image: '',
            type: '',
            price: '',
            countInStock: '',
            percentDiscount: '',
            description: '',
        });
        form.resetFields();
    };

    const onFinish = () => {
        mutation.mutate(stateProduct, {
            onSettled: () => {
                queryProduct.refetch();
            },
        });
    };

    const handleOnChange = (e) => {
        setStateProduct({
            ...stateProduct,
            [e.target.name]: e.target.value,
        });
    };
    const handleOnChangeDetails = (e) => {
        setStateProductDetails({
            ...stateProductDetails,
            [e.target.name]: e.target.value,
        });
    };

    const handleOnChangeImage = async ({ fileList }) => {
        const file = fileList[0];
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateProduct({
            ...stateProduct,
            image: file.preview,
        });
    };
    const handleOnChangeImageDetails = async ({ fileList }) => {
        const file = fileList[0];
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateProductDetails({
            ...stateProductDetails,
            image: file.preview,
        });
    };
    const onUpdateProduct = () => {
        mutationUpdate.mutate(
            { id: rowSelected, token: user?.access_token, ...stateProductDetails },
            {
                onSettled: () => {
                    queryProduct.refetch();
                },
            },
        );
    };

    return (
        <div>
            <h2>Quản lý sản phẩm</h2>
            <Button
                outline
                onClick={() => {
                    setIsModalOpen(true);
                }}
            >
                Add
            </Button>
            <TableComponent
                handleDeleteMany={handleDeleteManyProducts}
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
            <ModalComponent
                forceRender
                title="Tạo sản phẩm mới"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
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
                        maxWidth: 600,
                    }}
                    onFinish={onFinish}
                    autoComplete="off"
                    form={form}
                >
                    <Form.Item
                        label="Tên sản phẩm"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Nhập tên sản phẩm!',
                            },
                        ]}
                    >
                        <InputComponent value={stateProduct.name} onChange={handleOnChange} name="name" />
                    </Form.Item>

                    <Form.Item
                        label="Phân loại"
                        name="type"
                        rules={[
                            {
                                required: true,
                                message: 'Nhập phân loại sản phẩm!',
                            },
                        ]}
                    >
                        <InputComponent value={stateProduct.type} onChange={handleOnChange} name="type" />
                    </Form.Item>
                    <Form.Item
                        label="Mô tả sản phẩm"
                        name="description"
                        rules={[
                            {
                                required: true,
                                message: 'Nhập mô tả của sản phẩm!',
                            },
                        ]}
                    >
                        <InputComponent value={stateProduct.description} onChange={handleOnChange} name="description" />
                    </Form.Item>
                    <Form.Item
                        label="Giá tiền"
                        name="price"
                        rules={[
                            {
                                required: true,
                                message: 'Nhập giá sản phẩm!',
                            },
                        ]}
                    >
                        <InputComponent value={stateProduct.price} onChange={handleOnChange} name="price" />
                    </Form.Item>
                    <Form.Item
                        label="Số lượng trong kho"
                        name="countInStock"
                        rules={[
                            {
                                required: true,
                                message: 'Nhập số lượng sản phẩm!',
                            },
                        ]}
                    >
                        <InputComponent
                            value={stateProduct.countInStock}
                            onChange={handleOnChange}
                            name="countInStock"
                        />
                    </Form.Item>
                    <Form.Item
                        label="% giảm giá"
                        name="percentDiscount"
                        rules={[
                            {
                                required: true,
                                message: 'Nhập % giảm giá!',
                            },
                        ]}
                    >
                        <InputComponent
                            value={stateProduct.percentDiscount}
                            onChange={handleOnChange}
                            name="percentDiscount"
                        />
                    </Form.Item>
                    <Form.Item
                        label="Ảnh sản phẩm"
                        name="image"
                        rules={[
                            {
                                required: true,
                                message: 'Thêm ảnh sản phẩm!',
                            },
                        ]}
                    >
                        <Upload onChange={handleOnChangeImage} maxCount={1}>
                            <Button outline>Chọn ảnh</Button>
                            {stateProduct?.image && (
                                <img
                                    src={stateProduct?.image}
                                    style={{
                                        height: '60px',
                                        width: '60px',
                                        objectFit: 'cover',
                                        borderRadius: '50%',
                                    }}
                                    alt="product-img"
                                />
                            )}
                        </Upload>
                    </Form.Item>

                    {/* <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button primary>Submit</Button>
                    </Form.Item> */}
                </Form>
            </ModalComponent>
            <DrawerComponent
                title="Chỉnh sửa sản phẩm"
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
                    onFinish={onUpdateProduct}
                    autoComplete="on"
                    form={form}
                >
                    <Form.Item
                        label="Tên sản phẩm"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Nhập tên sản phẩm!',
                            },
                        ]}
                    >
                        <InputComponent value={stateProductDetails.name} onChange={handleOnChangeDetails} name="name" />
                    </Form.Item>

                    <Form.Item
                        label="Phân loại"
                        name="type"
                        rules={[
                            {
                                required: true,
                                message: 'Nhập phân loại sản phẩm!',
                            },
                        ]}
                    >
                        <InputComponent value={stateProductDetails.type} onChange={handleOnChangeDetails} name="type" />
                    </Form.Item>
                    <Form.Item
                        label="Mô tả sản phẩm"
                        name="description"
                        rules={[
                            {
                                required: true,
                                message: 'Nhập mô tả của sản phẩm!',
                            },
                        ]}
                    >
                        <InputComponent
                            value={stateProductDetails.description}
                            onChange={handleOnChangeDetails}
                            name="description"
                        />
                    </Form.Item>
                    <Form.Item
                        label="Giá tiền"
                        name="price"
                        rules={[
                            {
                                required: true,
                                message: 'Nhập giá sản phẩm!',
                            },
                        ]}
                    >
                        <InputComponent
                            value={stateProductDetails.price}
                            onChange={handleOnChangeDetails}
                            name="price"
                        />
                    </Form.Item>
                    <Form.Item
                        label="Số lượng trong kho"
                        name="countInStock"
                        rules={[
                            {
                                required: true,
                                message: 'Nhập số lượng sản phẩm!',
                            },
                        ]}
                    >
                        <InputComponent
                            value={stateProductDetails.countInStock}
                            onChange={handleOnChangeDetails}
                            name="countInStock"
                        />
                    </Form.Item>
                    <Form.Item
                        label="% giảm giá"
                        name="percentDiscount"
                        rules={[
                            {
                                required: true,
                                message: 'Nhập % giảm giá!',
                            },
                        ]}
                    >
                        <InputComponent
                            value={stateProductDetails.percentDiscount}
                            onChange={handleOnChangeDetails}
                            name="percentDiscount"
                        />
                    </Form.Item>
                    <Form.Item
                        label="Ảnh sản phẩm"
                        name="image"
                        rules={[
                            {
                                required: true,
                                message: 'Thêm ảnh sản phẩm!',
                            },
                        ]}
                    >
                        <Upload onChange={handleOnChangeImageDetails} maxCount={1}>
                            <Button outline>Chọn ảnh</Button>
                            {stateProductDetails?.image && (
                                <img
                                    src={stateProductDetails?.image}
                                    style={{
                                        border: '1px solid #ccc',
                                        height: '150px',
                                        width: '150px',
                                        objectFit: 'contain',
                                    }}
                                    alt="product-img"
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
                        <Button primary htmlType="submit">
                            Update
                        </Button>
                    </Form.Item>
                </Form>
            </DrawerComponent>
            <ModalComponent
                forceRender
                title="Xoá sản phẩm"
                open={isModalOpenDelete}
                onOk={handleDeleteProduct}
                onCancel={handleCancelDelete}
            >
                <div>Xác nhận xoá ?</div>
            </ModalComponent>
        </div>
    );
}

export default AdminProduct;
