import classNames from 'classnames/bind';
import styles from './ProductDetailPage.module.scss';

import ProductDetail from '~/layouts/components/ProductDetail';

const cx = classNames.bind(styles);

function ProductDetailPage() {
    return (
        <div className={cx('wrapper')}>
            <h4>Product Detail</h4>
            <ProductDetail />
        </div>
    );
}

export default ProductDetailPage;
