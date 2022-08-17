import { useContext } from 'react';

import { cartContext } from '../../contexts/cart.context';

import { CheckoutItemContainer, ImageContainer, QuantityContainer, QuantityText, QuantityButton, RemoveButtonContainer, RemoveButton } from './checkout-item.style';

const CheckoutItem = ({ cartitem }) => {
	const { addItemToCart, removeItemFromCart, clearItemFromCart } = useContext(cartContext);
	const { name, imageUrl, price, quantity } = cartitem;

	const addItemHanlder = () => {
		addItemToCart(cartitem);
	};
	const removeItemHanlder = () => {
		removeItemFromCart(cartitem);
	};
	const clearItemHanlder = () => {
		clearItemFromCart(cartitem);
	};

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
