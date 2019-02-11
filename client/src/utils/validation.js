import * as Yup from "yup";

const MAX_INT = Number.MAX_SAFE_INTEGER;
const MIN_INT = Number.MIN_SAFE_INTEGER;

export const RegisterValidation = Yup.object().shape({
  name: Yup.string()
    .matches(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*$/, "Ingrese un nombre correcto.")
    .typeError("Campo incorrecto")
    .required("El campo es obligatorio!"),
  lastname: Yup.string()
    .matches(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*$/, "Ingrese un apellido correcto.")
    .typeError("Campo incorrecto.")
    .required("El campo es obligatorio!"),
  email: Yup.string()
    .email("Correo incorrecto")
    .typeError("Campo incorrecto")
    .required("El campo es obligatorio!"),
  telephone: Yup.number()
    .test("is-telephone", "Ingrese un número de teléfono correcto.", value =>
      /^[0][1-9]\d{9}$|^[1-9]\d{9}$/.test(value)
    )
    .typeError("Campo incorrecto.")
    .required("El campo es obligatorio!"),
  identificationDocument: Yup.number()
    .positive("Número de documento de identificación incorrecto.")
    .max(MAX_INT, "Número erróneo.")
    .min(MIN_INT, "Número erróneo.")
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

export const ForgotPasswordValidation = Yup.object().shape({
  newPassword: Yup.string()
    .matches(
      /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,}$/,
      "La contraseña no es segura, debe de tener una letra en mayúscula, dos numeros, tres letras en minúscula como minimo, un signo entre !@#$&* y debe ser igual o mayor a ocho caracteres."
    )
    .typeError("Campo incorrecto")
    .required("El campo es obligatorio!")
});

export const UserConfigurationValidation = Yup.object().shape({
  email: Yup.string()
    .email("Correo incorrecto")
    .typeError("Campo incorrecto")
    .required("El campo es obligatorio!"),
  password: Yup.string().typeError("Campo incorrecto"),
  newPassword: Yup.string()
    .matches(
      /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,}$/,
      "La contraseña no es segura, debe de tener una letra en mayúscula, dos numeros, tres letras en minúscula como minimo, un signo entre !@#$&* y debe ser igual o mayor a ocho caracteres."
    )
    .typeError("Campo incorrecto")
});

export const GeneralInformationValidation = Yup.object().shape({
  description: Yup.string()
    .max(100, "La descripción no debe de tener más de 100 caracteres.")
    .typeError("Campo incorrecto."),
  identificationDocument: Yup.number()
    .positive("Número de documento de identificación incorrecto.")
    .max(MAX_INT, "Número erróneo.")
    .min(MIN_INT, "Número erróneo.")
    .typeError("Campo incorrecto.")
    .required("El campo es obligatorio!"),
  telephone: Yup.number()
    .test("is-telephone", "Ingrese un número de teléfono correcto.", value =>
      /^[0][1-9]\d{9}$|^[1-9]\d{9}$/.test(value)
    )
    .typeError("Campo incorrecto.")
    .required("El campo es obligatorio!"),
  linkedin: Yup.string()
    .ensure()
    .matches(/https:\/\/([a-z]{2,3}[.])?linkedin[.]com\/.*/, {
      excludeEmptyString: true,
      message: "Perfil de linkedin incorrecto."
    })
    .typeError("Campo incorrecto"),
  skype: Yup.string()
    .ensure()
    .matches(/live:.+/, {
      excludeEmptyString: true,
      message: "Usuario de skype incorrecto."
    })
    .typeError("Campo incorrecto"),
  website: Yup.string()
    .ensure()
    .url("Sitio web incorrecto.")
    .typeError("Campo incorrecto")
});
