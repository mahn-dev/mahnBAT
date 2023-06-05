import classNames from 'classnames/bind';
import styles from './ProductsItem.module.scss';

const cx = classNames.bind(styles);

function ProductsItem() {
    return (
        <div className={cx('wrapper')}>
            <img
                className={cx('product-img')}
                src="https://klbtheme.com/partdo/wp-content/uploads/2022/10/1-21-150x150.jpg"
                alt=""
            />
            <h4 className={cx('product-title')}>NEXEN® – N PRIZ AH5 WITH WHITE WALL</h4>
            <div className={cx('product-price')}>
                <span className={cx('original-price')}>$378.99</span>
                <span className={cx('sale-price')}>$348.99</span>
            </div>
        </div>
    );
}

export default ProductsItem;
