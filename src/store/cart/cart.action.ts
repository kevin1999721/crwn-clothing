import { CategoryItem } from '../categories/categories.type';
import { CART_ACTION_TYPE, CartItem } from './cart.type';
import { createAction, ActionWithPayload, withMatch } from '../../utils/reducer.utils';

const addCartItem = (cartItems: CartItem[], productToAdd: CategoryItem): CartItem[] => {
	const existingCartItem = cartItems.find(cartitem => cartitem.id === productToAdd.id);

	if (existingCartItem)
		return cartItems.map(cartitem =>
			cartitem.id === productToAdd.id ? { ...cartitem, quantity: cartitem.quantity + 1 } : cartitem
		);

	return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems: CartItem[], cartItemToRemove: CategoryItem): CartItem[] => {
	const existingCartItem = cartItems.find(cartitem => cartitem.id === cartItemToRemove.id);

	if (existingCartItem && existingCartItem.quantity === 1) {
		return cartItems.filter(cartItem => cartItem.id !== existingCartItem.id);
	}

	return cartItems.map(cartItem =>
		cartItem.id === cartItemToRemove.id
			? { ...cartItem, quantity: cartItem.quantity - 1 }
			: cartItem
	);
};

const clearCartItem = (cartItems: CartItem[], cartItemToClear: CategoryItem): CartItem[] => {
	return cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id);
};

export type SetIsCartOpen = ActionWithPayload<CART_ACTION_TYPE.SET_IS_CART_OPEN, boolean>;

export type SetCartItems = ActionWithPayload<CART_ACTION_TYPE.SET_CART_ITEMS, CartItem[]>;

export const setIsCartOpen = withMatch(
	(isCartOpen: boolean): SetIsCartOpen =>
		createAction(CART_ACTION_TYPE.SET_IS_CART_OPEN, isCartOpen)
);

export const setCartItems = withMatch(
	(newcartItems: CartItem[]): SetCartItems =>
		createAction(CART_ACTION_TYPE.SET_CART_ITEMS, newcartItems)
);

export const addItemToCart = (cartItems: CartItem[], productToAdd: CategoryItem) => {
	const newCartItems = addCartItem(cartItems, productToAdd);
	return setCartItems(newCartItems);
};
export const removeItemFromCart = (cartItems: CartItem[], cartItemToRemove: CategoryItem) => {
	const newCartItems = removeCartItem(cartItems, cartItemToRemove);
	return setCartItems(newCartItems);
};
export const clearItemFromCart = (cartItems: CartItem[], cartItemToClear: CategoryItem) => {
	const newCartItems = clearCartItem(cartItems, cartItemToClear);
	return setCartItems(newCartItems);
};
