import { useContext } from 'react';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import { cartContext } from '../../contexts/cart.context';

import './cart-icon.style.scss';

const CartIcon = () => {
	const { isCartOpen, setIsCartOpen, cartCount } = useContext(cartContext);
	const toggleIscartOpen = () => {
		setIsCartOpen(!isCartOpen);
	};

	return (
		<div className="cart-icon-container" onClick={toggleIscartOpen}>
			<ShoppingIcon className="shopping-icon" />
			<span className="item-count">{cartCount}</span>
		</div>
	);
};

export default CartIcon;