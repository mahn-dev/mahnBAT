import classNames from 'classnames/bind';
import styles from './TopHeader.module.scss';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

import config from '~/config';

const cx = classNames.bind(styles);

function TopHeader() {
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('menu-link')}>
                    <Link className={cx('menu-item')} to={config.routes.cart}>
                        Về chúng tôi
                    </Link>
                    <Link className={cx('menu-item')} to={config.routes.cart}>
                        Tài khoản
                    </Link>
                    <Link className={cx('menu-item')} to={config.routes.cart}>
                        Hành trình đơn hàng
                    </Link>
                    <Link className={cx('menu-item')} to={config.routes.cart}>
                        Danh sách thích
                    </Link>
                </div>
                <div className={cx('contact')}>
                    <span className={cx('contact-heading')}>Liên hệ:</span>
                    <ul className="contact-list">
                        <li className={cx('contact-item')}>
                            <FontAwesomeIcon className={cx('contact-icon')} icon={faPhone} />
                            <span className={cx('contact-title')}>0123456789</span>
                        </li>
                        <li className={cx('contact-item')}>
                            <FontAwesomeIcon className={cx('contact-icon')} icon={faEnvelope} />
                            <span className={cx('contact-title')}>mahndev@gmail.com</span>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
}

export default TopHeader;
