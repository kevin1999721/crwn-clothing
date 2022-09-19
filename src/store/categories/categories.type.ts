export enum CATEGORIES_ACTION_TYPE {
	SET_FETCH_CATEGORIES_START = 'categories/SET_FETCH_CATEGORIES_START',
	SET_FETCH_CATEGORIES_SUCCESS = 'categories/SET_FETCH_CATEGORIES_SUCCESS',
	SET_FETCH_CATEGORIES_FAILED = 'categories/SET_FETCH_CATEGORIES_FAILED',
}

export type CategoryItem = {
	id: number;
	imageUrl: string;
	name: string;
	price: number;
};

export type Category = {
	title: string;
	items: CategoryItem[];
};

export type CategoryMap = {
	[key: string]: CategoryItem[];
};
