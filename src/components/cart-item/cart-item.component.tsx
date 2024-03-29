import { FC } from 'react';
import { CartItem as TCartItem } from '../../store/cart/cart.type';

import { CartItemContainer, ItemDetails } from './cart-item.style';

type CartItemProp = {
	cartItem: TCartItem;
};

const CartItem: FC<CartItemProp> = ({ cartItem }) => {
	const { name, imageUrl, price, quantity } = cartItem;
	return (
		<CartItemContainer>
			<img src={imageUrl} alt={name}></img>
			<ItemDetails>
				<span className="name">{name}</span>
				<span className="price">
					{quantity} x {price}
				</span>
			</ItemDetails>
		</CartItemContainer>
	);
};

export default CartItem;
