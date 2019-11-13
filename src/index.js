const express = require('express');
const morgan = require('morgan');

//Initializations
const app = express();

//Setings
app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(morgan('dev'));

//Global Vairables


//Rutes
app.use(require('./routes/index.js'));

//Public


//Starting the server
app.listen(app.get('port'),() => {
    console.log('Server on port',app.get('port'));
});


