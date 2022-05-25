import nodemailer from "nodemailer";

const sendingEmails = (to, subject, html) => {
  let transporter = nodemailer.createTransport({
    service: "gmail", // provider of the email
    auth: {
      user: "pruebanodemailerADL@gmail.com" /* your email */,
      pass: "ADL123!!" /* your password */,
    },
  });

  let mailOptions = {
    from: "pruebanodemailerADL@gmail.com" /* your email */,
    to /* email of the receiver */,
    subject /* subject of the email */,
    html /* content of the email (html or text) */,
  };

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) console.log(err);
    if (data) console.log(data);
  });
};

export default sendingEmails;
