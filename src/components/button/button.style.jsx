import styled from 'styled-components';

const buttonMainColor = '#000000';
const buttonSubColor = '#ffffff';

export const BaseButton = styled.button`
	min-width: 150px;
	padding: 10px 20px;
	font-family: 'Open Sans', sans-serif;
	font-size: 14px;
	letter-spacing: 1px;
	text-transform: uppercase;
	border: 1px solid ${buttonMainColor};
	border-radius: 2px;
	background-color: ${buttonMainColor};
	color: ${buttonSubColor};
	cursor: pointer;

	&:hover {
		background-color: ${buttonSubColor};
		color: ${buttonMainColor};
	}
`;

export const GoogleButton = styled(BaseButton)`
	border: 1px solid #7c7cff;
	background-color: #7c7cff;
	color: #ffffff;

	&:hover {
		transform: scale(0.98);
	}
`;

export const InvertedButton = styled(BaseButton)`
	background-color: ${buttonSubColor};
	color: ${buttonMainColor};

	&:hover {
		background-color: ${buttonMainColor};
		color: ${buttonSubColor};
	}
`;
