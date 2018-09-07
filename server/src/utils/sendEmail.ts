import * as nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
	service: process.env.EMAIL_SERVICE,
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASSWORD
	}
});

export const sendEmailLink = async (recipient: string, url: string) => {
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

export const sendEmailPost = async (
	recipient: string[],
	url: string,
	title: string
) => {
	for (const email of recipient) {
		await transporter.sendMail({
			to: email,
			subject: "¡Tenemos algo nuevo para ti!",
			html: `<html>
		<body>
			<p>¿Te interesa leer "${title}"?</p>
			<a href="${url}">¡Da click aquí!</a>
		</body>
	</html>
	`
		});
	}
};
