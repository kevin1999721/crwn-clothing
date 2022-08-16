import { FormInputContainer, Input, FormInputLabel } from './form-input.style';

const FormInput = ({ labelValue, inputOptions }) => {
	return (
		<FormInputContainer>
			<Input {...inputOptions} />
			<FormInputLabel>{labelValue}</FormInputLabel>
		</FormInputContainer>
	);
};

export default FormInput;
