import { useNavigate } from 'react-router-dom';

import './directory-item.style.scss';

const DirectoryItem = ({ category }) => {
	const { imageUrl, title, route } = category;
	const navigation = useNavigate();

	const navigationHandler = () => navigation(route);

	return (
		<div onClick={navigationHandler} className="directory-item-container">
			<div className="background-image" style={{ backgroundImage: `url(${imageUrl})` }}></div>
			<div className="body">
				<h2>{title}</h2>
				<p>Shop Now</p>
			</div>
		</div>
	);
};

export default DirectoryItem;
