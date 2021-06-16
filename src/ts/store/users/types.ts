export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
export const FETCH_USERS_FAILED = "FETCH_USERS_FAILED";
export const FETCH_USER_BY_ID_SUCCESS = "FETCH_USER_BY_ID_SUCCESS";
export const FETCH_USER_BY_ID_FAILED = "FETCH_USER_BY_ID_FAILED";
export const EDIT_USER_FAILED = "EDIT_USER_FAILED";
export const EDIT_USER_SUCCESS = "EDIT_USER_SUCCESS";
export const CREATE_USER_SUCCESS = "CREATE_USER_SUCCESS";
export const CREATE_USER_FAILED = "CREATE_USER_FAILED";
export const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS";
export const DELETE_USER_FAILED = "DELETE_USER_FAILED";

export interface User {
	firstName: string;
	lastName: string;
	email: string;
	updatedAt: string;
	createdAt: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UsersFetchErrors {}

export interface dataOrder {
	sortOrder: string;
	sortParam: string;
	page?: number;
	size?: number;
}

export interface UsersState {
	count: number;
	limit: number;
	page: number;
	totalPages: number;
	users: User[];
	selected: User;
	errors: unknown;
}

interface fetchUsersAction {
	type: typeof FETCH_USERS_SUCCESS;
	payload: User[];
}
interface fetchUsersFailedAction {
	type: typeof FETCH_USERS_FAILED;
	payload: UsersFetchErrors;
}
interface fetchUserByIdAction {
	type: typeof FETCH_USER_BY_ID_SUCCESS;
	payload: User;
}
interface fetchUserByIdFailedAction {
	type: typeof FETCH_USER_BY_ID_FAILED;
	payload: UsersFetchErrors;
}
interface editUserAction {
	type: typeof EDIT_USER_SUCCESS;
}
interface editUserFailedAction {
	type: typeof EDIT_USER_FAILED;
	payload: UsersFetchErrors;
}
interface deleteUserAction {
	type: typeof DELETE_USER_SUCCESS;
}
interface deleteUserFailedAction {
	type: typeof DELETE_USER_FAILED;
	payload: UsersFetchErrors;
}

interface createUserAction {
	type: typeof CREATE_USER_SUCCESS;
}
interface createUserFailedAction {
	type: typeof CREATE_USER_FAILED;
	payload: UsersFetchErrors;
}
export interface UserOnChangePassword {
	username: string;
	oldPassword: string;
	newPassword: string;
	accessToken: string;
}

export interface UserOnManagementActiveDisable {
	username: string;
}

export interface Field {
	Name: string;
	Value?: string;
}

export interface UserOnChangeName {
	username: string;
	userAttributes: Field[];
}
export interface UserOnCreate {
	firstName: string;
	lastName: string;
	email: string;
}

export interface UserOnUpdateForm {
	username: string;
	name: string;
	transporterId?: string;
	userType: string;
	userAttributes: Field[];
}

export interface UserOnUpdateReq {
	username: string;
	userAttributes: Field[];
}

export type UsersActionTypes =
	| fetchUsersAction
	| fetchUsersFailedAction
	| fetchUserByIdFailedAction
	| fetchUserByIdAction
	| editUserAction
	| editUserFailedAction
	| createUserAction
	| createUserFailedAction
	| deleteUserAction
	| deleteUserFailedAction;
