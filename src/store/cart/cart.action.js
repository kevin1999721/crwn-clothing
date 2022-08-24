import { CART_ACTION_TYPE } from './cart.type';
import { createAction } from '../../utils/reducer.utils';

const addCartItem = (cartItems, productToAdd) => {
	const existingCartItem = cartItems.find(cartitem => cartitem.id === productToAdd.id);

	if (existingCartItem) return cartItems.map(cartitem => (cartitem.id === productToAdd.id ? { ...cartitem, quantity: cartitem.quantity + 1 } : cartitem));

	return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
	const existingCartItem = cartItems.find(cartitem => cartitem.id === cartItemToRemove.id);

	if (existingCartItem.quantity === 1) {
		return cartItems.filter(cartItem => cartItem.id !== existingCartItem.id);
	}

	return cartItems.map(cartItem => (cartItem.id === existingCartItem.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem));
};

const clearCartItem = (cartItems, cartItemToClear) => {
	return cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id);
};

export const setIsCartOpen = isCartOpen => createAction(CART_ACTION_TYPE.SET_IS_CART_OPEN, isCartOpen);

export const addItemToCart = (cartItems, productToAdd) => {
	const newCartItems = addCartItem(cartItems, productToAdd);
	return createAction(CART_ACTION_TYPE.SET_CART_ITEMS, newCartItems);
};
export const removeItemFromCart = (cartItems, cartItemToRemove) => {
	const newCartItems = removeCartItem(cartItems, cartItemToRemove);
	return createAction(CART_ACTION_TYPE.SET_CART_ITEMS, newCartItems);
};
export const clearItemFromCart = (cartItems, cartItemToClear) => {
	const newCartItems = clearCartItem(cartItems, cartItemToClear);
	return createAction(CART_ACTION_TYPE.SET_CART_ITEMS, newCartItems);
};
