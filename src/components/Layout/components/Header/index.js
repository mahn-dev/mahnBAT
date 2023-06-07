import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';

import Button from '~/components/Button';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import logoHome from '~/assets/img/logomahnBatFinal.png';
import styles from './Header.module.scss';
import ProductsItem from '~/components/ProductsItem';

const cx = classNames.bind(styles);

function Header() {
    const [searchResult, setSearchResult] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            setSearchResult([]);
        }, 0);
    }, []);

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <a className={cx('logo-link')} href="/">
                    <img className={cx('logo-src')} src={logoHome} alt="logo" />
                </a>
                <Tippy
                    interactive
                    visible={searchResult.length > 0}
                    render={(attrs) => (
                        <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                            <PopperWrapper>
                                <h4 className={cx('search-title')}>Sản phẩm</h4>
                                <ProductsItem />
                                <ProductsItem />
                                <ProductsItem />
                                <ProductsItem />
                            </PopperWrapper>
                        </div>
                    )}
                >
                    <div className={cx('search')}>
                        <input placeholder="Tìm kiếm sản phẩm..." spellCheck={false} />
                        <button className={cx('clear')}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                        <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />

                        <button className={cx('search-btn')}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </div>
                </Tippy>
                <div className={cx('action')}>
                    {/* <Button primary to="/products" target="_blank">
                        Đăng nhập
                    </Button> */}
                    {/* <Button primary leftIcon={<FontAwesomeIcon icon={faSignIn} />}>
                        Đăng nhập
                    </Button> */}
                    {/* <Button outline className={cx('login-btn')}>
                        Đăng nhập
                    </Button> */}
                    <Button primary>Đăng nhập</Button>
                </div>
            </div>
        </header>
    );
}

export default Header;
