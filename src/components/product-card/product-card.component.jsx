import { useSelector, useDispatch } from 'react-redux';

import { addItemToCart } from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.select';

import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

import { ProductCardContainer, ButtonContainer, ProductCardFooter } from './product-card.style';

const ProductCard = ({ product }) => {
	const dispatch = useDispatch();
	const cartItems = useSelector(selectCartItems);
	const addToCartHandler = () => dispatch(addItemToCart(cartItems, product));

	const { name, imageUrl, price } = product;
	return (
		<ProductCardContainer>
			<img src={imageUrl} alt={name}></img>
			<ProductCardFooter>
				<span className="name">{name}</span>
				<span className="price">{price}</span>
			</ProductCardFooter>
			<ButtonContainer>
				<Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addToCartHandler}>
					ADD TO CART
				</Button>
			</ButtonContainer>
		</ProductCardContainer>
	);
};

export default ProductCard;
