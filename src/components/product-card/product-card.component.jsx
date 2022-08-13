import { useContext } from 'react';

import { cartContext } from '../../contexts/cart.context';
import Button from '../button/button.component';

import './product-card.style.scss';

const ProductCard = ({ product }) => {
	const { addItemToCart } = useContext(cartContext);
	const addToCartHandler = () => addItemToCart(product);

	const { name, imageUrl, price } = product;
	return (
		<div className="product-card-container">
			<img src={imageUrl} alt={name}></img>
			<div className="product-card-footer">
				<span className="name">{name}</span>
				<span className="price">{price}</span>
			</div>
			<Button buttonType="inverted" onClick={addToCartHandler}>
				ADD TO CART
			</Button>
		</div>
	);
};

export default ProductCard;
