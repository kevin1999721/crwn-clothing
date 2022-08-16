import { Outlet, Link } from 'react-router-dom';
import { Fragment, useContext } from 'react';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { userSignOut } from '../../utils/firebase.utils';

import CartDropDown from '../../components/cart-dropdown/cart-dropdown.conponent';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import { userContext } from '../../contexts/user.context';
import { cartContext } from '../../contexts/cart.context';

import { NavigationContainer, NavLinksContainer, SignOutSpan } from './navigation.style';

const Navigation = () => {
	const { currentUser } = useContext(userContext);
	const { isCartOpen } = useContext(cartContext);
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
						<SignOutSpan onClick={userSignOut}>Sign-out</SignOutSpan>
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
