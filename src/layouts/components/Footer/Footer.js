import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import { Link } from 'react-router-dom';

import config from '~/config';
import image from '~/assets/img';
const cx = classNames.bind(styles);

function Footer() {
    return (
        <footer className={cx('wrapper')}>
            <div className={cx('footer-container')}>
                <div className={cx('footer-item')}>
                    <img className={cx('footer-logo')} src={image.logoHomeWhite} alt="logo" />
                    <h3 className={cx('footer-heading')}>Pin Chuyên Nghiệp</h3>
                    <p className={cx('footer-desc')}>
                        Nhận đóng pin các loại máy công cụ cầm tay, pin sạc dự phòng, pin lưu trữ, pin xe điện.
                    </p>
                </div>
                <div className={cx('footer-item')}>
                    <h3>Cần trợ giúp?</h3>
                    <div className={cx('footer-contact')}>
                        <span>0386983158</span>
                        <Link className={cx('footer-link--primary')} to={config.routes.about}>
                            hotro.mahnbat@gmail.com
                        </Link>
                    </div>
                </div>
                <div className={cx('footer-item')}>
                    <h3>Dịch vụ khách hàng</h3>
                    <ul>
                        <li>
                            <Link className={cx('footer-link')} to={config.routes.about}>
                                Trung tâm trợ giúp
                            </Link>
                        </li>
                        <li>
                            <Link className={cx('footer-link')} to={config.routes.about}>
                                Tài khoản của tôi
                            </Link>
                        </li>
                        <li>
                            <Link className={cx('footer-link')} to={config.routes.about}>
                                Theo dõi sản phẩm
                            </Link>
                        </li>
                        <li>
                            <Link className={cx('footer-link')} to={config.routes.about}>
                                Đơn đặt hàng của tôi
                            </Link>
                        </li>
                        <li>
                            <Link className={cx('footer-link')} to={config.routes.about}>
                                Mã giảm giá
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className={cx('footer-item')}>
                    <h3>Các sản phẩm chính</h3>
                    <ul>
                        <ul>
                            <h4>Pin máy công cụ</h4>
                            <li>Máy khoan</li>
                            <li>Máy mài</li>
                            <li>Máy cắt</li>
                            <li>Máy khoan rút lõi</li>
                        </ul>
                        <li>Pin xe điện 24V-60V</li>
                        <li>Pin sạc dự phòng</li>
                        <li>Pin lưu trữ năng lượng mặt trời</li>
                        <li>Pin đóng theo yêu cầu</li>
                    </ul>
                </div>
            </div>
            <div className={cx('footer-policy')}>
                <div className={cx('footer-policy__inner')}>
                    <ul className={cx('footer-policy__list')}>
                        <li className={cx('footer-policy__item--separation', 'footer-policy__item')}>
                            <Link className={cx('footer-link')} to={config.routes.about}>
                                CHÍNH SÁCH BẢO MẬT
                            </Link>
                        </li>
                        <li className={cx('footer-policy__item--separation', 'footer-policy__item')}>
                            <Link className={cx('footer-link')} to={config.routes.about}>
                                QUY CHẾ HOẠT ĐỘNG
                            </Link>
                        </li>
                        <li className={cx('footer-policy__item--separation', 'footer-policy__item')}>
                            <Link className={cx('footer-link')} to={config.routes.about}>
                                CHÍNH SÁCH VẬN CHUYỂN
                            </Link>
                        </li>
                        <li>
                            <Link className={cx('footer-link')} to={config.routes.about}>
                                CHÍNH SÁCH TRẢ HÀNG VÀ HOÀN TIỀN
                            </Link>
                        </li>
                    </ul>
                    <p className={cx('footer-copyright')}>© 2023 mahnBAT. Tất cả các quyền được bảo lưu.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
