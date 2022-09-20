import styled from 'styled-components';

export const ItemDetails = styled.div`
	display: flex;
	flex-direction: column;
`;

export const CartItemContainer = styled.div`
	display: flex;
	gap: 10px;
	align-items: center;

	img {
		width: 50px;
		height: 60px;
		object-fit: cover;
	}
`;
