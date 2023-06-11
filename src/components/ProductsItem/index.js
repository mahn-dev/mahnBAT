import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './ProductsItem.module.scss';
import Image from '~/components/Image';

const cx = classNames.bind(styles);

function ProductsItem({ data }) {
    return (
        <Link to={`/@${data.nickname}`} className={cx('wrapper')}>
            <Image
                className={cx('product-img')}
                // src="https://klbtheme.com/partdo/wp-content/uploads/2022/10/1-21-150x150.jpg"
                src={data.avatar}
                alt={data.full_name}
            />
            <h4 className={cx('product-title')}>{data.full_name}</h4>
            <div className={cx('product-price')}>
                <span className={cx('original-price')}>$378.99</span>
                <span className={cx('sale-price')}>$348.99</span>
            </div>
        </Link>
    );
}

export default ProductsItem;
