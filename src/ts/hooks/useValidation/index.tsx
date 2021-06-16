
import { useState, useEffect, useCallback } from 'react'
import getValidatorErrors from 'ts/utils/getValidationError';
import { ValidationError } from "yup";

interface Errors {
	name: "";
	lastName: "";
	email: "";
}

const useValidation = (values: any, schema: any) => {

   const [errors, setErrors] = useState<Errors>({} as Errors);
   const [hasErrors, setHasErrors] = useState(true);
   let error = {};

   const validate =  useCallback(async () => {
	   try {
		   await schema.validate(values, { abortEarly: false })
		} catch (err) {
			if (err instanceof ValidationError) error = getValidatorErrors(err);
     	}
		 setErrors(error as any)
   }, [schema, values])

   useEffect(() =>
   		setHasErrors(!!errors.email || !!errors.lastName || !!errors.name),
   [errors])


	useEffect(() => {
		validate();
	}, [validate, values]);

	return { errors, hasErrors };
};

export default useValidation;
