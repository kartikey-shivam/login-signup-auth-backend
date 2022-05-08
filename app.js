const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const product = require('./routes/productRoute');
const user = require('./routes/userRoute');
const order = require('./routes/orderRoute');
const globalErrorHandler = require('./controller/errorController');

app.use(express.json());
app.use(cookieParser());
app.use(express.static(`${__dirname}/public`));

app.use('/api/v1', product);
app.use('/api/v1', user);
app.use('/api/v1', order);

app.use(globalErrorHandler);

module.exports = app;
