import nodemailer from "nodemailer";

export default async function sendEmail(emailInfo) {
  const { bloggeremail, subject, message } = emailInfo;

  //Create transporter object to send email
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    service: process.env.SMTP_SERVICE,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
    tls: {
      ciphers: "SSLv3",
      rejectUnauthorized: false,
    },
  });
  //Email options
  const emailOptions = {
    from: process.env.SMTP_EMAIL,
    to: bloggeremail,
    subject: subject,
    text: message,
  };
  //Send Email
  transporter.sendMail(emailOptions,(err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log("mail send");
    }
  });
}
