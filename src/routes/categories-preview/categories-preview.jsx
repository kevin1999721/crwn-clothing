import { useContext } from 'react';
import CategoryPreview from '../../components/category-preview/category-preview.component';
import { categoriesContext } from '../../contexts/categories.context';

import './categories-preview.scss';

const CategoriesPreview = () => {
	const { categoriesMap } = useContext(categoriesContext);
	return (
		<div className="categories-container">
			{Object.keys(categoriesMap).map(title => {
				const products = categoriesMap[title];
				return <CategoryPreview key={title} title={title} products={products}></CategoryPreview>;
			})}
		</div>
	);
};

export default CategoriesPreview;
