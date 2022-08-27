import { takeLatest, all, call, put } from 'redux-saga/effects';

import { USER_ACTION_TYPE } from './user.type';
import {
	signInSuccess,
	signInFailed,
	signUpSuccess,
	signUpFailed,
	signOutSuccess,
	signOutFailed,
} from './user.action';
import {
	getCurrentUser,
	createUserDoc,
	logInWithGoogle,
	logInWithEnailAndPassword,
	signUpWithEmailAndPassword,
	userSignOut,
} from '../../utils/firebase.utils';

function* getUserSnapShot(user, additionalInformation = {}) {
	try {
		const userSnapShot = yield call(createUserDoc, user, additionalInformation);
		yield put(
			signInSuccess({
				id: userSnapShot.id,
				...userSnapShot.data(),
			})
		);
	} catch (error) {
		yield put(signInFailed(error));
	}
}

function* checkCurrentUserStart() {
	try {
		const user = yield call(getCurrentUser);
		if (!user) return;

		yield call(getUserSnapShot, user);
	} catch (error) {
		yield put(signInFailed(error));
	}
}

function* signInWithGoogle() {
	try {
		const { user } = yield call(logInWithGoogle);
		if (!user) return;

		yield call(getUserSnapShot, user);
	} catch (error) {
		yield put(signInFailed(error));
	}
}

function* signInWithEmail({ payload: { email, password } }) {
	try {
		const { user } = yield call(logInWithEnailAndPassword, email, password);
		if (!user) return;

		yield call(getUserSnapShot, user);
	} catch (error) {
		yield put(signInFailed(error));
	}
}

function* signUpWithEmail({ payload: { email, password, additionalInformation } }) {
	try {
		const { user } = yield call(signUpWithEmailAndPassword, email, password, additionalInformation);
		if (!user) return;

		yield put(signUpSuccess(email, password, additionalInformation));
	} catch (error) {
		yield put(signUpFailed(error));
	}
}

function* signInAfterSignUp({ payload: { email, password, additionalInformation } }) {
	try {
		const { user } = yield call(logInWithEnailAndPassword, email, password);
		if (!user) return;

		yield call(getUserSnapShot, user, additionalInformation);
	} catch (error) {
		yield put(signInFailed(error));
	}
}

function* signOut() {
	try {
		yield call(userSignOut);
		yield put(signOutSuccess());
	} catch (error) {
		yield put(signOutFailed(error));
	}
}

function* onCheckUserSession() {
	yield takeLatest(USER_ACTION_TYPE.CHECK_USER_SESSION, checkCurrentUserStart);
}

function* onGoogleSignInStart() {
	yield takeLatest(USER_ACTION_TYPE.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

function* onEmailSignInStart() {
	yield takeLatest(USER_ACTION_TYPE.EMAIL_SIGN_IN_START, signInWithEmail);
}

function* onSignUpStart() {
	yield takeLatest(USER_ACTION_TYPE.SIGN_UP_START, signUpWithEmail);
}

function* onAfterSignUpSuccess() {
	yield takeLatest(USER_ACTION_TYPE.SIGN_UP_SUCCESS, signInAfterSignUp);
}

function* onSignOutStart() {
	yield takeLatest(USER_ACTION_TYPE.SIGN_OUT_START, signOut);
}

export function* userSaga() {
	yield all([
		call(onCheckUserSession),
		call(onGoogleSignInStart),
		call(onEmailSignInStart),
		call(onSignUpStart),
		call(onAfterSignUpSuccess),
		call(onSignOutStart),
	]);
}
