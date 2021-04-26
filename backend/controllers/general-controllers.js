const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const HttpError = require("../models/http-error");
const Alumna = require("../models/alumna");

const login = async (req, res, next) => {
  const { email, contraseña } = req.body;

  let usuarioIdentificado;
  try {
    usuarioIdentificado = await Alumna.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "No hemos podido comprobar los datos. Por favor, inténtalo de nuevo",
      500
    );
    return next(error);
  }

  if (!usuarioIdentificado) {
    const error = new HttpError(
      "Datos incorrectos, no hemos podido darte acceso",
      401
    );
    return next(error);
  }

  let contraseñaIsValid = false;
  try {
    contraseñaIsValid = await bcrypt.compare(
      contraseña,
      usuarioIdentificado.contraseña
    );
  } catch (err) {
    const error = new HttpError(
      "No hemos podido logearte. Por favor, vuelve a intentarlo",
      500
    );
    return next(error);
  }

  if (!contraseñaIsValid) {
    const error = new HttpError(
      "Datos incorrectos, no hemos podido darte acceso",
      401
    );
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { alumnaId: usuarioIdentificado.id, email: usuarioIdentificado.email },
      "clave-privada-secreta",
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new HttpError(
      "Login ha fallado, por favor, vuelve a intentarlo",
      500
    );
    return next(error);
  }

  res.json({
    alumnaId: usuarioIdentificado.id,
    email: usuarioIdentificado.email,
    token: token,
  });
};

exports.login = login;
