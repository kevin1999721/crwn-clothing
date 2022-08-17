import styled from 'styled-components';

import { ReactComponent as ShoppingSvg } from '../../assets/shopping-bag.svg';

export const CartIconContainer = styled.div`
	position: relative;
	cursor: pointer;
`;

export const ShoppingIcon = styled(ShoppingSvg)`
	width: 32px;
	height: 32px;
	vertical-align: bottom;
`;

export const ItemCount = styled.span`
	position: absolute;
	font-size: 14px;
	font-weight: bold;
	left: 50%;
	bottom: 0;
	transform: translate(-50%, 0);
`;
