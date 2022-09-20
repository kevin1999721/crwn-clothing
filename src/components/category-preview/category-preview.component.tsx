import { FC } from 'react';
import { Link } from 'react-router-dom';

import { CategoryItem } from '../../store/categories/categories.type';

import ProductCard from '../product-card/product-card.component';

import { CategoryPreviewContainer, Title, Preview } from './category-preview.style';

type CategoryPreviewProps = {
	title: string;
	products: CategoryItem[];
};

const CategoryPreview: FC<CategoryPreviewProps> = ({ title, products }) => {
	return (
		<CategoryPreviewContainer>
			<Title>
				<Link to={title}>{title.toUpperCase()}</Link>
			</Title>
			<Preview>
				{products
					.filter((_, index) => index < 4)
					.map(product => (
						<ProductCard key={product.id} product={product} />
					))}
			</Preview>
		</CategoryPreviewContainer>
	);
};

export default CategoryPreview;
