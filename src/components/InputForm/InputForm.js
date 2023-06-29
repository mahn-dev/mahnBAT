import { useState } from 'react';

function InputForm(props) {
    const [valueInput, setValueInput] = useState('');
    const { placeholder = '', ...rests } = props;
    return <input placeholder={placeholder} valueInput={valueInput} {...rests} />;
}

export default InputForm;
