// parts
import { AppThunk } from "../index";

// components
import Toast from "../../components/Toast/toast";

// utils
import { client } from "../../client/client";
import { useHandleError } from "../../utils/handleErrors";

// types
import {
	UsersActionTypes,
	FETCH_USERS_SUCCESS,
	FETCH_USERS_FAILED,
	FETCH_USER_BY_ID_SUCCESS,
	FETCH_USER_BY_ID_FAILED,
	EDIT_USER_FAILED,
	EDIT_USER_SUCCESS,
	CREATE_USER_SUCCESS,
	CREATE_USER_FAILED,
	DELETE_USER_SUCCESS,
	DELETE_USER_FAILED,
	UserOnCreate,
	UserOnUpdateReq,
	User,
} from "./types";

// url
const url = "/users";
const urlDeleteUser = "/users";
const urlCreateUser = "/users";
const urlUpdateUser = "/users";

export function fetchUsersSuccess(users: User[]): UsersActionTypes {
	return {
		type: FETCH_USERS_SUCCESS,
		payload: users,
	};
}

export function fetchUsersFailed(errors: Error): UsersActionTypes {
	return {
		type: FETCH_USERS_FAILED,
		payload: errors,
	};
}

export function createUserSuccess(): UsersActionTypes {
	return {
		type: CREATE_USER_SUCCESS,
	};
}

export function createUserFailed(errors: Error): UsersActionTypes {
	return {
		type: CREATE_USER_FAILED,
		payload: errors,
	};
}

export function fetchUserByIdSuccess(user: User): UsersActionTypes {
	return {
		type: FETCH_USER_BY_ID_SUCCESS,
		payload: user,
	};
}

export function fetchUserByIdFailed(errors: Error): UsersActionTypes {
	return {
		type: FETCH_USER_BY_ID_FAILED,
		payload: errors,
	};
}

export function editUserSuccess(): UsersActionTypes {
	return {
		type: EDIT_USER_SUCCESS,
	};
}

export function editUserFailed(errors: Error): UsersActionTypes {
	return {
		type: EDIT_USER_FAILED,
		payload: errors,
	};
}

export function deleteUserSuccess(): UsersActionTypes {
	return {
		type: DELETE_USER_SUCCESS,
	};
}

export function deleteUserFailed(errors: Error): UsersActionTypes {
	return {
		type: DELETE_USER_FAILED,
		payload: errors,
	};
}



export const fetchUsers = (): AppThunk => async (dispatch) => {
	return client
		.get(`${url}`)
		.then((response) => {
			const data = response.data;
			dispatch(fetchUsersSuccess(data));
		})
		.catch((err) => {
			Toast({
				position: "top-end",
				timer: 5000,
				icon: "error",
				message: err.response
					? err.response.data.message
					: "Ocorreu um problema ao encontrar a lista. Por favor, tente novamente.",
			});
			dispatch(
				fetchUsersFailed(
					err.response
						? err.response.data.message
						: "Ocorreu um problema ao encontrar a lista. Por favor, tente novamente."
				)
			);
			useHandleError(err);
		});
};

 export const updateUser = (user: any, id: number): AppThunk => async(dispatch) => {
   return client
     .put(`${urlUpdateUser}/${id}`, user)
     .then((response) => {
       const data = response.data;

       if(data){
         Toast({
           position: 'top-end',
           timer: 5000,
           icon: 'success',
           message: 'Usuário atualizado com sucesso.'
         });

           dispatch(fetchUsers());
           dispatch(editUserSuccess());
       }
     })
     .catch((err) => {
       Toast({
         position: 'top-end',
         timer: 5000,
         icon: 'error',
         message: err.response ?
         err.response.data.message :
         `Ocorreu um problema ao atualizar o usuário, tente novamente`,
       });
         dispatch(editUserFailed(
           err.response ?
           err.response.data.message :
           'Ocorreu um problema ao atualizar nome, tente novamente',
         ))
       useHandleError(err)
     });
 }

export const createUser = (newUser: UserOnCreate): AppThunk => async (dispatch) => {

  return client
    .post(urlCreateUser, newUser)
    .then((response) => {
      const data = response.data;

      if(data){
        Toast({
          position: 'top-end',
          timer: 5000,
          icon: 'success',
          message: 'Usuário criado com sucesso.'
        });

        dispatch(createUserSuccess());
        dispatch(fetchUsers());
      }
    })
    .catch((err) => {
      Toast({
        position: 'top-end',
        timer: 5000,
        icon: 'error',
        message: err.response ?
        err.response.data.message :
        `Ocorreu um problema ao criar o usuário, tente novamente`,
      });
        dispatch(createUserFailed(
          err.response ?
          err.response.data.message :
          'Ocorreu um problema ao criar o usuário, tente novamente',
        ))

      useHandleError(err)
    });
};

export const deleteUser = (id: number): AppThunk => async (dispatch) => {
  return client
    .delete(`${urlDeleteUser}/${id}` )
    .then((response) => {
      const data = response.status;

      if(data === 200){
		dispatch(fetchUsers());
		Toast({
          position: 'top-end',
          timer: 5000,
          icon: 'success',
          message: 'Usuário removido com sucesso.'
        });
      }
    })
    .catch((err) => {
      const { message } = err.response;
      Toast({
        position: 'top-end',
        timer: 5000,
        icon: 'error',
        message: message ?
        message :
        `Ocorreu um problema ao remover o usuário, tente novamente`,
      });

      useHandleError(err)
    });
};
