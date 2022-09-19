import { takeLatest, all, call, put } from 'typed-redux-saga/macro';

import { User } from 'firebase/auth';

import { USER_ACTION_TYPE } from './user.type';
import {
	signInSuccess,
	signInFailed,
	signUpSuccess,
	signUpFailed,
	signOutSuccess,
	signOutFailed,
	EmailSignInStart,
	SignUpStart,
	SignUpSuccess,
} from './user.action';
import {
	getCurrentUser,
	createUserDoc,
	logInWithGoogle,
	logInWithEnailAndPassword,
	signUpWithEmailAndPassword,
	userSignOut,
	AdditionalInformation,
} from '../../utils/firebase.utils';

function* getUserSnapShot(user: User, additionalInformation?: AdditionalInformation) {
	try {
		const userSnapShot = yield* call(createUserDoc, user, additionalInformation);

		if (userSnapShot) {
			yield* put(
				signInSuccess({
					id: userSnapShot.id,
					...userSnapShot.data(),
				})
			);
		}
	} catch (error) {
		yield* put(signInFailed(error as Error));
	}
}

function* checkCurrentUserStart() {
	try {
		const user = yield* call(getCurrentUser);

		if (user) {
			yield* call(getUserSnapShot, user);
		}
	} catch (error) {
		yield* put(signInFailed(error as Error));
	}
}

function* signInWithGoogle() {
	try {
		const UserCredential = yield* call(logInWithGoogle);

		if (UserCredential) {
			yield* call(getUserSnapShot, UserCredential.user);
		}
	} catch (error) {
		yield* put(signInFailed(error as Error));
	}
}

function* signInWithEmail({ payload: { email, password } }: EmailSignInStart) {
	try {
		const UserCredential = yield* call(logInWithEnailAndPassword, email, password);

		if (UserCredential) {
			yield* call(getUserSnapShot, UserCredential.user);
		}
	} catch (error) {
		yield* put(signInFailed(error as Error));
	}
}

function* signUpWithEmail({ payload: { email, password, additionalInformation } }: SignUpStart) {
	try {
		const UserCredential = yield* call(
			signUpWithEmailAndPassword,
			email,
			password,
			additionalInformation
		);

		if (UserCredential) {
			yield* put(signUpSuccess(email, password, additionalInformation));
		}
	} catch (error) {
		yield* put(signUpFailed(error as Error));
	}
}

function* signInAfterSignUp({
	payload: { email, password, additionalInformation },
}: SignUpSuccess) {
	try {
		const UserCredential = yield* call(logInWithEnailAndPassword, email, password);
		if (UserCredential) {
			yield* call(getUserSnapShot, UserCredential.user, additionalInformation);
		}
	} catch (error) {
		yield* put(signInFailed(error as Error));
	}
}

function* signOut() {
	try {
		yield* call(userSignOut);
		yield* put(signOutSuccess());
	} catch (error) {
		yield* put(signOutFailed(error as Error));
	}
}

function* onCheckUserSession() {
	yield* takeLatest(USER_ACTION_TYPE.CHECK_USER_SESSION, checkCurrentUserStart);
}

function* onGoogleSignInStart() {
	yield* takeLatest(USER_ACTION_TYPE.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

function* onEmailSignInStart() {
	yield* takeLatest(USER_ACTION_TYPE.EMAIL_SIGN_IN_START, signInWithEmail);
}

function* onSignUpStart() {
	yield* takeLatest(USER_ACTION_TYPE.SIGN_UP_START, signUpWithEmail);
}

function* onAfterSignUpSuccess() {
	yield* takeLatest(USER_ACTION_TYPE.SIGN_UP_SUCCESS, signInAfterSignUp);
}

function* onSignOutStart() {
	yield* takeLatest(USER_ACTION_TYPE.SIGN_OUT_START, signOut);
}

export function* userSaga() {
	yield* all([
		call(onCheckUserSession),
		call(onGoogleSignInStart),
		call(onEmailSignInStart),
		call(onSignUpStart),
		call(onAfterSignUpSuccess),
		call(onSignOutStart),
	]);
}
