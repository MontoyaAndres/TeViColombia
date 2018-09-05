import * as nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
	service: process.env.EMAIL_SERVICE,
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASSWORD
	}
});

export const sendEmail = async (recipient: string, url: string) => {
	transporter.sendMail({
		to: recipient,
		subject: "Confirmar tu correo electronico en PÁGINA",
		html: `<html>
  <body>
    <p>Da click en "Confirmar correo" para que puedas disfrutar de nuestro contenido!</p>
    <a href="${url}">Confirmar correo</a>
  </body>
</html>
`
	});
};
