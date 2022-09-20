import styled, { css } from 'styled-components';

const mainColor = '#000000';
const subColor = '#777777';
const formInputMarginTop = '20px';

const shrinkLabelStyles = css`
	font-size: 14px;
	font-weight: 600;
	line-height: ${formInputMarginTop};
	color: ${mainColor};
	left: 0;
	top: 0;
`;

export const FormInputLabel = styled.label`
	font-size: 18px;
	color: ${subColor};
	position: absolute;
	top: ${formInputMarginTop};
	left: 0;
	pointer-events: none;
	transition: 0.2s;
`;

export const FormInputContainer = styled.div`
	margin: 20px 0;
	position: relative;
`;

export const Input = styled.input`
	width: 100%;
	margin-top: ${formInputMarginTop};
	padding: 5px 0;
	font-size: 18px;
	color: ${subColor};
	border: none;
	outline: none;
	border-bottom: 1px solid ${subColor};

	&[type='password'] {
		letter-spacing: 3px;
	}

	&:focus ~ ${FormInputLabel} {
		${shrinkLabelStyles};
	}

	&:not([value='']) ~ ${FormInputLabel} {
		${shrinkLabelStyles};
	}
`;
