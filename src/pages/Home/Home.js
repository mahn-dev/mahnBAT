import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { useQuery } from '@tanstack/react-query';

import slider1 from '~/assets/sliderImg/slider-01.jpg';
import slider2 from '~/assets/sliderImg/slider-02.jpg';
import slider3 from '~/assets/sliderImg/slider-04.jpg';
import { SliderComponent } from '~/components/SliderComponent/SliderComponent';
import CardProductComponent from '~/components/CardProductComponent';
import * as ProductService from '~/services/ProductService';
import Sidebar from '~/layouts/components/Sidebar';
import BusinessPartners from '~/layouts/components/BusinessPartners';
import { useEffect, useState } from 'react';
import LoadingComponent from '~/components/LoadingComponent';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const cx = classNames.bind(styles);

function Home() {
    const type = 'Cell';
    const [limit, setLimit] = useState(20);
    const [typeProducts, setTypeProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const fetchProductAll = async (context) => {
        const limit = context?.queryKey && context?.queryKey[1];
        const search = context?.queryKey && context?.queryKey[2];
        setIsLoading(true);
        const res = await ProductService.getAllProduct(search, limit);
        setIsLoading(false);
        return res;
    };

    const fetchProductType = async (type) => {
        const res = await ProductService.getProductType(type);
        setTypeProducts(res?.data);

        return res;
    };

    useEffect(() => {
        if (type) {
            fetchProductType(type);
        }
    }, [type]);
    const { data: products } = useQuery(['products', limit], fetchProductAll, {
        retry: 3,
        retryDelay: 1000,
        keepPreviousData: true,
    });

    const NextArrow = (props) => {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{
                    ...style,
                    display: 'flex',
                    background: 'var(--primary-color)',
                    padding: '20px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '12px',
                    right: '20px',
                }}
                onClick={onClick}
            />
        );
    };

    const PrevArrow = (props) => {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{
                    ...style,
                    display: 'flex',
                    background: 'var(--primary-color)',
                    padding: '20px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '12px',
                    left: '20px',
                    zIndex: 1,
                }}
                onClick={onClick}
            />
        );
    };
    const settings = {
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: true,
        // dots: true,
        infinite: true,
        centerMode: true,
        centerPadding: '-14px',
        swipe: false,
        speed: 400,
        slidesToShow: 5,
        slidesToScroll: 5,
        nextArrow: <NextArrow className={cx('next-arrow')} />,
        prevArrow: <PrevArrow className={cx('next-arrow')} />,
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('slider-container')}>
                <Sidebar />
                <SliderComponent arrImgs={[slider1, slider2, slider3]} />
            </div>

            <div>
                <h2 className={cx('heading')}>Sản phẩm nổi bật</h2>
                {isLoading ? (
                    <LoadingComponent />
                ) : (
                    <>
                        <div className={cx('slider-product')}>
                            <Slider {...settings}>
                                {products?.data?.map((product) => (
                                    <CardProductComponent
                                        className={cx('cart-product')}
                                        key={product?._id}
                                        id={product?._id}
                                        countInStock={product?.countInStock}
                                        image={product?.image}
                                        name={product?.name}
                                        percentDiscount={product?.percentDiscount}
                                        price={product?.price}
                                    />
                                ))}
                            </Slider>
                        </div>
                    </>
                )}
            </div>

            <div>
                <h2 className={cx('heading')}>Pin dòng xả cao chuyên dùng cho máy công cụ</h2>
                {isLoading ? (
                    <LoadingComponent />
                ) : (
                    <>
                        <div className={cx('product')}>
                            {/* <Slider {...settings}> */}
                            {typeProducts?.map((typeProduct) => (
                                <CardProductComponent
                                    className={cx('cart-product')}
                                    key={typeProduct._id}
                                    id={typeProduct._id}
                                    countInStock={typeProduct.countInStock}
                                    image={typeProduct.image}
                                    name={typeProduct.name}
                                    percentDiscount={typeProduct.percentDiscount}
                                    price={typeProduct.price}
                                />
                            ))}
                            {/* </Slider> */}
                        </div>
                    </>
                )}
            </div>
            <BusinessPartners />
        </div>
    );
}

export default Home;
