import { createSelector } from 'reselect';
import { CategoriesState } from './categories.reducer';
import { CategoryMap } from './categories.type';
import { RootState } from '../store';

const selectCategoriesReducer = (state: RootState): CategoriesState => state.categories;

const selectCategories = createSelector(
	[selectCategoriesReducer],
	categoriesSlice => categoriesSlice.categories
);

export const selectCategoriesMap = createSelector([selectCategories], categories => {
	const categoriesMap = categories.reduce((acc, currentCategory) => {
		const { title, items } = currentCategory;
		acc[title.toLowerCase()] = items;
		return acc;
	}, {} as CategoryMap);
	return categoriesMap;
});

export const selectIsLoading = createSelector(
	[selectCategoriesReducer],
	categories => categories.isLoading
);
