const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  ingreso: { type: Number, default: 0 }, // Ingreso inicial
  temp_ingreso: {type: Number, default: 0} //Para indicar el ingreso restante 
});

const User = mongoose.model('User', userSchema);
module.exports = User;

