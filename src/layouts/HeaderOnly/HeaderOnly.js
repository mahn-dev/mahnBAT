import Header from '~/layouts/components/Header';
import TopHeader from '~/layouts/components/TopHeader';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './HeaderOnly.scss';

const cx = classNames.bind(styles);

function HeaderOnly({ children }) {
    return (
        <div className={cx('wrapper')}>
            <TopHeader />
            <Header />
            <div className={cx('container')}>
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
}

HeaderOnly.propTypes = {
    children: PropTypes.node.isRequired,
};

export default HeaderOnly;
