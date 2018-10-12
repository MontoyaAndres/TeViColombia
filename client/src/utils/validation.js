import * as Yup from "yup";

export const RegisterValidation = Yup.object().shape({
	name: Yup.string()
		.typeError("Campo incorrecto")
		.required("El campo es obligatorio!"),
	lastname: Yup.string()
		.typeError("Campo incorrecto")
		.required("El campo es obligatorio!"),
	email: Yup.string()
		.email("Correo incorrecto")
		.typeError("Campo incorrecto")
		.required("El campo es obligatorio!"),
	password: Yup.string()
		.typeError("Campo incorrecto")
		.required("El campo es obligatorio!")
});

export const LoginValidation = Yup.object().shape({
	email: Yup.string()
		.email("Correo incorrecto")
		.typeError("Campo incorrecto")
		.required("El campo es obligatorio!"),
	password: Yup.string()
		.typeError("Campo incorrecto")
		.required("El campo es obligatorio!")
});

export const CreateMatrixValidation = Yup.object().shape({
	title: Yup.string()
		.max(100, "Debe ser menor a 100 caracteres")
		.min(5, "Debe ser mayor a 5 caracteres")
		.typeError("Campo incorrecto")
		.required("El campo es obligatorio!"),
	coworkers: Yup.string()
		.typeError("Campo incorrecto")
		.required("El campo es obligatorio!")
});
