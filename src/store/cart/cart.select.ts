import { createSelector } from 'reselect';
import { CartInitialState } from './cart.reducer';

const selectCartReducer = (state: any): CartInitialState => state.cart;

export const selectIsCartOpen = createSelector(
	[selectCartReducer],
	cartSlice => cartSlice.isCartOpen
);

export const selectCartItems = createSelector(
	[selectCartReducer],
	cartSlice => cartSlice.cartItems
);

export const selectCartCount = createSelector([selectCartItems], cartItems =>
	cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
);

export const selectCartTotal = createSelector([selectCartItems], cartItems =>
	cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0)
);
