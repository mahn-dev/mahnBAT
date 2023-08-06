// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './ProductsItem.module.scss';
import Image from '~/components/Image';

const cx = classNames.bind(styles);

function ProductsItem(props) {
    const { id, image, name, price, percentDiscount } = props;
    const formatter = new Intl.NumberFormat({
        style: 'decimal',
    });

    const salePrice = price * ((100 - percentDiscount) / 100);
    return (
        <Link to={`/product-detail/${id}`} className={cx('wrapper')}>
            <Image className={cx('product-img')} src={image} alt={name} />
            <h4 className={cx('product-title')}>{name}</h4>
            <div className={cx('product-price')}>
                {price === salePrice ? (
                    <>
                        <span className={cx('sale-price')}>{formatter.format(price)} ₫</span>
                    </>
                ) : (
                    <>
                        <span className={cx('original-price')}>{formatter.format(price)} ₫</span>
                        <span className={cx('sale-price')}>{formatter.format(salePrice)} ₫</span>
                    </>
                )}
            </div>
        </Link>
    );
}

// ProductsItem.propTypes = {
//     props: PropTypes.object.isRequired,
// };

export default ProductsItem;
