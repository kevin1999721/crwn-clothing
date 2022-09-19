import { USER_ACTION_TYPE } from './user.type';
import { createAction, Action, ActionWithPayload, withMatch } from '../../utils/reducer.utils';
import { UserData, AdditionalInformation } from '../../utils/firebase.utils';

export type CheckUserSession = Action<USER_ACTION_TYPE.CHECK_USER_SESSION>;

export type EmailSignInStart = ActionWithPayload<
	USER_ACTION_TYPE.EMAIL_SIGN_IN_START,
	{ email: string; password: string }
>;

export type GoogleSignInStart = Action<USER_ACTION_TYPE.GOOGLE_SIGN_IN_START>;

export type SignInSuccess = ActionWithPayload<USER_ACTION_TYPE.SIGN_IN_SUCCESS, UserData>;

export type SignInFailed = ActionWithPayload<USER_ACTION_TYPE.SIGN_IN_FAILED, Error>;

export type SignUpStart = ActionWithPayload<
	USER_ACTION_TYPE.SIGN_UP_START,
	{ email: string; password: string; additionalInformation: AdditionalInformation }
>;

export type SignUpSuccess = ActionWithPayload<
	USER_ACTION_TYPE.SIGN_UP_SUCCESS,
	{ email: string; password: string; additionalInformation: AdditionalInformation }
>;

export type SignUpFailed = ActionWithPayload<USER_ACTION_TYPE.SIGN_UP_FAILED, Error>;

export type SignOutStart = Action<USER_ACTION_TYPE.SIGN_OUT_START>;

export type SignOutSuccess = Action<USER_ACTION_TYPE.SIGN_OUT_SUCCESS>;

export type SignOutFailed = ActionWithPayload<USER_ACTION_TYPE.SIGN_OUT_FAILED, Error>;

export const checkUserSession = withMatch(
	(): CheckUserSession => createAction(USER_ACTION_TYPE.CHECK_USER_SESSION)
);

export const emailSignInStart = withMatch(
	(email: string, password: string): EmailSignInStart =>
		createAction(USER_ACTION_TYPE.EMAIL_SIGN_IN_START, { email, password })
);

export const googleSignInStart = withMatch(
	(): GoogleSignInStart => createAction(USER_ACTION_TYPE.GOOGLE_SIGN_IN_START)
);

export const signInSuccess = withMatch(
	(user: UserData & { id: string }): SignInSuccess =>
		createAction(USER_ACTION_TYPE.SIGN_IN_SUCCESS, user)
);

export const signInFailed = withMatch(
	(error: Error): SignInFailed => createAction(USER_ACTION_TYPE.SIGN_IN_FAILED, error)
);

export const signUpStart = withMatch(
	(email: string, password: string, additionalInformation: AdditionalInformation): SignUpStart =>
		createAction(USER_ACTION_TYPE.SIGN_UP_START, { email, password, additionalInformation })
);

export const signUpSuccess = withMatch(
	(email: string, password: string, additionalInformation: AdditionalInformation): SignUpSuccess =>
		createAction(USER_ACTION_TYPE.SIGN_UP_SUCCESS, { email, password, additionalInformation })
);

export const signUpFailed = withMatch(
	(error: Error): SignUpFailed => createAction(USER_ACTION_TYPE.SIGN_UP_FAILED, error)
);

export const signOutStart = withMatch(
	(): SignOutStart => createAction(USER_ACTION_TYPE.SIGN_OUT_START)
);

export const signOutSuccess = withMatch(
	(): SignOutSuccess => createAction(USER_ACTION_TYPE.SIGN_OUT_SUCCESS)
);

export const signOutFailed = withMatch(
	(error: Error): SignOutFailed => createAction(USER_ACTION_TYPE.SIGN_OUT_FAILED, error)
);
