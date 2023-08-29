import classNames from 'classnames/bind';
import styles from './LoadingComponent.module.scss';

import image from '~/assets/img';

const cx = classNames.bind(styles);

function LoadingComponent() {
    return (
        <div className={cx('spinner-container')}>
            <img className={cx('loading-spinner')} src={image.logoHome} alt="logo" />
        </div>
    );
}

export default LoadingComponent;
