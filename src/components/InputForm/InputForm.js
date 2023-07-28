import classNames from 'classnames/bind';
import styles from './InputForm.module.scss';

const cx = classNames.bind(styles);

function InputForm(props) {
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

export default InputForm;
