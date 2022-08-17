import { useContext } from 'react';

import { cartContext } from '../../contexts/cart.context';

import { CartIconContainer, ShoppingIcon, ItemCount } from './cart-icon.style';

const CartIcon = () => {
	const { isCartOpen, setIsCartOpen, cartCount } = useContext(cartContext);
	const toggleIscartOpen = () => {
		setIsCartOpen(!isCartOpen);
	};

	return (
		<CartIconContainer onClick={toggleIscartOpen}>
			<ShoppingIcon />
			<ItemCount>{cartCount}</ItemCount>
		</CartIconContainer>
	);
};

export default CartIcon;
