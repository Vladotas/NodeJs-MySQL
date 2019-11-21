const express = require('express');
const router = express.Router();


const pool = require('../database');

router.get('/add',(req,res) =>{
    res.render('links/add');
    });

    router.post('/add', async (req,res) => {
        const {title, description} = req.body;
        const newProduct = {
            title,
            description
        };
        await pool.query('INSERT INTO productos set ?',[newProduct])
        //req.swal("Good job!", "You clicked the button!", "success");
        res.redirect('/vapebro');
    });

    router.get(`/`, async (req,res) =>{
        const productos = await pool.query('SELECT * FROM productos');
        res.render('links/list', { productos });
        
    })

    router.get('/delete/:id', async (req,res) =>{
       const {id} = req.params;
       await pool.query('DELETE FROM productos WHERE ID = ?', [id]);
       res.redirect('/vapebro');
    });

    router.get('/edit/:id', async (req,res) =>{
        const {id} = req.params;
        const productos = await pool.query('SELECT * FROM productos WHERE id = ?', [id]);
        res.render('links/edit', { producto: productos[0]});
    });

    router.post('/edit/:id', async (req, res) => {
        const { id } = req.params;
        const { title, description} = req.body; 
        const newProduct = {
            title,
            description
        };    
        await pool.query('UPDATE productos set ? WHERE id = ?', [newProduct, id]);
        res.redirect('/vapebro');
    });
module.exports = router;