import { Outlet, Link } from 'react-router-dom';
import { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentUser } from '../../store/user/user.select';
import { selectIsCartOpen } from '../../store/cart/cart.select';
import { signOutStart } from '../../store/user/user.action';

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import CartDropDown from '../../components/cart-dropdown/cart-dropdown.conponent';
import CartIcon from '../../components/cart-icon/cart-icon.component';

import { NavigationContainer, NavLinksContainer, SignOutSpan } from './navigation.style';

const Navigation = () => {
	const dispatch = useDispatch();
	const currentUser = useSelector(selectCurrentUser);
	const isCartOpen = useSelector(selectIsCartOpen);

	const signOutHnadler = () => {
		dispatch(signOutStart());
	};

	return (
		<Fragment>
			<NavigationContainer>
				<Link className="logo-container" to="/">
					<CrwnLogo />
				</Link>
				<NavLinksContainer>
					<Link className="nav-link" to="/">
						Home
					</Link>
					<Link className="nav-link" to="/shop">
						Shop
					</Link>
					{currentUser ? (
						<SignOutSpan onClick={signOutHnadler}>Sign-out</SignOutSpan>
					) : (
						<Link className="nav-link" to="/auth">
							Sign-in
						</Link>
					)}
					<CartIcon />
				</NavLinksContainer>
				{isCartOpen && <CartDropDown />}
			</NavigationContainer>
			<Outlet />
		</Fragment>
	);
};

export default Navigation;
