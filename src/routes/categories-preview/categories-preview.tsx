import { Fragment } from 'react';
import { useSelector } from 'react-redux';

import { selectCategoriesMap, selectIsLoading } from '../../store/categories/categories.select';

import CategoryPreview from '../../components/category-preview/category-preview.component';
import Spinner from '../../components/spinner/spinner.component';

import { CategoriesContainer } from './categories-preview.style';

const CategoriesPreview = () => {
	const categoriesMap = useSelector(selectCategoriesMap);
	const isLoading = useSelector(selectIsLoading);
	return (
		<Fragment>
			{isLoading ? (
				<Spinner />
			) : (
				<CategoriesContainer>
					{Object.keys(categoriesMap).map(title => {
						const products = categoriesMap[title];
						return <CategoryPreview key={title} title={title} products={products}></CategoryPreview>;
					})}
				</CategoriesContainer>
			)}
		</Fragment>
	);
};

export default CategoriesPreview;
