import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { SliderComponent } from '~/components/SliderComponent/SliderComponent';

import slider1 from '~/assets/sliderImg/slider-01.jpg';
import slider2 from '~/assets/sliderImg/slider-02.jpg';
import slider3 from '~/assets/sliderImg/slider-04.jpg';
import CartProducts from '~/components/CardProducts';
import Sidebar from '~/layouts/components/Sidebar';

const cx = classNames.bind(styles);

function Home() {
    return (
        <div className={cx('wrapper')}>
            <div>
                <Sidebar />
            </div>
            <div>
                <SliderComponent arrImgs={[slider1, slider2, slider3]} />
                <h2 className={cx('heading')}>Sản phẩm nổi bật</h2>
                <div className={cx('products')}>
                    <CartProducts />
                    <CartProducts />
                    <CartProducts />
                    <CartProducts />
                    <CartProducts />
                    <CartProducts />
                    <CartProducts />
                    <CartProducts />
                </div>
            </div>
        </div>
    );
}

export default Home;
