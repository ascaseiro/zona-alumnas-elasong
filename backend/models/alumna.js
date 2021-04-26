const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator")

const Schema = mongoose.Schema;

const alumnaSchema = new Schema({
  name: { type: String, required: true },
  apellidos: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  telefono: { type: String, required: true },
  contraseña: { type: String, required: true },
  cuerda: { type: String, required: true },
  imagen: { type: String, required: false },
  rol: { type: String, required: true },
});

alumnaSchema.plugin(uniqueValidator)

module.exports = mongoose.model("Alumna", alumnaSchema);
