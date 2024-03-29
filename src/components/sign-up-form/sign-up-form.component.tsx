import { useState, FormEvent, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';

import { signUpStart } from '../../store/user/user.action';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import { SignUpContainer } from './sign-up-form.style';

const defaultFormFields = {
	displayName: '',
	email: '',
	password: '',
	confirmPassword: '',
};
const SignUpForm = () => {
	const dispatch = useDispatch();
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { displayName, email, password, confirmPassword } = formFields;

	const onSignUpFormSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (password.length < 6) {
			alert('Password should be at least 6 characters');
			return;
		} else if (password !== confirmPassword) {
			alert('Passwords do not match');
			return;
		}

		dispatch(signUpStart(email, password, { displayName }));
		setFormFields(defaultFormFields);
	};

	const onInputValueChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormFields({ ...formFields, [name]: value });
	};

	return (
		<SignUpContainer>
			<h2>Don't have an account?</h2>
			<span>Sign up with your email and password</span>
			<form onSubmit={onSignUpFormSubmit}>
				<FormInput
					labelValue="Display Name"
					inputOptions={{
						required: true,
						onChange: onInputValueChange,
						type: 'text',
						name: 'displayName',
						value: displayName,
					}}
				/>
				<FormInput
					labelValue="Email"
					inputOptions={{
						required: true,
						onChange: onInputValueChange,
						type: 'email',
						name: 'email',
						value: email,
					}}
				/>
				<FormInput
					labelValue="Password"
					inputOptions={{
						required: true,
						onChange: onInputValueChange,
						type: 'password',
						name: 'password',
						value: password,
					}}
				/>
				<FormInput
					labelValue="Confirm Password"
					inputOptions={{
						required: true,
						onChange: onInputValueChange,
						type: 'password',
						name: 'confirmPassword',
						value: confirmPassword,
					}}
				/>
				<Button>Sign Up</Button>
			</form>
		</SignUpContainer>
	);
};

export default SignUpForm;
