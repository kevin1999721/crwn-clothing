import { CATEGORIES_ACTION_TYPE } from './categories.type';
import { createAction } from '../../utils/reducer.utils';

export const setCategories = categories => createAction(CATEGORIES_ACTION_TYPE.SET_CATEGORIES, categories);
