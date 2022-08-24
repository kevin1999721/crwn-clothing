import { useSelector } from 'react-redux';
import { selectCategoriesMap } from '../../store/categories/categories.select';

import CategoryPreview from '../../components/category-preview/category-preview.component';

import { CategoriesContainer } from './categories-preview.style';

const CategoriesPreview = () => {
	const categoriesMap = useSelector(selectCategoriesMap);
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
