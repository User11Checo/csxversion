const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt'); // Para el manejo de contraseñas
const User = require('../models/UserModel'); // Modelo del usuario
const Expense = require('../models/ExpenseModel'); // Importar el modelo de gastos

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Conexión a MongoDB
mongoose.connect('mongodb+srv://RicardoHuitzil:rbrf1t_Checobb11@clustercashflow.oof6cyt.mongodb.net/?retryWrites=true&w=majority&appName=ClusterCashFlow/cashFlow', { // Ajusta la URI según tu configuración
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Conectado a MongoDB'))
  .catch((error) => console.error('Error conectando a MongoDB:', error));

// Ruta para registrar un nuevo usuario
/*app.post('/api/register', async (req, res) => {
  const { name, surname, username, email, password } = req.body;

  if (!name || !surname || !username || !email || !password) {
    return res.status(400).json({ error: 'Por favor llena todos los campos requeridos.' });
  }

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ error: 'El correo electrónico o nombre de usuario ya está en uso.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      surname,
      username,
      email,
      password: hashedPassword,
      ingreso: 0,
      temp_ingreso: 0,
    });

    await newUser.save();
    res.status(201).json({ message: 'Usuario registrado exitosamente.' });
  } catch (error) {
    console.error('Error registrando al usuario:', error);
    res.status(500).json({ error: 'Hubo un problema al registrar al usuario.' });
  }
});
*/
app.post('/api/register', async (req, res) => {
  const { name, surname, username, email, password, ingreso = 0, temp_ingreso = 0 } = req.body;

  if (!name || !surname || !username || !email || !password) {
    return res.status(400).json({ error: 'Por favor llena todos los campos requeridos.' });
  }

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ error: 'El correo electrónico o nombre de usuario ya está en uso.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      surname,
      username,
      email,
      password: hashedPassword,
      ingreso,
      temp_ingreso,
    });

    await newUser.save();
    res.status(201).json({ message: 'Usuario registrado exitosamente.' });
  } catch (error) {
    console.error('Error registrando al usuario:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: 'Error de validación en los datos enviados.' });
    }
    res.status(500).json({ error: 'Hubo un problema al registrar al usuario.' });
  }
});


// Ruta para el inicio de sesión
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Por favor llena todos los campos requeridos.' });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Credenciales inválidas.' });
    }

    res.status(200).json({ message: 'Inicio de sesión exitoso', userId: user._id });
  } catch (error) {
    console.error('Error iniciando sesión:', error);
    res.status(500).json({ error: 'Hubo un problema al iniciar sesión.' });
  }
});

// Ruta para actualizar el ingreso del usuario
app.post('/api/update-income', async (req, res) => {
  const { userId, ingreso } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    user.ingreso = ingreso; // Actualizar ingreso inicial
    user.temp_ingreso = ingreso; // Sincronizar temp_ingreso con ingreso
    await user.save();

    res.status(200).json({ message: 'Ingreso actualizado correctamente.' });
  } catch (error) {
    console.error('Error al actualizar el ingreso:', error);
    res.status(500).json({ error: 'Error al actualizar el ingreso.' });
  }
});

// Ruta para agregar un gasto
app.post('/api/add-expense', async (req, res) => {
  const { userId, amount, category, description } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    if (amount > user.temp_ingreso) {
      return res.status(400).json({ error: 'El monto del gasto excede el ingreso restante.' });
    }

    const newExpense = new Expense({ userId, amount, category, description });
    await newExpense.save();

    user.temp_ingreso -= amount; // Solo restar del temp_ingreso
    await user.save();

    res.status(201).json({ message: 'Gasto registrado correctamente.', expense: newExpense });
  } catch (error) {
    console.error('Error al registrar el gasto:', error);
    res.status(500).json({ error: 'Error al registrar el gasto.' });
  }
});

// Ruta para obtener el historial de gastos de un usuario
app.get('/api/user-expenses/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const expenses = await Expense.find({ userId });

    res.status(200).json({
      ingreso: user.ingreso,          // El ingreso inicial permanece constante
      temp_ingreso: user.temp_ingreso, // El ingreso restante
      expenses,
    });
  } catch (error) {
    console.error('Error al obtener el historial de gastos:', error);
    res.status(500).json({ error: 'Error al obtener el historial de gastos.' });
  }
});

//Ruta para tener usuario por id
app.get('/api/user/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los datos del usuario.' });
  }
});

//Ruta Actualizar Usuario
app.put('/api/user/:userId', async (req, res) => {
  const { userId } = req.params;
  const { name, email } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { name, email },
      { new: true } // Devuelve el documento actualizado
    );
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.status(200).json({ message: 'Datos actualizados correctamente.', user });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar los datos del usuario.' });
  }
});

// Servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});