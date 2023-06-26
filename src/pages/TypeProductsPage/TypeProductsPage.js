import classNames from 'classnames/bind';
import styles from './TypeProductsPage.module.scss';

import FilterNavbar from '~/layouts/components/FilterNavbar';
import CartProducts from '~/components/CardProducts';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function TypeProducts() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('filter')}>
                    <FilterNavbar />
                </div>
                <div className={cx('container')}>
                    <CartProducts />
                    <CartProducts />
                    <CartProducts />
                    <CartProducts />
                    <CartProducts />
                    <CartProducts />
                    <CartProducts />
                    <CartProducts />
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
            <ul className={cx('pagination')}>
                <li className={cx('pagination-item')}>
                    <Button small primary className={cx('pagination-btn')}>
                        1
                    </Button>
                </li>
                <li className={cx('pagination-item')}>
                    <Button small primary className={cx('pagination-btn')}>
                        2
                    </Button>
                </li>
                <li className={cx('pagination-item')}>
                    <Button small primary className={cx('pagination-btn')}>
                        3
                    </Button>
                </li>
            </ul>
        </div>
    );
}

export default TypeProducts;
