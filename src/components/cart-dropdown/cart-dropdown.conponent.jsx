import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { cartContext } from '../../contexts/cart.context';
import CartItem from '../cart-item/cart-item.component';
import Button from '../button/button.component';

import './cart-dropdown.style.scss';

const CartDropDown = () => {
	const { cartItems } = useContext(cartContext);
	const navigate = useNavigate();

	const goToCheckoutHandler = () => {
		navigate('/checkout');
	};

	return (
		<div className="cart-dropdown-container">
			<div className="cart-items">
				{cartItems.map(cartItem => (
					<CartItem key={cartItem.id} cartItem={cartItem} />
				))}
			</div>
			<Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
		</div>
	);
};

export default CartDropDown;
