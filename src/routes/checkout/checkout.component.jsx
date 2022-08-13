import { useContext } from 'react';

import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import { cartContext } from '../../contexts/cart.context';

import './checkout.style.scss';

const Checkout = () => {
	const { cartItems, cartTotal } = useContext(cartContext);

	return (
		<div className="checkout-container">
			<div className="checkout-header">
				<div className="header-block">
					<span>Product</span>
				</div>
				<div className="header-block">
					<span>Description</span>
				</div>
				<div className="header-block">
					<span>Quantity</span>
				</div>
				<div className="header-block">
					<span>Price</span>
				</div>
				<div className="header-block">
					<span>Remove</span>
				</div>
			</div>
			{cartItems.map(cartItem => (
				<CheckoutItem key={cartItem.id} cartitem={cartItem} />
			))}
			<div className="checkout-footer">
				<div className="total">TOTAL : ${cartTotal}</div>
			</div>
		</div>
	);
};

export default Checkout;
