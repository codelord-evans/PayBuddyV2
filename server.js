require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const { logger, logEvents } = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const connectDB = require('./config/dbConn');
const mongoose = require('mongoose');
// const jwt = require('jsonwebtoken');
// const { authenticateUser } = require('./middleware/authenticate');

const User = require('./models/User');

const PORT = process.env.PORT || 3500;

console.log(process.env.NODE_ENV);

connectDB();

app.use(logger);

app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'views')));


app.use('/', express.static(path.join(__dirname, 'public')));

// Example middleware to authenticate user using JWT
// app.use(authenticateUser);

// Routes
app.use('/', require('./routes/root'));
// app.use('/user', require('./routes/userRoutes'));

// Handle POST requests to create a new user
app.post('/signup', async (req, res) => {
  // Implement user creation logic based on your user model
  try {
    const { username, password } = req.body;
    // Your user creation logic goes here
    // For example, you can use Mongoose to create a new user
    
    const newUser = new User({ username, password });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating user' });
  }
});

// Handle GET request to retrieve user information
app.get('/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    // Your logic to retrieve user information goes here
    // For example, you can use Mongoose to find a user by ID
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.json(user);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving user' });
  }
});

app.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('html', 'js')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
    res.json({ message: '404 Not Found' });
  } else {
    res.type('txt').send('404 Not Found');
  }
});

app.use(errorHandler);

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

mongoose.connection.on('error', (err) => {
  console.log(err);
  logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log');
});