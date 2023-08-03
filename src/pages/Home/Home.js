import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { useQuery } from '@tanstack/react-query';

import slider1 from '~/assets/sliderImg/slider-01.jpg';
import slider2 from '~/assets/sliderImg/slider-02.jpg';
import slider3 from '~/assets/sliderImg/slider-04.jpg';
import { SliderComponent } from '~/components/SliderComponent/SliderComponent';
import CartProducts from '~/components/CardProducts';
import * as ProductService from '~/services/ProductService';

const cx = classNames.bind(styles);

function Home() {
    const fetchProductAll = async () => {
        const res = await ProductService.getAllProduct();
        console.log(res);
        return res;
    };
    const { data: products } = useQuery(['products'], fetchProductAll, { retry: 3, retryDelay: 1000 });
    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    return (
        <div className={cx('wrapper')}>
            <div>
                <SliderComponent arrImgs={[slider1, slider2, slider3]} />
                <h2 className={cx('heading')}>Sản phẩm nổi bật</h2>
                <div className={cx('products')}>
                    {products?.data?.map((product) => {
                        return (
                            <CartProducts
                                key={product._id}
                                countInStock={product.countInStock}
                                description={product.description}
                                image={product.image}
                                name={product.name}
                                price={formatter.format(product.price)}
                                type={product.type}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Home;
