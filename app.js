const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");

const path = require("path");
const nodemailer = require("nodemailer");

const app = express();

// View engine setup

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
