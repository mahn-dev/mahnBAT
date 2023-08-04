import classNames from 'classnames/bind';
import styles from './BusinessPartners.module.scss';

import samsung from '~/assets/businessLogo/samsung.jpg';
import eve from '~/assets/businessLogo/eve.jpg';
import lishen from '~/assets/businessLogo/lishen.jpg';
import sony from '~/assets/businessLogo/sony.png';
import lg from '~/assets/businessLogo/lg.png';
import makita from '~/assets/businessLogo/makita.png';
import milwaukee from '~/assets/businessLogo/milwaukee.png';
import dewalt from '~/assets/businessLogo/dewalt.png';
import dekton from '~/assets/businessLogo/dekton.png';

const cx = classNames.bind(styles);

function BusinessPartners() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <h3 className={cx('business-heading')}>Những nhãn hàng đối tác của chúng tôi</h3>
                <ul className={cx('business-list')}>
                    <li className={cx('business-item')}>
                        <img className={cx('business-img')} src={samsung} />
                    </li>
                    <li className={cx('business-item')}>
                        <img className={cx('business-img')} src={eve} />
                    </li>
                    <li className={cx('business-item')}>
                        <img className={cx('business-img')} src={lishen} />
                    </li>
                    <li className={cx('business-item')}>
                        <img className={cx('business-img')} src={sony} />
                    </li>
                    <li className={cx('business-item')}>
                        <img className={cx('business-img')} src={lg} />
                    </li>
                    <li className={cx('business-item')}>
                        <img className={cx('business-img')} src={makita} />
                    </li>
                    <li className={cx('business-item')}>
                        <img className={cx('business-img')} src={milwaukee} />
                    </li>
                    <li className={cx('business-item')}>
                        <img className={cx('business-img')} src={dewalt} />
                    </li>
                    <li className={cx('business-item')}>
                        <img className={cx('business-img')} src={dekton} />
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default BusinessPartners;
