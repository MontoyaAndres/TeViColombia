import * as Yup from "yup";

export const RegisterValidation = Yup.object().shape({
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
		.typeError("Campo incorrecto"),
	password: Yup.string().typeError("Campo incorrecto")
});
