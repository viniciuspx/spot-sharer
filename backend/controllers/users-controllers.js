const { v4: uuid } = require("uuid");

const HttpError = require("../models/http-error.js");

const dummy_users = [
  {
    id: "u1",
    name: "Vini G",
    email: "mail@mail.com",
    password: "test",
  },
];

const getUsers = (req, res, next) => {
  res.json({ users: dummy_users });
};

const signup = (req, res, next) => {
  const { name, email, password } = req.body;

  const hasUser = dummy_users.find((u) => u.email === email);

  if (hasUser) {
    throw new HttpError("Email already registered", 401);
  }

  const createdUser = {
    id: uuid(),
    name,
    email,
    password,
  };

  dummy_users.push(createdUser);
  res.status(200).json({ user: createdUser });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  const indentifiedUser = dummy_users.find((u) => u.email === email);
  if (!indentifiedUser || indentifiedUser.password !== password) {
    throw new HttpError("Login Failed", 401);
  }

  res.json({ message: "Logged in" });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
