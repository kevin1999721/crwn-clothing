import { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { CartItem } from '../../store/cart/cart.type';

import { addItemToCart, removeItemFromCart, clearItemFromCart } from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.select';

import {
	CheckoutItemContainer,
	ImageContainer,
	QuantityContainer,
	QuantityText,
	QuantityButton,
	RemoveButtonContainer,
	RemoveButton,
} from './checkout-item.style';

type CheckoutItemProps = {
	cartItem: CartItem;
};

const CheckoutItem: FC<CheckoutItemProps> = ({ cartItem }) => {
	const { name, imageUrl, price, quantity } = cartItem;
	const cartItems = useSelector(selectCartItems);
	const dispatch = useDispatch();

	const addItemHanlder = () => dispatch(addItemToCart(cartItems, cartItem));

	const removeItemHanlder = () => dispatch(removeItemFromCart(cartItems, cartItem));

	const clearItemHanlder = () => dispatch(clearItemFromCart(cartItems, cartItem));

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
