const jwt = require("jsonwebtoken");

const HttpError = require("../models/http-error");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw new Error("Ha fallado la autorización");
    }
    const tokenDecodificado = jwt.verify(token, "clave-privada-secreta");
    req.userData = { alumnaId: tokenDecodificado.alumnaId };
    next();
  } catch (err) {
    const error = new HttpError("Ha fallado la autorización", 401);
    return next(error);
  }
};
