// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './SearchProductComponent.module.scss';
import ImageComponent from '~/components/ImageComponent';
import { convertPrice } from '~/utils';

const cx = classNames.bind(styles);

function SearchProductComponent(props) {
    const { id, image, name, price, percentDiscount } = props;
    const salePrice = price * ((100 - percentDiscount) / 100);
    return (
        <Link to={`/product-detail/${id}`} className={cx('wrapper')}>
            <ImageComponent className={cx('product-img')} src={image} alt={name} />
            <h4 className={cx('product-title')}>{name}</h4>
            <div className={cx('product-price')}>
                {price === salePrice ? (
                    <>
                        <span className={cx('sale-price')}>{convertPrice(price)}</span>
                    </>
                ) : (
                    <>
                        <span className={cx('original-price')}>{convertPrice(price)}</span>
                        <span className={cx('sale-price')}>{convertPrice(salePrice)}</span>
                    </>
                )}
            </div>
        </Link>
    );
}

// SearchProductComponent.propTypes = {
//     props: PropTypes.object.isRequired,
// };

export default SearchProductComponent;
