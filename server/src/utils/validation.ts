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
      /\w{6,}[1-9]/.test(value)
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
      /(.+?){8,}[A-Za-z1-9]?/,
      "La contraseña debe de tener más de 8 caracteres entre letras y numeros."
    )
    .typeError("Campo incorrecto")
    .required("El campo es obligatorio!")
});

export const RegisterBusinessValidation = Yup.object().shape({
  name: Yup.string()
    .matches(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*$/, "Ingrese un nombre correcto.")
    .typeError("Campo incorrecto")
    .required("El campo es obligatorio!"),
  telephone: Yup.number()
    .test("is-telephone", "Ingrese un número de teléfono correcto.", value =>
      /\w{6,}[1-9]/.test(value)
    )
    .typeError("Campo incorrecto.")
    .required("El campo es obligatorio!"),
  email: Yup.string()
    .email("Correo incorrecto")
    .typeError("Campo incorrecto")
    .required("El campo es obligatorio!"),
  password: Yup.string()
    .matches(
      /(.+?){8,}[A-Za-z1-9]?/,
      "La contraseña debe de tener más de 8 caracteres entre letras y numeros."
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
      /(.+?){8,}[A-Za-z1-9]?/,
      "La contraseña debe de tener más de 8 caracteres entre letras y numeros."
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
      /(.+?){8,}[A-Za-z1-9]?/,
      "La contraseña debe de tener más de 8 caracteres entre letras y numeros."
    )
    .typeError("Campo incorrecto")
});

export const GeneralInformationValidation = Yup.object().shape({
  name: Yup.string()
    .matches(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*$/, "Ingrese un nombre correcto.")
    .typeError("Campo incorrecto")
    .required("El campo es obligatorio!"),
  lastname: Yup.string()
    .matches(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*$/, "Ingrese un apellido correcto.")
    .typeError("Campo incorrecto.")
    .required("El campo es obligatorio!"),
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
      /\w{6,}[1-9]/.test(value)
    )
    .typeError("Campo incorrecto.")
    .required("El campo es obligatorio!"),
  telephone2: Yup.number()
    .test(
      "is-telephone2",
      "Ingrese un número de teléfono correcto.",
      value => /\w{6,}[0-9]/.test(value) || !value
    )
    .typeError("Campo incorrecto."),
  website: Yup.string()
    .ensure()
    .url("Sitio web incorrecto.")
    .typeError("Campo incorrecto")
});

export const GeneralInformationBusinessValidation = Yup.object().shape({
  name: Yup.string()
    .matches(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*$/, "Ingrese un nombre correcto.")
    .typeError("Campo incorrecto")
    .required("El campo es obligatorio!"),
  description: Yup.string()
    .max(100, "La descripción no debe de tener más de 100 caracteres.")
    .typeError("Campo incorrecto."),
  telephone: Yup.number()
    .test("is-telephone", "Ingrese un número de teléfono correcto.", value =>
      /\w{6,}[1-9]/.test(value)
    )
    .typeError("Campo incorrecto.")
    .required("El campo es obligatorio!"),
  telephone2: Yup.number()
    .test(
      "is-telephone2",
      "Ingrese un número de teléfono correcto.",
      value => /\w{6,}[0-9]/.test(value) || !value
    )
    .typeError("Campo incorrecto."),
  website: Yup.string()
    .ensure()
    .url("Sitio web incorrecto.")
    .typeError("Campo incorrecto")
});

export const EmployValidation = Yup.object().shape({
  minExperience: Yup.number()
    .max(100, "El número no puede ser mayor a 100.")
    .typeError("Campo incorrecto.")
    .required("El campo es obligatorio!")
});
