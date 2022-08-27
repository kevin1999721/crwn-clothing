import { CATEGORIES_ACTION_TYPE } from './categories.type';
import { createAction } from '../../utils/reducer.utils';

export const fetchCategoriesStart = () =>
	createAction(CATEGORIES_ACTION_TYPE.SET_FETCH_CATEGORIES_START, true);

export const fetchCategoriesSuccess = categories =>
	createAction(CATEGORIES_ACTION_TYPE.SET_FETCH_CATEGORIES_SUCCESS, categories);

export const fetchCategoriesFailed = error =>
	createAction(CATEGORIES_ACTION_TYPE.SET_FETCH_CATEGORIES_FAILED, error);
