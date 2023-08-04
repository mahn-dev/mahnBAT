import classNames from 'classnames/bind';
import styles from './CartProducts.module.scss';
import { Link } from 'react-router-dom';

import Image from '~/components/Image';
import { CartBoxIcon, HeartIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

function CartProducts(props) {
    const { countInStock, description, image, name, price, percentDiscount, type } = props;
    const formatter = new Intl.NumberFormat({
        style: 'decimal',
    });

    const salePrice = price * ((100 - percentDiscount) / 100);

    return (
        <div className={cx('wrapper')}>
            <Link to="https://klbtheme.com/partdo/">
                <Image className={cx('cart-img')} src={image} />
                <HeartIcon className={cx('heart-icon')} />
            </Link>
            <div className={cx('content')}>
                <Link className={cx('cart-link')} to="https://klbtheme.com/partdo/">
                    <span className={cx('cart-link-title')}>{name}</span>
                </Link>
                <div className={cx('cart-price')}>
                    {price === salePrice ? (
                        <>
                            <span className={cx('sale-price')}>{formatter.format(price)} ₫</span>
                        </>
                    ) : (
                        <>
                            <div className={cx('price-wrapper')}>
                                <span className={cx('original-price')}>{formatter.format(price)} ₫</span>
                                <div className={cx('price')}>
                                    <span className={cx('sale-price')}>{formatter.format(salePrice)} ₫</span>
                                    <span className={cx('percent-discount')}>{percentDiscount}%</span>
                                </div>
                            </div>
                        </>
                    )}
                </div>
                <div className={cx('stock')}>
                    {countInStock === 0 ? (
                        <>
                            <CartBoxIcon className={cx('stock__title--out-of-stock')} />
                            <span className={cx('stock__title', 'stock__title--out-of-stock')}>Tạm hết hàng</span>
                        </>
                    ) : (
                        <>
                            <CartBoxIcon />
                            <span className={cx('stock__title')}>Còn {countInStock} sản phẩm</span>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CartProducts;
