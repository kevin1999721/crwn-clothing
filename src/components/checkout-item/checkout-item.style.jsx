import styled from 'styled-components';

export const CheckoutItemContainer = styled.div`
	display: flex;
	padding: 20px 0;
	border-bottom: 1px solid #bbbbbb;

	> div {
		display: flex;
		justify-content: center;
		margin: auto;
		flex: 1;
	}
`;

export const ImageContainer = styled.div`
	img {
		width: 70%;
		object-fit: cover;
	}
`;

export const QuantityContainer = styled.div``;

export const QuantityButton = styled.span`
	cursor: pointer;
`;

export const QuantityText = styled.span`
	margin: 0 10px;
`;

export const RemoveButtonContainer = styled.div``;

export const RemoveButton = styled.span`
	cursor: pointer;
`;
