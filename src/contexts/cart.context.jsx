import { useReducer } from 'react';
import { createContext, useState } from 'react';
import { createAction } from '../utils/reducer.utils';
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

export const cartContext = createContext({
	isCartOpen: false,
	setIsCartOpen: () => {},
	cartItems: [],
	addItemToCart: () => {},
	removeItemFromCart: () => {},
	clearItemFromCart: () => {},
	cartCount: 0,
	cartTotal: 0,
});

const INITIAL_STATE = {
	isCartOpen: false,
	cartItems: [],
	cartCount: 0,
	cartTotal: 0,
};

const CART_ACTION_TYPE = {
	SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
	SET_CART_ITEMS: 'SET_CART_ITEMS',
	SET_CART_COUNT: 'SET_CART_COUNT',
	SET_CART_TOTAL: 'SET_CART_TOTAL',
};

const cartReducer = (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case CART_ACTION_TYPE.SET_CART_ITEMS:
			return {
				...state,
				...payload,
			};
		default:
			throw new Error(`Unhandle type ${type} in cartReduecer`);
	}
};

export const CartProvider = ({ children }) => {
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [{ cartItems, cartCount, cartTotal }, dispatch] = useReducer(cartReducer, INITIAL_STATE);

	const updateCartItemsReducer = cartItems => {
		const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
		const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);

		const payload = {
			cartItems,
			cartCount: newCartCount,
			cartTotal: newCartTotal,
		};

		dispatch(createAction(CART_ACTION_TYPE.SET_CART_ITEMS, payload));
	};

	const addItemToCart = productToAdd => {
		const newCartItems = addCartItem(cartItems, productToAdd);
		updateCartItemsReducer(newCartItems);
	};
	const removeItemFromCart = cartItemToRemove => {
		const newCartItems = removeCartItem(cartItems, cartItemToRemove);
		updateCartItemsReducer(newCartItems);
	};
	const clearItemFromCart = cartItemToClear => {
		const newCartItems = clearCartItem(cartItems, cartItemToClear);
		updateCartItemsReducer(newCartItems);
	};

	const value = {
		isCartOpen,
		setIsCartOpen,
		cartItems,
		addItemToCart,
		removeItemFromCart,
		clearItemFromCart,
		cartCount,
		cartTotal,
	};

	return <cartContext.Provider value={value}>{children}</cartContext.Provider>;
};
