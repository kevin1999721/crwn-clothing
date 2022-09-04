import { useSelector } from 'react-redux';

import { selectCartItems, selectCartTotal } from '../../store/cart/cart.select';

import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import PaymentForm from '../../components/payment-form/payment-form.component';

import { CheckoutContainer, CheckoutHeader, HeaderBlock, CheckoutFooter } from './checkout.style';

const Checkout = () => {
	const cartItems = useSelector(selectCartItems);
	const cartTotal = useSelector(selectCartTotal);

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
			<PaymentForm></PaymentForm>
		</CheckoutContainer>
	);
};

export default Checkout;
