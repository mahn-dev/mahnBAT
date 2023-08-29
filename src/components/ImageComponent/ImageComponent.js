import classNames from 'classnames';
import styles from './ImageComponent.module.scss';

import { useState, forwardRef } from 'react';
import PropTypes from 'prop-types';

import image from '~/assets/img';

const ImageComponent = forwardRef(
    ({ src, alt, className, fallback: customFallback = image.noImage, ...props }, ref) => {
        const [fallback, setFallback] = useState('');
        const handleError = () => {
            setFallback(customFallback);
        };

        return (
            <img
                className={classNames(styles.wrapper, className)}
                ref={ref}
                src={fallback || src}
                alt={alt}
                {...props}
                onError={handleError}
            />
        );
    },
);

ImageComponent.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    className: PropTypes.string,
    fallback: PropTypes.string,
};

export default ImageComponent;
