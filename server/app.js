"use strict";

const express = require("express");
const createError = require("http-errors");
const cors = require("cors");

const GuardRouter = require("./router/guardRouter");
const StudentRouter = require("./router/studentRouter");
const LoginRouter = require("./router/loginRouter");
const { verifyToken } = require("./router/auth/authentication");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/guard", verifyToken, GuardRouter);
app.use("/api/student", StudentRouter);
app.use("/api/login", LoginRouter);

app.use(function(req, res, next) {
    next(createError(404));
});

module.exports = app;