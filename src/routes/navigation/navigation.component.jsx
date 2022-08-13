import { Outlet, Link } from 'react-router-dom';
import { Fragment, useContext } from 'react';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { userSignOut } from '../../utils/firebase.utils';

import CartDropDown from '../../components/cart-dropdown/cart-dropdown.conponent';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import { userContext } from '../../contexts/user.context';
import { cartContext } from '../../contexts/cart.context';

import './navigation.style.scss';

const Navigation = () => {
	const { currentUser } = useContext(userContext);
	const { isCartOpen } = useContext(cartContext);
	return (
		<Fragment>
			<nav className="navigation">
				<Link className="logo-container" to="/">
					<CrwnLogo />
				</Link>
				<div className="nav-links-container">
					<Link className="nav-link" to="/">
						Home
					</Link>
					<Link className="nav-link" to="/shop">
						Shop
					</Link>
					{currentUser ? (
						<span className="sign-out" onClick={userSignOut}>
							Sign-out
						</span>
					) : (
						<Link className="nav-link" to="/auth">
							Sign-in
						</Link>
					)}
					<CartIcon />
				</div>
				{isCartOpen && <CartDropDown />}
			</nav>
			<Outlet />
		</Fragment>
	);
};

export default Navigation;
