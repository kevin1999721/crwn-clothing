import { CATEGORIES_ACTION_TYPE } from './categories.type';
import { createAction } from '../../utils/reducer.utils';

import { getCategoriesAndDocuments } from '../../utils/firebase.utils';

export const fetchCategoriesStart = () => createAction(CATEGORIES_ACTION_TYPE.SET_FETCH_CATEGORIES_START, true);

export const fetchCategoriesSuccess = categories => createAction(CATEGORIES_ACTION_TYPE.SET_FETCH_CATEGORIES_SUCCESS, categories);

export const fetchCategoriesFailed = error => createAction(CATEGORIES_ACTION_TYPE.SET_FETCH_CATEGORIES_FAILED, error);

export const asyncFetchCategories = () => {
	return async dispatch => {
		dispatch(fetchCategoriesStart());
		try {
			const categories = await getCategoriesAndDocuments();
			dispatch(fetchCategoriesSuccess(categories));
		} catch (error) {
			dispatch(fetchCategoriesFailed(error));
		}
	};
};
