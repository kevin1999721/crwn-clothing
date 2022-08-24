import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCategoriesMap } from '../../store/categories/categories.select';
import ProductCard from '../../components/product-card/product-card.component';

import { CategoryContainer, CategoryTitle, ProductContainer } from './category.style';

const Category = () => {
	const { category } = useParams();
	const categoriesMap = useSelector(selectCategoriesMap);
	const [products, setProducts] = useState(categoriesMap[category]);
	useEffect(() => {
		setProducts(categoriesMap[category]);
	}, [category, categoriesMap]);

	return (
		<CategoryContainer>
			<CategoryTitle>{category}</CategoryTitle>
			<ProductContainer>{products && products.map(product => <ProductCard key={product.id} product={product} />)}</ProductContainer>
		</CategoryContainer>
	);
};

export default Category;
