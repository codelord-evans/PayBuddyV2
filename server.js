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

const bodyParser = require('body-parser');
// const jwt = require('jsonwebtoken');
// const { authenticateUser } = require('./middleware/authenticate');


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


// Use body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Handle GET request for the signup page
app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'signup.html'));
});

// Handle POST request for user registration
app.post('/signup', async (req, res) => {
  // Extract user data from the request
  const { username, password } = req.body;

  // Create a new user in the database (replace User with your actual model)
  const User = require('./models/User');
  try {
    const newUser = new User({ username, password });
    await newUser.save();
    res.status(201).send('User created successfully!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating user');
  }
});


// Routes
app.use('/', require('./routes/root'));
// app.use('/user', require('./routes/userRoutes'));


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