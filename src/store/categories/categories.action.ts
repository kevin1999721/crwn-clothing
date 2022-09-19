import { CATEGORIES_ACTION_TYPE, Category } from './categories.type';
import { createAction, Action, ActionWithPayload, withMatch } from '../../utils/reducer.utils';

export type FetchCategoriesStart = Action<CATEGORIES_ACTION_TYPE.SET_FETCH_CATEGORIES_START>;

export type FetchCategoriesSuccess = ActionWithPayload<
	CATEGORIES_ACTION_TYPE.SET_FETCH_CATEGORIES_SUCCESS,
	Category[]
>;

export type FetchCategoriesFailed = ActionWithPayload<
	CATEGORIES_ACTION_TYPE.SET_FETCH_CATEGORIES_FAILED,
	Error
>;

export const fetchCategoriesStart = withMatch(
	(): FetchCategoriesStart => createAction(CATEGORIES_ACTION_TYPE.SET_FETCH_CATEGORIES_START)
);

export const fetchCategoriesSuccess = withMatch(
	(categories: Category[]): FetchCategoriesSuccess =>
		createAction(CATEGORIES_ACTION_TYPE.SET_FETCH_CATEGORIES_SUCCESS, categories)
);

export const fetchCategoriesFailed = withMatch(
	(error: Error): FetchCategoriesFailed =>
		createAction(CATEGORIES_ACTION_TYPE.SET_FETCH_CATEGORIES_FAILED, error)
);
