import { takeLatest, all, call, put } from 'redux-saga/effects';

import { CATEGORIES_ACTION_TYPE } from './categories.type';
import { fetchCategoriesSuccess, fetchCategoriesFailed } from './categories.action';
import { getCategoriesAndDocuments } from '../../utils/firebase.utils';

function* fetchCategories() {
	try {
		const categories = yield call(getCategoriesAndDocuments);
		yield put(fetchCategoriesSuccess(categories));
	} catch (error) {
		yield put(fetchCategoriesFailed(error));
	}
}

function* onFetchCategoriesStart() {
	yield takeLatest(CATEGORIES_ACTION_TYPE.SET_FETCH_CATEGORIES_START, fetchCategories);
}

export function* categoriesSaga() {
	yield all([call(onFetchCategoriesStart)]);
}
