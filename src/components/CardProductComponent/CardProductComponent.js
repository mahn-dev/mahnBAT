import classNames from 'classnames/bind';
import styles from './CardProductComponent.module.scss';

import { Link } from 'react-router-dom';
import { convertPrice } from '~/utils';

import ImageComponent from '~/components/ImageComponent';
import { CartBoxIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

function CardProductComponent(props) {
    const { id, countInStock, image, name, price, percentDiscount } = props;
    const salePrice = price * ((100 - percentDiscount) / 100);

    return (
        <div className={cx('wrapper')}>
            <Link to={`/product-detail/${id}`}>
                <ImageComponent className={cx('card__img')} src={image} />
            </Link>
            <main className={cx('card__container')}>
                <Link to={`/product-detail/${id}`}>
                    <span className={cx('card__link-title')}>{name}</span>
                </Link>
                <section className={cx('card__price')}>
                    {price === salePrice ? (
                        <>
                            <span className={cx('sale-price')}>{convertPrice(price)}</span>
                        </>
                    ) : (
                        <>
                            <div className={cx('price-wrapper')}>
                                <span className={cx('original-price')}>{convertPrice(price)}</span>
                                <div className={cx('price')}>
                                    <span className={cx('sale-price')}>{convertPrice(salePrice)}</span>
                                    <span className={cx('percent-discount')}>{percentDiscount}%</span>
                                </div>
                            </div>
                        </>
                    )}
                </section>
                <section className={cx('stock')}>
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
                </section>
            </main>
        </div>
    );
}

export default CardProductComponent;
