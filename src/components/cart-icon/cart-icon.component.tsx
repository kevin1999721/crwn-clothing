import { useSelector, useDispatch } from 'react-redux';

import { setIsCartOpen } from '../../store/cart/cart.action';
import { selectIsCartOpen, selectCartCount } from '../../store/cart/cart.select';

import { CartIconContainer, ShoppingIcon, ItemCount } from './cart-icon.style';

const CartIcon = () => {
	const dispatch = useDispatch();
	const isCartOpen = useSelector(selectIsCartOpen);
	const cartCount = useSelector(selectCartCount);

	const toggleIscartOpen = () => {
		dispatch(setIsCartOpen(!isCartOpen));
	};

	return (
		<CartIconContainer onClick={toggleIscartOpen}>
			<ShoppingIcon />
			<ItemCount>{cartCount}</ItemCount>
		</CartIconContainer>
	);
};

export default CartIcon;
