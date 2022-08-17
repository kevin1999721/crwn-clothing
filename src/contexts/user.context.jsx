import { createContext, useEffect, useReducer } from 'react';

import { userStateListener, createUserDoc } from '../utils/firebase.utils';

export const userContext = createContext({
	currentUser: null,
	setCurrentUser: () => null,
});

export const USER_ACTION_TYPE = {
	SET_CURRENT_USER: 'SET_CURRENT_USER',
};

const INITIAL_STATE = {
	currentUser: null,
};

const userReducer = (state, action) => {
	const { type, payload } = action;
	switch (type) {
		case USER_ACTION_TYPE.SET_CURRENT_USER:
			return {
				...state,
				currentUser: payload,
			};
		default:
			break;
	}
};

export const UserProvider = ({ children }) => {
	const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE);
	const setCurrentUser = user => {
		dispatch({ type: USER_ACTION_TYPE.SET_CURRENT_USER, payload: user });
	};

	useEffect(() => {
		const unSubscribe = userStateListener(user => {
			if (user) {
				createUserDoc(user);
			}
			setCurrentUser(user);
			console.log(user);
		});

		return unSubscribe;
	}, []);

	const value = { currentUser, setCurrentUser };
	return <userContext.Provider value={value}>{children}</userContext.Provider>;
};
