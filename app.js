const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");

const path = require("path");
const nodemailer = require("nodemailer");

const app = express();