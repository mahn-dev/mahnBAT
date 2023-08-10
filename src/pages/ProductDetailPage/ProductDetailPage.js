import classNames from 'classnames/bind';
import styles from './ProductDetailPage.module.scss';

import ProductDetail from '~/layouts/components/ProductDetail';
import { Link, useParams } from 'react-router-dom';
import * as ProductService from '~/services/ProductService';
import { useQuery } from '@tanstack/react-query';
import TypeProduct from '~/components/TypeProduct';

const cx = classNames.bind(styles);

function ProductDetailPage() {
    const { id } = useParams();
    const fetchGetDetailsProduct = async (context) => {
        const id = context?.queryKey && context?.queryKey[1];
        if (id) {
            const res = await ProductService.getDetailsProduct(id);
            return res.data;
        }
    };
    const { data: productDetails } = useQuery(['product-detail', id], fetchGetDetailsProduct, {
        enabled: !!id,
    });
    return (
        <div className={cx('wrapper')}>
            <h4 style={{ display: 'flex' }}>
                <Link style={{ color: 'var(--primary-color)' }} to={'/'}>
                    Trang chủ
                </Link>
                &gt; <Link to={'/products'}>Tất cả sản phẩm</Link> &gt;
                <TypeProduct
                    className={cx('type-product-link')}
                    typeProduct={productDetails?.type}
                    key={productDetails?.type}
                />
                &gt; {productDetails?.name}
            </h4>
            <ProductDetail idProduct={id} />
        </div>
    );
}

export default ProductDetailPage;
