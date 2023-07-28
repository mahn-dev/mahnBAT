import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import TopHeader from '~/layouts/components/TopHeader';
import Sidebar from '~/layouts/components/Sidebar';
import Header from '~/layouts/components/Header';
import Footer from '~/layouts/components/Footer';
import styles from './DefaultLayout.module.scss';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <TopHeader />
            <Header />
            <div className={cx('container')}>
                <div>
                    <Sidebar />
                </div>
                <div className={cx('content')}>{children}</div>
            </div>
            <Footer />
        </div>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;
