import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { DirectoryCategory } from '../directory/directory.component';

import { DirectoryItemContainer, BackgroundImage, DirectoryItemBody } from './directory-item.style';

type DirectoryItemProps = {
	category: DirectoryCategory;
};

const DirectoryItem: FC<DirectoryItemProps> = ({ category }) => {
	const { imageUrl, title, route } = category;
	const navigation = useNavigate();

	const navigationHandler = () => navigation(route);

	return (
		<DirectoryItemContainer onClick={navigationHandler}>
			<BackgroundImage imageUrl={imageUrl} />
			<DirectoryItemBody className="body">
				<h2>{title}</h2>
				<p>Shop Now</p>
			</DirectoryItemBody>
		</DirectoryItemContainer>
	);
};

export default DirectoryItem;
