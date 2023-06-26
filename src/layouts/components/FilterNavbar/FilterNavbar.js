import classNames from 'classnames/bind';
import styles from './FilterNavbar.module.scss';

const cx = classNames.bind(styles);

function FilterNavbar() {
    const renderContent = (type, options) => {
        switch (type) {
            case 'text':
                return options.map((options) => {
                    return (
                        <div className={cx('filter-wrapper')}>
                            <h4 className={cx('filter-title')}>{options}</h4>
                        </div>
                    );
                });
            default:
                return {};
        }
    };
    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('filter-heading')}>Danh mục sản phẩm</h3>
            <div className={cx('filter-content')}>
                {renderContent('text', [
                    'Pin 1-5S dòng xả thấp',
                    'Pin 1-5S dòng xả cao',
                    'Pin lưu trữ dung lượng lớn',
                    'Sạc pin 1-5S 1A',
                    'Sạc pin 1-5S 2A',
                    'Sạc pin 1-5S 3A',
                ])}
            </div>
        </div>
    );
}

export default FilterNavbar;
