import { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import ProductCard from '../../components/product-card/product-card.component';
import { categoriesContext } from '../../contexts/categories.context';

import './category.style.scss';

const Category = () => {
	const { category } = useParams();
	const { categoriesMap } = useContext(categoriesContext);
	const [products, setProducts] = useState(categoriesMap[category]);

	useEffect(() => {
		setProducts(categoriesMap[category]);
	}, [category, categoriesMap]);

	return (
		<div className="category-container">
			<h2 className="category-title">{category}</h2>
			<div className="products-container">{products && products.map(product => <ProductCard key={product.id} product={product} />)}</div>
		</div>
	);
};

export default Category;
