/* eslint-disable eqeqeq */
import classNames from 'classnames/bind';
import styles from './ProductDetail.module.scss';

import Image from '~/components/Image';
import Button from '~/components/Button';
import { CartBoxIcon, CartIcon } from '~/components/Icons';
import * as ProductService from '~/services/ProductService';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { addOrderProduct, resetOrder } from '~/redux/slice/orderSlice';
import { convertPrice } from '~/utils';
import { useEffect } from 'react';
import * as toast from '~/components/ToastMessage';
import { ToastContainer } from 'react-toastify';
const cx = classNames.bind(styles);

const ProductDetail = ({ idProduct }) => {
    const user = useSelector((state) => state.user);
    const order = useSelector((state) => state.order);
    const [errLimitOrder, setErrLimitOrder] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const [numProduct, setNumProduct] = useState('');

    const handleChange = (e) => {
        const result = e.target.value.replace(/\D/g, '');
        setNumProduct(Number(result));
    };
    const fetchGetDetailsProduct = async (context) => {
        const id = context?.queryKey && context?.queryKey[1];
        if (id) {
            const res = await ProductService.getDetailsProduct(id);
            return res.data;
        }
    };

    useEffect(() => {
        const orderRedux = order?.orderItems?.find((item) => item.product === productDetails?._id);
        if (
            orderRedux?.amount + numProduct <= orderRedux?.countInStock ||
            (!orderRedux && productDetails?.countInStock > 0)
        ) {
            setErrLimitOrder(false);
        } else if (productDetails?.countInStock === 0) {
            setErrLimitOrder(true);
        }
    }, [numProduct]);

    useEffect(() => {
        if (order.isSuccessOrder) {
            toast.success('Đã thêm vào giỏ hàng!');
        }
        return () => {
            dispatch(resetOrder());
        };
    }, [order.isSuccessOrder]);

    const handleChangeCount = (type, limit) => {
        if (type === 'increase') {
            if (!limit) {
                setNumProduct(numProduct + 1 - 1 + 1);
            }
        } else {
            if (!limit) {
                setNumProduct(numProduct - 1);
            }
        }
    };
    const { data: productDetails } = useQuery(['product-detail', idProduct], fetchGetDetailsProduct, {
        enabled: !!idProduct,
    });
    const salePrice = productDetails?.price * ((100 - productDetails?.percentDiscount) / 100);

    const handleAddOrderProduct = () => {
        if (!user?.id) {
            navigate('/sign-in', { state: location?.pathname });
        } else {
            const orderRedux = order?.orderItems?.find((item) => item.product === productDetails?._id);
            if (
                orderRedux?.amount + numProduct <= orderRedux?.countInStock ||
                (!orderRedux && productDetails?.countInStock > 0)
            ) {
                dispatch(
                    addOrderProduct({
                        orderItem: {
                            name: productDetails?.name,
                            amount: numProduct,
                            image: productDetails?.image,
                            price: salePrice,
                            percentDiscount: productDetails?.percentDiscount,
                            countInStock: productDetails?.countInStock,
                            product: productDetails?._id,
                        },
                    }),
                );
            } else {
                setErrLimitOrder(true);
            }
        }
    };

    return (
        <div className={cx('wrapper')}>
            <ToastContainer />
            <div className={cx('product-img')}>
                <Image className={cx('product-img-large')} src={productDetails?.image} />
                <div className={cx('product-sub-img')}>
                    <Image
                        className={cx('product-img-small')}
                        src="https://klbtheme.com/partdo/wp-content/uploads/2022/10/1-18.jpg"
                    />
                    <Image
                        className={cx('product-img-small')}
                        src="https://klbtheme.com/partdo/wp-content/uploads/2022/10/3-16.jpg"
                    />
                    <Image
                        className={cx('product-img-small')}
                        src="https://klbtheme.com/partdo/wp-content/uploads/2022/10/3-16.jpg"
                    />
                    <Image
                        className={cx('product-img-small')}
                        src="https://klbtheme.com/partdo/wp-content/uploads/2022/10/3-16.jpg"
                    />
                </div>
            </div>
            <div className={cx('content')}>
                <h2>{productDetails?.name}</h2>
                <div className={cx('stock')}>
                    <span className={cx('stock-id')}>ID: {productDetails?._id}</span>
                    <div className={cx('stock-wrapper')}>
                        <CartBoxIcon />
                        <span className={cx('stock-title')}>Còn hàng</span>
                    </div>
                </div>
                <div className={cx('price')}>
                    <span className={cx('original-price')}>{convertPrice(productDetails?.price)}</span>
                    <span className={cx('sale-price')}>{convertPrice(salePrice)}</span>
                </div>
                <ul className={cx('product-decs-list')}>
                    <li>Dòng xả cao 40A</li>
                    <li>Dung lượng thực 5000mAh</li>
                    <li>Chạy tải nặng không ngắt</li>
                </ul>
                <div className={cx('action')}>
                    <div className={cx('action-input')}>
                        <Button
                            disabled={numProduct == 0}
                            onClick={() => handleChangeCount('decrease', numProduct === 1)}
                        >
                            -
                        </Button>
                        <input
                            min={1}
                            max={productDetails?.countInStock}
                            placeholder="1"
                            className={cx('input')}
                            type="number"
                            value={numProduct}
                            onChange={handleChange}
                        />
                        <Button
                            // disabled={
                            //     productDetails?.countInStock === numProduct || productDetails?.countInStock < numProduct
                            // }
                            disabled={
                                productDetails?.countInStock === numProduct || productDetails?.countInStock < numProduct
                            }
                            onClick={() => handleChangeCount('increase', numProduct === productDetails?.countInStock)}
                        >
                            +
                        </Button>
                    </div>
                    <Button
                        onClick={handleAddOrderProduct}
                        leftIcon={<CartIcon width={'2.4rem'} height={'2.4rem'} />}
                        className={cx('buy-button')}
                        primary
                    >
                        <span className={cx('buy-button-text')}>
                            {errLimitOrder ? 'Sản phẩm đã hết hàng' : 'Mua ngay'}
                        </span>
                    </Button>
                    {/* {errLimitOrder && 'Sản phẩm đã hết hàng'} */}
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
