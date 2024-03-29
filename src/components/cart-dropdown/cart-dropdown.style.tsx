import styled from 'styled-components';

export const CartDropDownContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	gap: 20px;
	width: 250px;
	height: 400px;
	padding: 20px;
	border: 1px solid #000000;
	background-color: #ffffff;
	position: absolute;
	right: 0;
	top: 100%;
	z-index: 10;
`;

export const CartItemsContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	gap: 10px;
	overflow-y: scroll;
`;
