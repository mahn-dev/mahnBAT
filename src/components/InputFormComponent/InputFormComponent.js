import classNames from 'classnames/bind';
import styles from './InputFormComponent.module.scss';

const cx = classNames.bind(styles);

function InputFormComponent(props) {
    const handleOnChangeInput = (e) => {
        props.onChange(e.target.value);
    };
    const { placeholder = '', ...rests } = props;
    return (
        <input
            className={cx('input')}
            placeholder={placeholder}
            value={props.value}
            {...rests}
            onChange={handleOnChangeInput}
        />
    );
}

export default InputFormComponent;
