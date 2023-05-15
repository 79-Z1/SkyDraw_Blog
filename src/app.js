require('dotenv').config();
const handlebars = require('express-handlebars');
// const { default: helmet } = require('helmet');
const compression = require('compression');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();

//~ INIT MIDDLEWARE
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));
// app.use(helmet({ default: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression()); // nén data trả về

//~ INIT DB
require('./dbs/sqlConnect');

//~ SET VIEW ENGINE
app.engine(
	'hbs',
	handlebars.engine({
		extname: '.hbs',
        helpers: {}
	})
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));


//~ INIT ROUTES
app.post('/test', (req, res, next) =>  {
    console.log(req.body);
    return res.json(req.body)
});
app.use('/', require('./routers'));


//~ HANDLING ERRORS
app.use((req,res,next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});
app.use((error, req, res, next) => {
    const statusCode = error.status || 500;
    return res.status(statusCode).json({
        status: 'error',
        code: statusCode,
        message: error.message || 'Internal Server Error',
        stack: error.stack
    })
})



module.exports = app;