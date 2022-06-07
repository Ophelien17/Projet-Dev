const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
  Id: { type: Number, required: true },
  Nom: { type: String, required: true },
  Prenom: { type: String, required: true },
  mail: { type: String, required: true },
  role: { type: Number, required: true },
});

module.exports = mongoose.model('Users', usersSchema);
