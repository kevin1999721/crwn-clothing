import { useContext } from 'react';

import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import { cartContext } from '../../contexts/cart.context';

import { CheckoutContainer, CheckoutHeader, HeaderBlock, CheckoutFooter } from './checkout.style';

const Checkout = () => {
	const { cartItems, cartTotal } = useContext(cartContext);

	return (
		<CheckoutContainer>
			<CheckoutHeader>
				<HeaderBlock>
					<span>Product</span>
				</HeaderBlock>
				<HeaderBlock>
					<span>Description</span>
				</HeaderBlock>
				<HeaderBlock>
					<span>Quantity</span>
				</HeaderBlock>
				<HeaderBlock>
					<span>Price</span>
				</HeaderBlock>
				<HeaderBlock>
					<span>Remove</span>
				</HeaderBlock>
			</CheckoutHeader>
			{cartItems.map(cartItem => (
				<CheckoutItem key={cartItem.id} cartitem={cartItem} />
			))}
			<CheckoutFooter>
				<div className="total">TOTAL : ${cartTotal}</div>
			</CheckoutFooter>
		</CheckoutContainer>
	);
};

export default Checkout;
