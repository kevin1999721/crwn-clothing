import { useContext } from 'react';
import CategoryPreview from '../../components/category-preview/category-preview.component';
import { categoriesContext } from '../../contexts/categories.context';

import { CategoriesContainer } from './categories-preview.style';

const CategoriesPreview = () => {
	const { categoriesMap } = useContext(categoriesContext);
	return (
		<CategoriesContainer>
			{Object.keys(categoriesMap).map(title => {
				const products = categoriesMap[title];
				return <CategoryPreview key={title} title={title} products={products}></CategoryPreview>;
			})}
		</CategoriesContainer>
	);
};

export default CategoriesPreview;
