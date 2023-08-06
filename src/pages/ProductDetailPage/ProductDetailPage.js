import classNames from 'classnames/bind';
import styles from './ProductDetailPage.module.scss';

import ProductDetail from '~/layouts/components/ProductDetail';
import { Link, useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

function ProductDetailPage() {
    const { id } = useParams();
    return (
        <div className={cx('wrapper')}>
            <h4>
                <Link style={{ color: 'var(--primary-color)' }} to={'/'}>
                    Trang chủ
                </Link>{' '}
                &gt; Chi tiết sản phẩm
            </h4>
            <ProductDetail idProduct={id} />
        </div>
    );
}

export default ProductDetailPage;
