import { AnyAction } from 'redux';
import { Category } from './categories.type';
import {
	fetchCategoriesStart,
	fetchCategoriesSuccess,
	fetchCategoriesFailed,
} from './categories.action';

export type CategoriesState = {
	readonly categories: Category[];
	readonly isLoading: boolean;
	readonly error: Error | null;
};

const CATEGORIES_INTIAL_STATE: CategoriesState = {
	categories: [],
	isLoading: false,
	error: null,
};

export const categoreisReducer = (
	state = CATEGORIES_INTIAL_STATE,
	action: AnyAction
): CategoriesState => {
	if (fetchCategoriesStart.match(action)) {
		return {
			...state,
			isLoading: true,
		};
	}
	if (fetchCategoriesSuccess.match(action)) {
		return {
			...state,
			isLoading: false,
			categories: action.payload,
		};
	}
	if (fetchCategoriesFailed.match(action)) {
		return {
			...state,
			isLoading: false,
			error: action.payload,
		};
	}

	return state;
};
