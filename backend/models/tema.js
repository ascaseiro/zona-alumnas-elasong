const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const temaSchema = new Schema({
  name: { type: String, required: true },
  compositor: { type: String, required: true },
  año: { type: String, required: true },
});

module.exports = mongoose.model("tema", temaSchema);