const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();


// Settings 
app.set('port', process.env.PORT || 8080);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/RegisterStudentRoute', require('../routes/registerStudentRoute'));
app.use('/RegisterProfessorRoute', require('../routes/RegisterProfessorRoute'));
app.use('/RegisterAdminRoute', require('../routes/RegisterAdminRoute'));
app.use('/RegisterSecretaryRoute', require('../routes/RegisterSecretaryRoute'));
// Static Files
app.use(express.static('dist'));
//app.use(express.static(path.join(__dirname, '../../public')));

module.exports = app;
