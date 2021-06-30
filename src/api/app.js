const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
const express = require("express");
const cors = require("cors");
const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");
const app = express();

const messagesRouter = require('./messages/messages.router');

app.options('*', cors());

app.use(cors());
app.use(express.json());

app.use('/messages', messagesRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;