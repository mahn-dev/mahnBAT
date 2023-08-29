import classNames from 'classnames/bind';
import styles from './FilterNavbar.module.scss';
import { useState, useEffect } from 'react';

import * as ProductService from '~/services/ProductService';
import TypeProductComponent from '~/components/TypeProductComponent';

const cx = classNames.bind(styles);

function FilterNavbar() {
    const [typeProduct, setTypeProduct] = useState([]);

    const fetchAllTypeProduct = async () => {
        const res = await ProductService.getAllTypeProduct();
        if (res?.status === 'OK') {
            setTypeProduct(res?.data);
        }
        return res;
    };

    useEffect(() => {
        fetchAllTypeProduct();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('filter-heading')}>Danh mục sản phẩm</h3>
            {typeProduct.map((item) => {
                return <TypeProductComponent className={cx('type-product-link')} typeProduct={item} key={item} />;
            })}
        </div>
    );
}

export default FilterNavbar;
