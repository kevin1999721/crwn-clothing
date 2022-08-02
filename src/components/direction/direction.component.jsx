import CategoryItem from '../category-item/category-item.component';
import './direction.style.scss';

const Direction = ({ categories }) => {
	return (
		<div className="direction-container">
			{categories.map(category => (
				<CategoryItem key={category.id} category={category} />
			))}
		</div>
	);
};

export default Direction;
