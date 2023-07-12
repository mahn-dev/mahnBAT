function InputForm(props) {
    const handleOnChangeInput = (e) => {
        props.onChange(e.target.value);
    };
    const { placeholder = '', ...rests } = props;
    return <input placeholder={placeholder} value={props.value} {...rests} onChange={handleOnChangeInput} />;
}

export default InputForm;
