const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const recursoSchema = new Schema({
  name: { type: String, required: true },
  cuerda: { type: String, required: true },
  imagen: { type: String, required: false },
  temaId: { type: String, required: true },
});

recursoSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Recurso", recursoSchema);
