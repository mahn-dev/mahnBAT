import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { SliderComponent } from '~/components/SliderComponent/SliderComponent';

import slider1 from '~/assets/sliderImg/slider-01.jpg';
import slider2 from '~/assets/sliderImg/slider-02.jpg';
import slider3 from '~/assets/sliderImg/slider-03.jpg';

const cx = classNames.bind(styles);

function Home() {
    return (
        <div className={cx('wrapper')}>
            <SliderComponent arrImgs={[slider1, slider2, slider3]} />
            <h2> Home Page</h2>
        </div>
    );
}

export default Home;
