require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

exports.handler = async req => {
	try {
		const { amount } = JSON.parse(req.body);

		const paymentIntent = await stripe.paymentIntents.create({
			amount,
			currency: 'usd',
			payment_method_types: ['card'],
		});

		return {
			statusCode: 200,
			body: JSON.stringify({ paymentIntent }),
		};
	} catch (error) {
		console.log({ error });
		return {
			statusCode: 400,
			body: JSON.stringify({ error }),
		};
	}
};
