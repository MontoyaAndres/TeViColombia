import * as nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

const sendEmailTemplate = (
  title: string,
  message: string,
  url?: string,
  button?: string
) => `
<html>
  <body>
  <section style="text-align: center">
    <h2 style="color: #626262; font-weight: bold;">${title}</h2>
    <p style="color: #525252; font-weight: 400; font-size: 1.25rem; padding: 10px;">${message}</p>
    ${
      url
        ? "<a style='background-color: #00d1b2; padding: 10px; border-radius: 10px; color: white; font-weight: 400; font-size: 1.25rem; text-decoration: none;' href='" +
          url +
          "'>" +
          button +
          "</a>"
        : ""
    }
  </section>
  </body>
</html>
`;

export const sendConfirmEmailLink = async (recipient: string, url: string) => {
  transporter.sendMail({
    to: recipient,
    subject: "Confirmación Te Vi Colombia",
    html: sendEmailTemplate(
      "Confirmación Te Vi Colombia.",
      "Para confirmar que el correo electrónico que ha ingresado en Te Vi Colombia es correcto y poder ingresar con normalidad, de clic en Confirmar correo. Si recibio este correo por error, por favor eliminarlo.",
      url,
      "Confirmar correo"
    )
  });
};

export const sendForgotPasswordEmailLink = async (
  recipient: string,
  url: string
) => {
  transporter.sendMail({
    to: recipient,
    subject: "Cambio de contraseña Te Vi Colombia",
    html: sendEmailTemplate(
      "Cambio de contraseña Te Vi Colombia",
      "Para confirmar que el correo electrónico que ha ingresado es correcto y el cambio de contraseña sea efectuado en la plataforma Te Vi Colombia con normalidad, de clic en Cambiar contraseña. Si recibio este correo por error, por favor eliminarlo.",
      url,
      "Cambiar contraseña"
    )
  });
};

export const sendFeedbackEmail = async (
  recipient: string,
  name: string,
  message: string
) => {
  transporter.sendMail({
    to: recipient,
    subject: `${name} ha hecho una observación`,
    html: sendEmailTemplate(`Observación de ${name}.`, message)
  });
};

export const sendApplyEmployEmail = async (
  recipient: string,
  url: string,
  name: string,
  lastname: string,
  position: string
) => {
  transporter.sendMail({
    to: recipient,
    subject: `${name} ${lastname} esta interesado en la posición de ${position}`,
    html: sendEmailTemplate(
      `${name} ${lastname} esta interesado en la posición de ${position}`,
      `Tu propuesta para ${position} le ha parecido muy interesante a ${name} ${lastname}, si quieres saber más de esta persona, visita su perfil dando clic en Ver perfil. Si recibio este correo por error, por favor eliminarlo.`,
      url,
      "Ver perfil"
    )
  });
};

export const helpReceiveEmail = async (
  name: string,
  email: string,
  message: string
) => {
  transporter.sendMail({
    from: name,
    to: process.env.EMAIL_USER,
    subject: `Mensaje de ${name}`,
    html: sendEmailTemplate(
      `${name} con el correo electrónico ${email}, dice:`,
      message
    )
  });
};
