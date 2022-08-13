import { useContext } from 'react';

import { cartContext } from '../../contexts/cart.context';

import './checkout-item.style.scss';

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
		<div className="checkout-item-container">
			<div className="image-container">
				<img src={imageUrl} alt={name}></img>
			</div>
			<div className="name">
				<span>{name}</span>
			</div>
			<div className="quantity">
				<span className="quantity-button" onClick={removeItemHanlder}>
					&#10094;
				</span>
				<span className="text">{quantity}</span>
				<span className="quantity-button" onClick={addItemHanlder}>
					&#10095;
				</span>
			</div>
			<div className="price">
				<span>{price}</span>
			</div>
			<div className="remove-button-container">
				<span className="remove-button" onClick={clearItemHanlder}>
					&#10005;
				</span>
			</div>
		</div>
	);
};

export default CheckoutItem;
