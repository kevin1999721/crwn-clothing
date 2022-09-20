import styled from 'styled-components';

type BackgroundImageProps = {
	imageUrl: string;
};

export const BackgroundImage = styled.div`
	width: 100%;
	height: 100%;
	background-image: url(${({ imageUrl }: BackgroundImageProps) => imageUrl});
	background-position: center;
	background-size: cover;
	background-repeat: no-repeat;
	transition: 3s;
`;

export const DirectoryItemBody = styled.div`
	padding: 10px 15px;
	border: 1px solid #000;
	border-radius: 2px;
	background: rgba(255, 255, 255, 0.8);
	text-align: center;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	transition: 0.5s;

	h2 {
		text-transform: uppercase;
	}
`;

export const DirectoryItemContainer = styled.div`
	min-width: 30%;
	height: 200px;
	border: 1px solid #000;
	border-radius: 2px;
	overflow: hidden;
	flex-grow: 1;
	position: relative;
	cursor: pointer;

	&:hover {
		${BackgroundImage} {
			transform: scale(1.1);
		}
		${DirectoryItemBody} {
			background: rgba(255, 255, 255, 1);
		}
	}
`;
