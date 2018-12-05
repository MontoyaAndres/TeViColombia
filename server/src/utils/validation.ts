import * as Yup from "yup";

export const RegisterValidation = Yup.object().shape({
  name: Yup.string()
    .matches(/^[a-zA-Z_ ]*$/, "Ingrese un nombre correcto.")
    .typeError("Campo incorrecto")
    .required("El campo es obligatorio!"),
  lastname: Yup.string()
    .matches(/^[a-zA-Z_ ]*$/, "Ingrese un apellido correcto.")
    .typeError("Campo incorrecto.")
    .required("El campo es obligatorio!"),
  email: Yup.string()
    .email("Correo incorrecto")
    .typeError("Campo incorrecto")
    .required("El campo es obligatorio!"),
  telephone: Yup.string()
    .matches(
      /^[0][1-9]\d{9}$|^[1-9]\d{9}$/,
      "Ingrese un número de teléfono correcto."
    )
    .typeError("Campo incorrecto.")
    .required("El campo es obligatorio!"),
  identificationDocument: Yup.number()
    .positive("Número de documento de identificación incorrecto.")
    .integer()
    .typeError("Campo incorrecto.")
    .required("El campo es obligatorio!"),
  password: Yup.string()
    .matches(
      /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,}$/,
      "La contraseña no es segura, debe de tener una letra en mayúscula, dos numeros, tres letras en minúscula como minimo, un signo entre !@#$&* y debe ser igual o mayor a ocho caracteres."
    )
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
