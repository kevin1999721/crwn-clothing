import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { asyncFetchCategories } from '../../store/categories/categories.action';

import CategoriesPreview from '../categories-preview/categories-preview';
import Category from '../category/category.component';

const Shop = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(asyncFetchCategories());
	}, [dispatch]);

	return (
		<Routes>
			<Route index element={<CategoriesPreview />}></Route>
			<Route path=":category" element={<Category />}></Route>
		</Routes>
	);
};

export default Shop;
