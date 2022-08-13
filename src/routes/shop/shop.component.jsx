import { useContext } from 'react';

import { prodcutsContext } from '../../contexts/products.context';
import ProductCard from '../../components/product-card/product-card.component';

import './shop.style.scss';
const Shop = () => {
	const { products } = useContext(prodcutsContext);
	return (
		<div className="products-container">
			{products.map(product => {
				return <ProductCard key={product.id} product={product} />;
			})}
		</div>
	);
};

export default Shop;
