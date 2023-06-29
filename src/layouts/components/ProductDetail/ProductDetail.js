import classNames from 'classnames/bind';
import styles from './ProductDetail.module.scss';

import Image from '~/components/Image';
import Button from '~/components/Button';
import { CartBoxIcon, CartIcon } from '~/components/Icons';

import { useState } from 'react';

const cx = classNames.bind(styles);

const ProductDetail = () => {
    const [value, setValue] = useState('');

    const handleChange = (event) => {
        const result = event.target.value.replace(/\D/g, '');

        setValue(result);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('product-img')}>
                <Image
                    className={cx('product-img-large')}
                    src="https://klbtheme.com/partdo/wp-content/uploads/2022/10/1-18.jpg"
                />
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
                <h2>Pin 5S2P 5000mAh - Dòng xả cao - Chuyên máy công cụ</h2>
                <div className={cx('stock')}>
                    <span className={cx('stock-id')}>ID: 5s2p20a</span>
                    <div className={cx('stock-wrapper')}>
                        <CartBoxIcon />
                        <span className={cx('stock-title')}>Còn hàng</span>
                    </div>
                </div>
                <div className={cx('price')}>
                    <span className={cx('original-price')}>500.000 ₫</span>
                    <span className={cx('sale-price')}>400.000 ₫</span>
                </div>
                <ul className={cx('product-decs-list')}>
                    <li>Dòng xả cao 40A</li>
                    <li>Dung lượng thực 5000mAh</li>
                    <li>Chạy tải nặng không ngắt</li>
                </ul>
                <div className={cx('action')}>
                    <input className={cx('input')} type="text" value={value} onChange={handleChange} />
                    <Button className={cx('button')} primary>
                        <div className={cx('button-content')}>
                            <CartIcon />
                            <span className={cx('button-text')}>Mua ngay</span>
                        </div>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
