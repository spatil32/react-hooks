import { useState } from 'react';

const useFormsInput = () => {
	const [ value, setValue ] = useState('');
	const [ validity, setValidity ] = useState(false);

	const textChangeHandler = (event) => {
		setValue(event.target.value);
		if (event.target.value === '') setValidity(false);
		else setValidity(true);
	};

	return { value: value, onChange: textChangeHandler, validity };
};

export default useFormsInput;
