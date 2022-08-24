import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { userStateListener, createUserDoc } from './utils/firebase.utils';
import { setCurrentUser } from './store/user/user.action';

import Navigation from './routes/navigation/navigation.component';
import Home from './routes/home/home.component';
import Authentication from './routes/authentication/authentication.component';
import Shop from './routes/shop/shop.component';
import Checkout from './routes/checkout/checkout.component';

import './App.css';

function App() {
	const dispatch = useDispatch();
	useEffect(() => {
		const unSubscribe = userStateListener(user => {
			if (user) {
				createUserDoc(user);
			}
			dispatch(setCurrentUser(user));
		});

		return unSubscribe;
	}, [dispatch]);
	return (
		<Routes>
			<Route path="/" element={<Navigation />}>
				<Route index element={<Home />} />
				<Route path="shop/*" element={<Shop />} />
				<Route path="auth" element={<Authentication />} />
				<Route path="checkout" element={<Checkout />} />
			</Route>
		</Routes>
	);
}

export default App;
