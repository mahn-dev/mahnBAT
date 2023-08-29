import React from 'react';
import Slider from 'react-slick';
import classNames from 'classnames/bind';
import styles from './SliderComponent.module.scss';

import ImageComponent from '~/components/ImageComponent';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const cx = classNames.bind(styles);

export const SliderComponent = ({ arrImgs }) => {
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: false,
    };
    return (
        <div className={cx('wrapper')}>
            <Slider className={cx('slider')} {...settings}>
                {arrImgs.map((image) => {
                    return <ImageComponent className={cx('slider-img')} src={image} alt="slider" key={image} />;
                })}
            </Slider>
        </div>
    );
};

export default SliderComponent;
