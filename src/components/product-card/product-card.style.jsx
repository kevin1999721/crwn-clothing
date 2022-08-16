import styled from 'styled-components';

export const ButtonContainer = styled.div`
	position: absolute;
	bottom: 20%;
	left: 50%;
	transform: translate(-50%, 0);
	z-index: -1;
`;

export const ProductCardContainer = styled.div`
	width: 250px;
	height: 300px;
	position: relative;

	&:hover {
		opacity: 0.7;

		${ButtonContainer} {
			z-index: 1;
		}
	}

	img {
		width: 100%;
		height: 90%;
		object-fit: cover;
		vertical-align: bottom;
	}
`;

export const ProductCardFooter = styled.div`
	display: flex;
	height: 10%;
	justify-content: space-between;
	align-items: center;
`;
