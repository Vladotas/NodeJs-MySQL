const express = require ('express');
const router = express.Router(); //El metodo Router (viene de express) envuelve la variable en un objeto

router.get('/',(req,res) =>{
res.render('index');
})

module.exports = router; //Exporta el modulo credo router