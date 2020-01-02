const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require ('path');
const flash = require ('connect-flash');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
//const swal = require('sweetalert2');
const {database} = require('./keys');
const passport = require('passport');

//Initializations
const app = express();
require('./lib/passport');


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
app.use(session({
    secret: 'vladtmysqlnodesession',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json()); //Sirve para poder recibir archivos json
app.use(passport.initialize());
app.use(passport.session());


//Global Vairables
app.use((req,res,next) =>{
    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
    app.locals.user = req.user;
    app.locals.productos = req.productos;
    
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


