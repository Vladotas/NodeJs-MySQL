const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require ('path');
const flash = require ('connect-flash');
const swal = require('sweetalert2');


//Initializations
const app = express();


//Setings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'), //Este parametrod el objeto dice que entre a la carpeta vews y despues de ahi entre a la carpeta layouts
    partialsDir: path.join(app.get('views'), 'partials'), 
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');

//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json()); //Sirve para poder recibir archivos json


//Global Vairables
app.use((req,res,next) =>{

    next();
});

//Rutes
app.use(require('./routes/index.js'));//No es encesaio poner el index.js por que node simpre busca el index.js
app.use(require('./routes/authentication.js'));
app.use('/vapebro', require('./routes/vapebro'));


//Public
app.use(express.static(path.join(__dirname, 'public')));

//Starting the server
app.listen(app.get('port'),() => {
    console.log('Server on port',app.get('port'));
});


