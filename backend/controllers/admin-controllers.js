const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const Alumna = require("../models/alumna");
const Tema = require("../models/tema");

// CONTROLADORES TEMAS

// CREAR TEMA
const crearTema = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError(
      "Los datos introducidos son incorrectos. Por favor, revíselos",
      422
    );
  }

  const { name, compositor, año } = req.body;
  const temaCreado = new Tema({
    name,
    compositor,
    año,
  });

  try {
    temaCreado.save();
  } catch (err) {
    const error = new HttpError(
      "Crear Nuevo Tema ha fallado, por favor, vuelve a intentarlo",
      500
    );
    return next(error);
  }

  res.status(201).json({ tema: temaCreado });
};

// GET TODOS LOS TEMAS
const getTemas = async (req, res, next) => {
  let temas;
  try {
    temas = await Tema.find();
  } catch (err) {
    const error = new HttpError(
      "No se ha podido conectar con la base de datos. Por favor, inténtelo de nuevo",
      500
    );
    return next(error);
  }
  res.json({
    temas: temas.map((tema) => tema.toObject({ getters: true })),
  });
};

// GET TEMA POR SU ID
const getTemaById = async (req, res, next) => {
  const temaId = req.params.temaId;

  let tema;
  try {
    tema = await Tema.findById(temaId);
  } catch (err) {
    const error = new HttpError(
      "No se ha podido conectar con la base de datos. Por favor, inténtelo de nuevo",
      500
    );
    next(error);
  }

  if (!tema) {
    const error = new HttpError(
      "No se ha podido encontrar el tema con este id",
      404
    );
    return next(error);
  }

  res.json({ tema: tema.toObject({ getters: true }) });
};

// MODIFICAR TEMA
const modificarTema = async (req, res, next) => {
  const { name, compositor, año } = req.body;
  const temaId = req.params.temaId;

  let tema;
  try {
    tema = await Tema.findById(temaId);
  } catch (err) {
    const error = new HttpError(
      "No se ha podido conectar a la base de datos. Por favor, inténtelo de nuevo",
      500
    );
    return next(error);
  }

  tema.name = name;
  tema.compositor = compositor;
  tema.año = año;

  try {
    await tema.save();
  } catch (err) {
    const error = new HttpError(
      "No se ha podido conectar a la base de datos. Por favor, inténtelo de nuevo",
      500
    );
    return next(error);
  }

  res.status(200).json({ tema: tema.toObject({ getters: true }) });
};

// ELIMINAR TEMA
const eliminarTema = async (req, res, next) => {
  const temaId = req.params.temaId;

  let tema;
  try {
    tema = await Tema.findById(temaId);
  } catch (err) {
    const error = new HttpError(
      "No se ha podido conectar a la base de datos. Por favor, inténtelo de nuevo",
      500
    );
    return next(error);
  }

  try {
    await tema.remove();
  } catch (err) {
    const error = new HttpError(
      "No se ha podido conectar a la base de datos. Por favor, inténtelo de nuevo",
      500
    );
    return next(error);
  }

  res.status(200).json({ mensaje: "Tema eliminado" });
};


// CONTROLADORES ALUMNAS

// CREAR ALUMNA
const crearAlumna = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError(
      "Los datos introducidos son incorrectos. Por favor, revíselos",
      422
    );
  }

  const { name, apellidos, email, telefono, contraseña, cuerda } = req.body;
  const alumnaCreada = new Alumna({
    name,
    apellidos,
    email,
    telefono,
    contraseña,
    cuerda,
  });

  try {
    alumnaCreada.save();
  } catch (err) {
    const error = new HttpError(
      "Crear Nueva Alumna ha fallado, por favor, vuelve a intentarlo",
      500
    );
    return next(error);
  }

  res.status(201).json({ alumna: alumnaCreada });
};

// GET TODAS LAS ALUMNAS
const getAlumnas = async (req, res, next) => {
  let alumnas;
  try {
    alumnas = await Alumna.find();
  } catch (err) {
    const error = new HttpError(
      "No se ha podido conectar con la base de datos. Por favor, inténtelo de nuevo",
      500
    );
    return next(error);
  }
  res.json({
    alumnas: alumnas.map((alumna) => alumna.toObject({ getters: true })),
  });
};

// GET ALUMNA POR SU ID
const getAlumnaById = async (req, res, next) => {
  const userId = req.params.userId;

  let alumna;
  try {
    alumna = await Alumna.findById(userId);
  } catch (err) {
    const error = new HttpError(
      "No se ha podido conectar con la base de datos. Por favor, inténtelo de nuevo",
      500
    );
    next(error);
  }

  if (!alumna) {
    const error = new HttpError(
      "No se ha podido encontrar a la alumna con este id",
      404
    );
    return next(error);
  }

  res.json({ alumna: alumna.toObject({ getters: true }) });
};

// MODIFICAR ALUMNA
const modificarAlumna = async (req, res, next) => {
  const { name, apellidos, email, telefono, contraseña, cuerda } = req.body;
  const alumnaId = req.params.userId;

  let alumna;
  try {
    alumna = await Alumna.findById(alumnaId);
  } catch (err) {
    const error = new HttpError(
      "No se ha podido conectar a la base de datos. Por favor, inténtelo de nuevo",
      500
    );
    return next(error);
  }

  alumna.name = name;
  alumna.apellidos = apellidos;
  alumna.email = email;
  alumna.telefono = telefono;
  alumna.contraseña = contraseña;
  alumna.cuerda = cuerda;

  try {
    await alumna.save();
  } catch (err) {
    const error = new HttpError(
      "No se ha podido conectar a la base de datos. Por favor, inténtelo de nuevo",
      500
    );
    return next(error);
  }

  res.status(200).json({ alumna: alumna.toObject({ getters: true }) });
};

// ELIMINAR ALUMNA
const eliminarAlumna = async (req, res, next) => {
  const alumnaId = req.params.userId;

  let alumna;
  try {
    alumna = await Alumna.findById(alumnaId);
  } catch (err) {
    const error = new HttpError(
      "No se ha podido conectar a la base de datos. Por favor, inténtelo de nuevo",
      500
    );
    return next(error);
  }

  try {
    await alumna.remove();
  } catch (err) {
    const error = new HttpError(
      "No se ha podido conectar a la base de datos. Por favor, inténtelo de nuevo",
      500
    );
    return next(error);
  }

  res.status(200).json({ mensaje: "Alumna eliminada" });
};

exports.getAlumnaById = getAlumnaById;
exports.getTemaById = getTemaById;
exports.crearAlumna = crearAlumna;
exports.getAlumnas = getAlumnas;
exports.crearTema = crearTema;
exports.getTemas = getTemas;
exports.modificarTema = modificarTema;
exports.eliminarTema = eliminarTema;
exports.eliminarAlumna = eliminarAlumna;
exports.modificarAlumna = modificarAlumna;
