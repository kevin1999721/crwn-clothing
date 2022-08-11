import { createContext, useState, useEffect } from 'react';

import { userStateListener, createUserDoc } from '../utils/firebase.utils';

export const userContext = createContext({
	currentUser: null,
	setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);
	const value = { currentUser, setCurrentUser };

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

	return <userContext.Provider value={value}>{children}</userContext.Provider>;
};
