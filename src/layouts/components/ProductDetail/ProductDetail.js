/* eslint-disable eqeqeq */
import classNames from 'classnames/bind';
import styles from './ProductDetail.module.scss';

import Image from '~/components/Image';
import Button from '~/components/Button';
import { CartBoxIcon, CartIcon } from '~/components/Icons';
import * as ProductService from '~/services/ProductService';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

const cx = classNames.bind(styles);

const ProductDetail = ({ idProduct }) => {
    const formatter = new Intl.NumberFormat({
        style: 'decimal',
    });
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

    const handleChangeCount = (type) => {
        if (type === 'increase') {
            setNumProduct(numProduct + 1 - 1 + 1);
        } else {
            setNumProduct(numProduct - 1);
        }
    };
    const { data: productDetails } = useQuery(['product-detail', idProduct], fetchGetDetailsProduct, {
        enabled: !!idProduct,
    });
    const salePrice = productDetails?.price * ((100 - productDetails?.percentDiscount) / 100);

    return (
        <div className={cx('wrapper')}>
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
                    <span className={cx('original-price')}>{formatter.format(productDetails?.price)} ₫</span>
                    <span className={cx('sale-price')}>{formatter.format(salePrice)} ₫</span>
                </div>
                <ul className={cx('product-decs-list')}>
                    <li>Dòng xả cao 40A</li>
                    <li>Dung lượng thực 5000mAh</li>
                    <li>Chạy tải nặng không ngắt</li>
                </ul>
                <div className={cx('action')}>
                    <div className={cx('action-input')}>
                        <Button disabled={numProduct == 0} onClick={() => handleChangeCount('decrease')}>
                            -
                        </Button>
                        <input
                            placeholder="1"
                            className={cx('input')}
                            type="number"
                            value={numProduct}
                            onChange={handleChange}
                        />
                        <Button
                            disabled={
                                productDetails?.countInStock === numProduct || productDetails?.countInStock < numProduct
                            }
                            onClick={() => handleChangeCount('increase')}
                        >
                            +
                        </Button>
                    </div>
                    <Button
                        leftIcon={<CartIcon width={'2.4rem'} height={'2.4rem'} />}
                        className={cx('buy-button')}
                        primary
                    >
                        <span className={cx('buy-button-text')}>Mua ngay</span>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
