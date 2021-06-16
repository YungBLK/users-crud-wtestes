/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Store users
import * as actions from "../../store/users/actions";
import * as types from "../../store/users/types";
import { RootState } from "../../store";

export const useRetrieveUsers = () => {
	// -------------------------------------------------
	// Properties
	// -------------------------------------------------

	// hooks
	const dispatch = useDispatch();

	// store
	const list = useSelector((store: RootState) => store.users);

	// -------------------------------------------------
	// Effects
	// -------------------------------------------------

	useEffect(() => {
		dispatch(actions.fetchUsers());
	}, [dispatch]);

	// -------------------------------------------------
	// Response
	// -------------------------------------------------

	return list;
};

export const useAddUser = (user: any) => {};

export const useRemoveUser = () => {
    // -------------------------------------------------
    // Callbacks
    // -------------------------------------------------

    // hooks
    const dispatch = useDispatch();


    const removeUserFunction = React.useCallback((userId: number) => {

      dispatch(actions.deleteUser(userId));

      return true;
    }, [dispatch]);


    return removeUserFunction;
};

export const EditUser = (user: any) => {};
