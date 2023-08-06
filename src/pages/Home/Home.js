import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { useQuery } from '@tanstack/react-query';

import slider1 from '~/assets/sliderImg/slider-01.jpg';
import slider2 from '~/assets/sliderImg/slider-02.jpg';
import slider3 from '~/assets/sliderImg/slider-04.jpg';
import { SliderComponent } from '~/components/SliderComponent/SliderComponent';
import CartProducts from '~/components/CardProducts';
import * as ProductService from '~/services/ProductService';
import Sidebar from '~/layouts/components/Sidebar';
import BusinessPartners from '~/layouts/components/BusinessPartners';
import { useState } from 'react';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function Home() {
    const [limit, setLimit] = useState(10);
    const fetchProductAll = async (context) => {
        const limit = context?.queryKey && context?.queryKey[1];
        const search = context?.queryKey && context?.queryKey[2];
        const res = await ProductService.getAllProduct(search, limit);
        return res;
    };

    const { data: products } = useQuery(['products', limit], fetchProductAll, {
        retry: 3,
        retryDelay: 1000,
        keepPreviousData: true,
    });

    return (
        <div className={cx('wrapper')}>
            <div className={cx('slider-container')}>
                <Sidebar />
                <SliderComponent arrImgs={[slider1, slider2, slider3]} />
            </div>
            <h2 className={cx('heading')}>Sản phẩm nổi bật</h2>
            <div className={cx('products')}>
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
                    onClick={() => setLimit((prev) => prev + 5)}
                >
                    Xem thêm
                </Button>
            </div>
            <BusinessPartners />
        </div>
    );
}

export default Home;
