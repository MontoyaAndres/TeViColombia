import * as nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

export const sendConfirmEmailLink = async (recipient: string, url: string) => {
  transporter.sendMail({
    to: recipient,
    subject: "Confirmar correo electrónico.",
    html: `<html>
	<body>
	<div style="text-align: 'center'">
		<p>Por favor de clic en el botón de abajo para confirmar su cuenta.</p>
		<a href="${url}">Confirmar correo</a>
	</div>
  </body>
</html>
`
  });
};

export const sendForgotPasswordEmailLink = async (
  recipient: string,
  url: string
) => {
  transporter.sendMail({
    to: recipient,
    subject: "Cambio de contraseña",
    html: `<html>
	<body>
	<div style="text-align: 'center'">
		<p>Por favor de clic en el botón de abajo para cambiar su contraseña.</p>
		<a href="${url}">Cambiar contraseña</a>
	</div>
  </body>
</html>
`
  });
};
