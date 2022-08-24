import { createSelector } from 'reselect';

const selectCategoriesReducer = state => state.categories;

const selectCategories = createSelector([selectCategoriesReducer], categoriesSlice => categoriesSlice.categories);

export const selectCategoriesMap = createSelector([selectCategories], categories => {
	const categoriesMap = categories.reduce((acc, currentCategory) => {
		const { title, items } = currentCategory;
		acc[title.toLowerCase()] = items;
		return acc;
	}, {});
	return categoriesMap;
});
