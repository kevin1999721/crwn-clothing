import { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectCategoriesMap, selectIsLoading } from '../../store/categories/categories.select';

import ProductCard from '../../components/product-card/product-card.component';
import Spinner from '../../components/spinner/spinner.component';

import { CategoryContainer, CategoryTitle, ProductContainer } from './category.style';

type CategoryRouteParams = {
	category: string;
};

const Category = () => {
	const { category } = useParams<keyof CategoryRouteParams>() as CategoryRouteParams;

	const categoriesMap = useSelector(selectCategoriesMap);
	const isLoading = useSelector(selectIsLoading);
	const [products, setProducts] = useState(categoriesMap[category]);

	useEffect(() => {
		setProducts(categoriesMap[category]);
	}, [category, categoriesMap]);

	return (
		<Fragment>
			{isLoading ? (
				<Spinner />
			) : (
				<CategoryContainer>
					<CategoryTitle>{category}</CategoryTitle>
					<ProductContainer>
						{products &&
							products.map(product => <ProductCard key={product.id} product={product} />)}
					</ProductContainer>
				</CategoryContainer>
			)}
		</Fragment>
	);
};

export default Category;
