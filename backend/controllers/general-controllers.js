const { validationResult } = require("express-validator");

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

  if (!usuarioIdentificado || usuarioIdentificado.contraseña !== contraseña) {
    const error = new HttpError(
      "Datos incorrectos, no hemos podido darte acceso",
      401
    );
    return next(error);
  }

  console.log(usuarioIdentificado.rol)

  res.json({ rol: usuarioIdentificado.rol });
};

exports.login = login;
