import classNames from 'classnames/bind';
import styles from './ProductsPage.module.scss';

import FilterNavbar from '~/layouts/components/FilterNavbar';
import CartProducts from '~/components/CardProducts';
import Button from '~/components/Button';
import { useEffect, useState } from 'react';
import * as ProductService from '~/services/ProductService';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';

const cx = classNames.bind(styles);

function TypeProducts() {
    const { state } = useLocation();
    const [limit, setLimit] = useState(10);
    const fetchProductAll = async (context) => {
        const limit = context?.queryKey && context?.queryKey[1];
        const search = context?.queryKey && context?.queryKey[2];
        const res = await ProductService.getAllProduct(search, limit);
        return res;
    };

    useEffect(() => {
        if (state) {
            fetchProductAll(state);
        }
    }, [state]);

    const { data: products } = useQuery(['products', limit], fetchProductAll, {
        retry: 3,
        retryDelay: 1000,
        keepPreviousData: true,
    });
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('filter')}>
                    <FilterNavbar />
                </div>
                <div className={cx('container')}>
                    {products?.data?.map((product) => (
                        <CartProducts
                            className={cx('cart-product')}
                            key={product._id}
                            id={product._id}
                            countInStock={product.countInStock}
                            image={product.image}
                            name={product.name}
                            percentDiscount={product.percentDiscount}
                            price={product.price}
                        />
                    ))}
                    <Button
                        disabled={products?.total === products?.data?.length || products?.totalPage === 1}
                        primary
                        onClick={() => setLimit((prev) => prev + 10)}
                    >
                        Xem thêm
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default TypeProducts;
