import * as yup from "yup";

export const FormValidations = yup.object().shape({
	name: yup.string().required("O nome é obrigatório"),
	lastName: yup.string().required("O sobrenome é obrigatório"),
	email: yup
		.string()
		.email("Formato de e-mail inválido!")
		.required("E-mail é obrigatório"),
});
