import { createContext, useState, useEffect } from 'react';

import { getCategoriesAndDocuments } from '../utils/firebase.utils';

export const categoriesContext = createContext({
	categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
	const [categoriesMap, setcategoriesMap] = useState({});

	useEffect(() => {
		const getCategoriesMap = async () => {
			const categoriesMap = await getCategoriesAndDocuments();
			setcategoriesMap(categoriesMap);
		};

		getCategoriesMap();
	}, []);

	const value = { categoriesMap };
	return <categoriesContext.Provider value={value}>{children}</categoriesContext.Provider>;
};
