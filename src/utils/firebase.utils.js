import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signOut, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, collection, getDocs, writeBatch, query } from 'firebase/firestore';

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

export const logInWithGoogle = async () => {
	try {
		const response = await signInWithPopup(auth, googleProvider);
		console.log(response);
	} catch (error) {
		console.log('Error Code:', error.code);
		console.log('Error Message:', error.message);
	}
};

export const logInWithEnailAndPassword = async (email, password) => {
	if (!email || !password) return;

	try {
		const response = await signInWithEmailAndPassword(auth, email, password);
		console.log(response);
	} catch (error) {
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
};

export const signUpWithEmailAndPassword = async (email, password, additionalInformation = {}) => {
	if (!email || !password) return;

	try {
		const response = await createUserWithEmailAndPassword(auth, email, password);
		await createUserDoc(response.user, additionalInformation);
	} catch (error) {
		if (error.code === 'auth/email-already-in-use') {
			alert('Cannot create user, email already in use');
		} else {
			console.log('user creation encountered an error', error);
		}
	}
};

export const createCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
	const batch = writeBatch(db);
	const collectionRef = collection(db, collectionKey);

	objectsToAdd.forEach(object => {
		const docRef = doc(collectionRef, object.title.toLowerCase());
		batch.set(docRef, object);
	});

	await batch.commit();
	console.log('batch done!');
};

export const getCategoriesAndDocuments = async () => {
	const collectionRef = collection(db, 'categories');
	const q = query(collectionRef);

	const querySnapshot = await getDocs(q);

	const categoriesMap = querySnapshot.docs.map(docSnapshot => docSnapshot.data());

	return categoriesMap;
};

getCategoriesAndDocuments();

export const createUserDoc = async (userAuth, additionalInformation = {}) => {
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
		} catch (error) {
			console.log('createUserDoc Error :', error);
		}
	}
};

export const userSignOut = () => signOut(auth);

export const userStateListener = callBack => onAuthStateChanged(auth, callBack);
