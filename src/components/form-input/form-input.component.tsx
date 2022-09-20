import { FC, InputHTMLAttributes } from 'react';

import { FormInputContainer, Input, FormInputLabel } from './form-input.style';

type FormInputProps = {
	labelValue: string;
	inputOptions: InputHTMLAttributes<HTMLInputElement>;
};

const FormInput: FC<FormInputProps> = ({ labelValue, inputOptions }) => {
	return (
		<FormInputContainer>
			<Input {...inputOptions} />
			<FormInputLabel>{labelValue}</FormInputLabel>
		</FormInputContainer>
	);
};

export default FormInput;
