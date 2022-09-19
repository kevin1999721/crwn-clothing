import { initializeApp, FirebaseError } from 'firebase/app';
import {
	getAuth,
	signInWithPopup,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	GoogleAuthProvider,
	signOut,
	onAuthStateChanged,
	User,
	UserCredential,
} from 'firebase/auth';
import {
	getFirestore,
	doc,
	getDoc,
	setDoc,
	collection,
	getDocs,
	writeBatch,
	query,
	QueryDocumentSnapshot,
} from 'firebase/firestore';

import { Category } from '../store/categories/categories.type';

const firebaseConfig = {
	apiKey: 'AIzaSyCL_UVsreJb60ytq60zx1zDZxwdpPhZuQI',
	authDomain: 'crwn-clothing-db-36bf2.firebaseapp.com',
	projectId: 'crwn-clothing-db-36bf2',
	storageBucket: 'crwn-clothing-db-36bf2.appspot.com',
	messagingSenderId: '549112114784',
	appId: '1:549112114784:web:72f910056c17e7c3381d05',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export const logInWithGoogle = async (): Promise<UserCredential | undefined> => {
	try {
		const response = await signInWithPopup(auth, googleProvider);
		return response;
	} catch (error) {
		console.log('Error Code:', error);
		console.log('Error Message:', error);
	}
};

export const logInWithEnailAndPassword = async (
	email: string,
	password: string
): Promise<UserCredential | undefined> => {
	if (!email || !password) return;

	try {
		const response = await signInWithEmailAndPassword(auth, email, password);
		return response;
	} catch (error) {
		if (error instanceof FirebaseError) {
			switch (error.code) {
				case 'auth/user-not-found':
					alert('Email was not signed up !');
					break;
				case 'auth/wrong-password':
					alert('Incorrect password for email !');
					break;
				default:
					console.log('Sign in error :', error.code);
					break;
			}
		}
	}
};

export const signUpWithEmailAndPassword = async (
	email: string,
	password: string
): Promise<void | UserCredential> => {
	if (!email || !password) return;

	try {
		const response = await createUserWithEmailAndPassword(auth, email, password);
		return response;
	} catch (error) {
		if (error instanceof FirebaseError) {
			if (error.code === 'auth/email-already-in-use') {
				alert('Cannot create user, email already in use');
			} else {
				console.log('user creation encountered an error', error);
			}
		}
	}
};

type ObjectsToAdd = {
	title: string;
};

export const createCollectionAndDocuments = async <T extends ObjectsToAdd>(
	collectionKey: string,
	objectsToAdd: T[]
): Promise<void> => {
	const batch = writeBatch(db);
	const collectionRef = collection(db, collectionKey);

	objectsToAdd.forEach(object => {
		const docRef = doc(collectionRef, object.title.toLowerCase());
		batch.set(docRef, object);
	});

	await batch.commit();
	console.log('batch done!');
};

export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
	const collectionRef = collection(db, 'categories');
	const q = query(collectionRef);

	const querySnapshot = await getDocs(q);

	const categoriesMap = querySnapshot.docs.map(docSnapshot => docSnapshot.data());

	return categoriesMap as Category[];
};

export type AdditionalInformation = {
	displayName?: string;
};

export type UserData = {
	dispalyName: string;
	email: string;
	createAt: Date;
};

export const createUserDoc = async (
	userAuth: User,
	additionalInformation = {} as AdditionalInformation
): Promise<QueryDocumentSnapshot<UserData> | void> => {
	if (!userAuth) return;

	const userDocRef = doc(db, 'users', userAuth.uid);
	const docSnapShot = await getDoc(userDocRef);

	if (!docSnapShot.exists()) {
		const { displayName, email } = userAuth;
		const createAt = new Date();

		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createAt,
				...additionalInformation,
			});

			const currentDocSnapShot = await getDoc(userDocRef);
			return currentDocSnapShot as QueryDocumentSnapshot<UserData>;
		} catch (error) {
			console.log('createUserDoc Error :', error);
		}
	}

	return docSnapShot as QueryDocumentSnapshot<UserData>;
};

export const userSignOut = () => signOut(auth);

export const getCurrentUser = (): Promise<User | null> => {
	return new Promise(resolve => {
		const unSubscribe = onAuthStateChanged(auth, user => {
			unSubscribe();
			resolve(user);
		});
	});
};
