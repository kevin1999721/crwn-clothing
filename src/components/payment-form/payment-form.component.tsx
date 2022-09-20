import { useState, FormEvent } from 'react';
import { useSelector } from 'react-redux';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { StripeCardElement } from '@stripe/stripe-js';

import { selectCartTotal } from '../../store/cart/cart.select';
import { selectCurrentUser } from '../../store/user/user.select';

import { BUTTON_TYPE_CLASSES } from '../button/button.component';

import { PaymentFormContainer, PaymentButton, PaymentSpinner } from './payment-form.style';

const validCardElement = (
	cardElement: StripeCardElement | null
): cardElement is StripeCardElement => cardElement !== null;

const PaymentForm = () => {
	const stripe = useStripe();
	const elements = useElements();
	const cartTotal = useSelector(selectCartTotal);
	const currentUser = useSelector(selectCurrentUser);
	const [isProcessingPayment, setIsProcessingPayment] = useState(false);

	const paymentHandler = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!stripe || !elements) return;

		setIsProcessingPayment(true);

		const response = await fetch('/.netlify/functions/create-payment-intent', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ amount: cartTotal * 100 }),
		}).then(res => res.json());

		const {
			paymentIntent: { client_secret },
		} = response;

		const stripeCardElement = elements.getElement(CardElement);
		if (!validCardElement(stripeCardElement)) return;

		const paymentResult = await stripe.confirmCardPayment(client_secret, {
			payment_method: {
				card: stripeCardElement,
				billing_details: {
					name: currentUser ? currentUser.displayName : 'Guest',
				},
			},
		});

		setIsProcessingPayment(false);

		if (paymentResult.error) {
			alert(paymentResult.error.message);
		} else {
			switch (paymentResult.paymentIntent.status) {
				case 'succeeded':
					alert('Payment succeeded!');
					break;
				case 'processing':
					alert('Your payment is processing.');
					break;
				case 'requires_payment_method':
					alert('Your payment was not successful, please try again.');
					break;
				default:
					alert('Something went wrong.');
					break;
			}
		}
	};

	return (
		<PaymentFormContainer>
			<form onSubmit={paymentHandler}>
				<CardElement />
				<PaymentButton disabled={isProcessingPayment} buttonType={BUTTON_TYPE_CLASSES.inverted}>
					{isProcessingPayment ? <PaymentSpinner /> : 'Pay Now'}
				</PaymentButton>
			</form>
		</PaymentFormContainer>
	);
};

export default PaymentForm;
