import { useState } from 'react';
import { logInWithEnailAndPassword, logInWithGoogle } from '../../utils/firebase.utils';

import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import { SignInContainer, ButtonsContainer } from './sign-in-form.style';

const defaultFormFields = {
	email: '',
	password: '',
};

const SignInForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { email, password } = formFields;

	const onInputValueChange = e => {
		const { name, value } = e.target;
		setFormFields({ ...formFields, [name]: value });
	};

	const onFormSubmit = e => {
		e.preventDefault();
		logInWithEnailAndPassword(email, password);
		setFormFields(defaultFormFields);
	};

	return (
		<SignInContainer>
			<h2>Already have an account?</h2>
			<span>Sign in with your email and password</span>
			<form onSubmit={onFormSubmit}>
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
				<ButtonsContainer className="buttons-container">
					<Button>Sign in</Button>
					<Button type="button" buttonType={BUTTON_TYPE_CLASSES.google} onClick={logInWithGoogle}>
						Sign in with Google
					</Button>
				</ButtonsContainer>
			</form>
		</SignInContainer>
	);
};

export default SignInForm;
