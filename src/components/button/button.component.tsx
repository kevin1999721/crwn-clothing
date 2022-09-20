import { FC, ButtonHTMLAttributes } from 'react';

import { BaseButton, GoogleButton, InvertedButton } from './button.style';

export enum BUTTON_TYPE_CLASSES {
	base = 'base',
	google = 'google-sign-in',
	inverted = 'inverted',
}

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base): typeof BaseButton => {
	return {
		[BUTTON_TYPE_CLASSES.base]: BaseButton,
		[BUTTON_TYPE_CLASSES.google]: GoogleButton,
		[BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
	}[buttonType];
};

type ButtonProps = {
	buttonType?: BUTTON_TYPE_CLASSES;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = ({ children, buttonType, ...otherProps }) => {
	const CustomButton = getButton(buttonType);
	return <CustomButton {...otherProps}>{children}</CustomButton>;
};

export default Button;
