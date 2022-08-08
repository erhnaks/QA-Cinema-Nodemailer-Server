const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");

const path = require("path");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();

// View engine setup

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

// Static folder
app.use("/public", express.static(path.join(__dirname, "public")));

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.render("contact", { layout: false });
});

app.post("/send", (req, res) => {
  const output = `
    <p>New customer enquiry request.</p>
    <h3>Contact Details</h3>
    <ul>
      <li>Name: ${req.body.name}</li>
      <li>Subject: ${req.body.company}</li>
      <li>Email: ${req.body.email}</li>
      <li>Phone: ${req.body.phone}</li>
    </ul>
    <h3>Customer message:</h3>
    <p>${req.body.message}</p>
  `;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.USER, // generated ethereal user
      pass: process.env.PASS, // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: process.env.MAILFROM, // sender address
    to: process.env.MAILTO, // list of receivers
    subject: "New Customer Enquiry", // Subject line
    text: "", // plain text body
    html: output, // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    res.render("contact", {
      msg: "Email has been sent, we will get back to you as soon as possible.",
    });
  });
});

app.listen(3027, () =>
  console.log("Mailer server is now at your service mighty Team-Foxtrot ")
);
