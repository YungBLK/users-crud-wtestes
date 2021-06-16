// packages
import React, { useCallback, useState } from "react";

// parts
import Input from "ts/components/input/input";
import { FormValidations } from "ts/utils/validation";

// styles
import styles from "../../../../style.module.scss";

// hooks
import useValidation from "ts/hooks/useValidation";
import { useAddUser, EditUser } from "../../../hooks/users";

// types
import { PropsInterface } from "./types";

// state
const initialState = {
	firstName: "",
	lastName: "",
	email: "",
};


const UsersCrudForm = (props: PropsInterface) => {
	// states
	const [form, setForm] = useState(initialState);

	// hooks
	const addUser = useAddUser();

	// effects
	const { errors, hasErrors } = useValidation(form, FormValidations) as any;

	const setInput = useCallback(
		(newValue: any) => setForm((value: any) => ({ ...value, ...newValue })),
		[setForm]
	);

	const handleSubmit = useCallback((event, type, formValues) => {
		console.log("formValues", formValues, "type", type);
		event.preventDefault();
		type === "register" ? addUser(formValues) : EditUser(formValues);
		setForm(initialState);
		props.closeModal();
	}, [addUser, props])

	return (
		<>
			<h3>Cadastro de usuário</h3>
			<form
				onSubmit={(event) => handleSubmit(event, props.type, form)}
			>
				<div className="form-group">
					<Input
						value={form.firstName}
						placeholder="Ex.: Carlos."
						name="name"
						onChange={(e: any) => setInput({ firstName: e.target.value })}
						label="Nome"
						error={errors.firstName}
					/>
					<Input
						placeholder="Ex.: Alberto."
						value={form.lastName}
						name="lastName"
						onChange={(e: any) => setInput({ lastName: e.target.value })}
						label="Sobrenome"
						error={errors.lastName}
					/>
					<Input
						placeholder="Ex.: email@email.com"
						value={form.email}
						name="email"
						onChange={(e: any) => setInput({ email: e.target.value })}
						label="E-mail"
						error={errors.email}
					/>
				</div>
				<div className={styles.center}>
					<button
						type="submit"
						className={hasErrors ? `btn ${styles.disabled}` : `btn btn-primary`}
						disabled={hasErrors}
					>
						Salvar
					</button>
				</div>
			</form>
		</>
	);
};

export default UsersCrudForm;
