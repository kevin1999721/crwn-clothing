import { useSelector, useDispatch } from 'react-redux';

import { addItemToCart, removeItemFromCart, clearItemFromCart } from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.select';

import { CheckoutItemContainer, ImageContainer, QuantityContainer, QuantityText, QuantityButton, RemoveButtonContainer, RemoveButton } from './checkout-item.style';

const CheckoutItem = ({ cartitem }) => {
	const { name, imageUrl, price, quantity } = cartitem;
	const cartItems = useSelector(selectCartItems);
	const dispatch = useDispatch();

	const addItemHanlder = () => dispatch(addItemToCart(cartItems, cartitem));

	const removeItemHanlder = () => dispatch(removeItemFromCart(cartItems, cartitem));

	const clearItemHanlder = () => dispatch(clearItemFromCart(cartItems, cartitem));

	return (
		<CheckoutItemContainer>
			<ImageContainer>
				<img src={imageUrl} alt={name}></img>
			</ImageContainer>
			<div className="name">
				<span>{name}</span>
			</div>
			<QuantityContainer>
				<QuantityButton onClick={removeItemHanlder}>&#10094;</QuantityButton>
				<QuantityText>{quantity}</QuantityText>
				<QuantityButton onClick={addItemHanlder}>&#10095;</QuantityButton>
			</QuantityContainer>
			<div className="price">
				<span>{price}</span>
			</div>
			<RemoveButtonContainer>
				<RemoveButton onClick={clearItemHanlder}>&#10005;</RemoveButton>
			</RemoveButtonContainer>
		</CheckoutItemContainer>
	);
};

export default CheckoutItem;
