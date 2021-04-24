const express = require("express");
const { check } = require("express-validator");

const adminControllers = require("../controllers/admin-controllers");
const imageUpload = require("../middlewares/image-upload");

const router = express.Router();

// RUTA A COMPONENTE ADMIN INICIO
router.get("/", (req, res, next) => {
  res.json({ mensaje: "Se Renderiza inicio de Admin" });
});

// RUTA A COMPONENTE LISTAR ALUMNAS EXISTENTES
router.get("/alumnas", adminControllers.getAlumnas);

// RUTA A COMPONENTE MODIFICAR ALUMNA EXISTENTE
router.get("/alumnas/:userId/modificar-alumna", adminControllers.getAlumnaById);

router.patch(
  "/alumnas/:userId/modificar-alumna",
  adminControllers.modificarAlumna
);

router.delete(
  "/alumnas/:userId/modificar-alumna",
  adminControllers.eliminarAlumna
);

// RUTA A COMPONENTE NUEVA ALUMNA
router.get("/nueva-alumna", (req, res, next) => {
  res.json({ mensaje: "Se renderiza Nueva ALumna" });
});

router.post(
  "/nueva-alumna",
  imageUpload.single('imagen'),
  check("name").not().isEmpty(),
  check("apellidos").not().isEmpty(),
  check("email").not().isEmpty().isEmail(),
  check("telefono").not().isEmpty(),
  check("contraseña").not().isEmpty(),
  check("cuerda").not().isEmpty(),
  adminControllers.crearAlumna
);

// RUTA A COMPONENTE LISTAR TEMAS EXISTENTES
router.get("/temas", adminControllers.getTemas);

// RUTA A COMPONENTE MODIFICAR TEMA EXISTENTE
router.get("/temas/:temaId/modificar-tema", adminControllers.getTemaById);

router.patch("/temas/:temaId/modificar-tema", adminControllers.modificarTema);

router.delete("/temas/:temaId/modificar-tema", adminControllers.eliminarTema);

// RUTA A COMPONENTE NUEVO TEMA
router.get("/nuevo-tema", (req, res, next) => {
  res.json({ mensaje: "Se renderiza Nuevo Tema" });
});

router.post(
  "/nuevo-tema",
  check("name").not().isEmpty(),
  check("compositor").not().isEmpty(),
  check("año").not().isEmpty(),
  adminControllers.crearTema
);

module.exports = router;
