import { useState } from 'react';
import { logInWithEnailAndPassword, logInWithGoogle } from '../../utils/firebase.utils';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import './sign-in-form.style.scss';

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
		<div className="sign-in-container">
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
				<div className="buttons-container">
					<Button>Sign in</Button>
					<Button type="button" buttonType="google" onClick={logInWithGoogle}>
						Sign in with Google
					</Button>
				</div>
			</form>
		</div>
	);
};

export default SignInForm;
