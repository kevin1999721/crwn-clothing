import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { cartContext } from '../../contexts/cart.context';
import CartItem from '../cart-item/cart-item.component';
import Button from '../button/button.component';

import { CartDropDownContainer, CartItemsContainer } from './cart-dropdown.style';

const CartDropDown = () => {
	const { cartItems } = useContext(cartContext);
	const navigate = useNavigate();

	const goToCheckoutHandler = () => {
		navigate('/checkout');
	};

	return (
		<CartDropDownContainer>
			<CartItemsContainer>
				{cartItems.map(cartItem => (
					<CartItem key={cartItem.id} cartItem={cartItem} />
				))}
			</CartItemsContainer>
			<Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
		</CartDropDownContainer>
	);
};

export default CartDropDown;
