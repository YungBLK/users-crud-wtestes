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
	name: "",
	lastName: "",
	email: "",
};


const UsersCrudForm = (props: PropsInterface) => {
	// states
	const [form, setForm] = useState(initialState);

	// effects
	const { errors, hasErrors } = useValidation(form, FormValidations) as any;

	const setInput = useCallback(
		(newValue: any) => setForm((value: any) => ({ ...value, ...newValue })),
		[setForm]
	);

	const handleSubmit = useCallback((event, type, formValues) => {
		event.preventDefault();
		// type === "register" ? useAddUser(formValues) : EditUser(formValues);
		setForm(initialState);
	}, [])

	return (
		<>
			<h3>Cadastro de usuário</h3>
			<form
				onSubmit={(event) => handleSubmit(event, props.type, form)}
			>
				<div className="form-group">
					<Input
						value={form.name}
						placeholder="Nome"
						name="name"
						onChange={(e: any) => setInput({ name: e.target.value })}
						label="Nome"
						error={errors.name}
					/>
					<Input
						placeholder="Sobrenome"
						value={form.lastName}
						name="lastName"
						onChange={(e: any) => setInput({ lastName: e.target.value })}
						label="Sobrenome"
						error={errors.lastName}
					/>
					<Input
						placeholder="E-mail"
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
						className={hasErrors && `${styles.disabled}`}
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
