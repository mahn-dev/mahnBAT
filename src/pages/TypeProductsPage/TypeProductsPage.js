import classNames from 'classnames/bind';
import styles from './TypeProductsPage.module.scss';

import FilterNavbar from '~/layouts/components/FilterNavbar';
import CartProducts from '~/components/CardProducts';
import Button from '~/components/Button';
import { useLocation } from 'react-router-dom';
import * as ProductService from '~/services/ProductService';
import { useEffect } from 'react';
import { useState } from 'react';
import { Pagination } from 'antd';

const cx = classNames.bind(styles);

function TypeProducts() {
    const { state } = useLocation();
    const [products, setProducts] = useState([]);
    const [paginate, setPaginate] = useState({
        page: 0,
        limit: 4,
        total: 1,
    });

    const fetchProductType = async (type, page, limit) => {
        const res = await ProductService.getProductType(type, page, limit);
        if (res?.status == 'OK') {
            setProducts(res?.data);
            setPaginate({ ...paginate, total: res?.totalPage });
        } else {
        }
    };

    useEffect(() => {
        if (state) {
            fetchProductType(state, paginate.page, paginate.limit);
        }
    }, [state, paginate.page, paginate.limit]);

    const onShowSizeChange = (current, pageSize) => {};

    const onChange = (current, pageSize) => {
        setPaginate({ ...paginate, page: current - 1, limit: pageSize });
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('filter')}>
                    <FilterNavbar />
                </div>
                <div className={cx('container')}>
                    {products?.map((product) => {
                        return (
                            <CartProducts
                                key={product._id}
                                id={product._id}
                                countInStock={product.countInStock}
                                image={product.image}
                                name={product.name}
                                percentDiscount={product.percentDiscount}
                                price={product.price}
                            />
                        );
                    })}
                </div>
            </div>
            <Pagination
                showSizeChanger
                onShowSizeChange={onShowSizeChange}
                defaultCurrent={paginate.page + 1}
                total={paginate?.total}
                onChange={onChange}
            />
            {/* <ul className={cx('pagination')}>
                <li className={cx('pagination-item')}>
                    <Button primary className={cx('pagination-btn')}>
                        &lt;
                    </Button>
                </li>
                <li className={cx('pagination-item')}>
                    <Button primary className={cx('pagination-btn')}>
                        1
                    </Button>
                </li>
                <li className={cx('pagination-item')}>
                    <Button primary className={cx('pagination-btn')}>
                        2
                    </Button>
                </li>
                <li className={cx('pagination-item')}>
                    <Button primary className={cx('pagination-btn')}>
                        3
                    </Button>
                </li>
                <li className={cx('pagination-item')}>
                    <Button primary className={cx('pagination-btn')}>
                        &gt;
                    </Button>
                </li>
            </ul> */}
        </div>
    );
}

export default TypeProducts;
