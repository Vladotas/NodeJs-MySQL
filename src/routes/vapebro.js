const express = require('express');
const router = express.Router();


const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/add',isLoggedIn,(req,res) =>{
    res.render('links/add');
    });

    router.post('/add',isLoggedIn, async (req,res) => {
        const {title, description, precio} = req.body;
        const newProduct = {
            title,
            description,
            precio
        };
        await pool.query('INSERT INTO productos set ?',[newProduct])
        req.flash('success', 'Product Saved Successfully');
        res.redirect('/vapebro');
    });

    router.get('/addd',isLoggedIn,(req,res) =>{
        res.render('links/addd');
        });
    
        router.post('/addd',isLoggedIn, async (req,res) => {
            const {title, description, precio} = req.body;
            const newProduct = {
                title,
                description,
                precio,
                user_id: req.user.id 
            };
            await pool.query('INSERT INTO buys set ?',[newProduct])
            req.flash('success', 'Product Saved Successfully');
            res.redirect('/vapebro');
        });


    router.get(`/`,isLoggedIn, async (req,res) =>{
        const productos = await pool.query('SELECT * FROM productos');
        res.render('links/list', { productos });
        
    });

    router.get('/delete/:id',isLoggedIn, async (req,res) =>{
       const {id} = req.params;
       await pool.query('DELETE FROM productos WHERE ID = ?', [id]);
       req.flash('success', 'Product Removed Successfully');
       res.redirect('/vapebro');
    });

    router.get('/edit/:id',isLoggedIn, async (req,res) =>{
        const {id} = req.params;
        const productos = await pool.query('SELECT * FROM productos WHERE id = ?', [id]);
        res.render('links/edit', { producto: productos[0]});
    });

    router.post('/edit/:id',isLoggedIn, async (req, res) => {
        const { id } = req.params;
        const { title, description,precio} = req.body; 
        const newProduct = {
            title,
            description,
            precio
        };    
        await pool.query('UPDATE productos set ? WHERE id = ?', [newProduct, id]);
        req.flash('success', 'Product Updated Successfully');
        res.redirect('/vapebro');
    });

    router.get(`/crud`,isLoggedIn, async (req,res) =>{
        const users = await pool.query('SELECT * FROM users');
        res.render('links/crud', { users });
        
    });

    router.get('/deleteUs/:id',isLoggedIn, async (req,res) =>{
        const {id} = req.params;
        await pool.query('DELETE FROM users WHERE ID = ?', [id]);
        req.flash('success', 'User Removed Successfully');
        res.redirect('/vapebro/crud');
     });

     router.get('/rol/:id',isLoggedIn, async (req,res) => {
        const {id} = req.params;
        await pool.query('UPDATE users SET rol = 1 WHERE id = ?', [id]);
        req.flash('success', 'This user is admin');
        res.redirect('/vapebro/crud');
    });

    router.get('/rolUs/:id',isLoggedIn, async (req,res) => {
        const {id} = req.params;
        await pool.query('UPDATE users SET rol = NULL WHERE id = ?', [id]);
        req.flash('success', 'This user is not admin');
        res.redirect('/vapebro/crud');
    });

    router.get('/carrito',isLoggedIn, async (req,res) => {
        const buys = await pool.query('SELECT * FROM buys WHERE user_id = ?',[req.user.id]);
        res.render('links/carrito', { buys });
    });


    router.get('/deletee/:id',isLoggedIn, async (req,res) =>{
        const {id} = req.params;
        await pool.query('DELETE FROM buys WHERE ID = ?', [id]);
        res.redirect('/vapebro/carrito');
     });
               

module.exports = router;