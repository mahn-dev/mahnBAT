import { useEffect, useState, useRef } from 'react';
import { useDebounce } from '~/hooks';
import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';

import styles from './Search.module.scss';
import { LoadingIcon } from '~/components/Icons';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import SearchProductComponent from '~/components/SearchProductComponent';
import * as SearchServices from '~/services/SearchService';

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef();

    const debouncedValue = useDebounce(searchValue, 600);

    useEffect(() => {
        if (!debouncedValue.trim()) {
            setSearchResult([]);
            return;
        }
        const fetchApi = async () => {
            setLoading(true);
            const result = await SearchServices.search(debouncedValue);
            setSearchResult(result);
            setLoading(false);
        };
        fetchApi();
    }, [debouncedValue]);

    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    };

    const handleHideResult = () => {
        setShowResult(false);
    };

    const handleChange = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };

    return (
        <div>
            <HeadlessTippy
                interactive
                visible={showResult && searchResult.length > 0}
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <h4 className={cx('search-title')}>Sản phẩm</h4>
                            {searchResult.map((product) => (
                                <SearchProductComponent
                                    key={product._id}
                                    id={product._id}
                                    image={product.image}
                                    name={product.name}
                                    percentDiscount={product.percentDiscount}
                                    price={product.price}
                                />
                            ))}
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={handleHideResult}
            >
                <div className={cx('search')}>
                    <input
                        ref={inputRef}
                        value={searchValue}
                        placeholder="Tìm kiếm sản phẩm..."
                        spellCheck={false}
                        onChange={handleChange}
                        onFocus={() => {
                            setShowResult(true);
                        }}
                    />
                    {!!searchValue && !loading && (
                        <button className={cx('clear')} onClick={handleClear}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}
                    {loading && <LoadingIcon className={cx('loading')} />}

                    <button
                        className={cx('search-btn')}
                        onMouseDown={(e) => {
                            e.preventDefault();
                        }}
                    >
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                </div>
            </HeadlessTippy>
        </div>
    );
}

export default Search;
