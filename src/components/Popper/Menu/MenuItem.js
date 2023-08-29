import PropTypes from 'prop-types';
import ButtonComponent from '~/components/ButtonComponent';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

function MenuItem({ data, onClick }) {
    const classes = cx('menu-item', {
        separate: data.separate,
    });
    return (
        <ButtonComponent className={classes} leftIcon={data.icon} to={data.to} onClick={data.onClick}>
            {data.title}
        </ButtonComponent>
    );
}

MenuItem.propTypes = {
    data: PropTypes.object.isRequired,
    onClick: PropTypes.func,
};

export default MenuItem;
