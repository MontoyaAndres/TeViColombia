import * as Yup from "yup";

export const RegisterValidation = Yup.object().shape({
  name: Yup.string()
    .typeError("Campo incorrecto")
    .required("El campo es obligatorio!"),
  lastname: Yup.string()
    .typeError("Campo incorrecto.")
    .required("El campo es obligatorio!"),
  email: Yup.string()
    .email("Correo incorrecto")
    .typeError("Campo incorrecto")
    .required("El campo es obligatorio!"),
  telephone: Yup.string()
    .matches(/^[0][1-9]\d{9}$|^[1-9]\d{9}$/, "Ingrese un teléfono correcto.")
    .typeError("Campo incorrecto.")
    .required("El campo es obligatorio!"),
  identificationDocument: Yup.number()
    .integer("Número de documento de identificación incorrecto.")
    .typeError("Campo incorrecto.")
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

export const UserConfiguration = Yup.object().shape({
  email: Yup.string()
    .email("Correo incorrecto")
    .typeError("Campo incorrecto")
    .required("El campo es obligatorio!"),
  oldPassword: Yup.string().typeError("Campo incorrecto"),
  newPassword: Yup.string().typeError("Campo incorrecto")
});
