const express = require('express');
const mysql = require('mysql2');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Carpeta public
app.use(express.static(path.join(__dirname, 'public')));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'cine',
    port: 3306,
    charset: 'utf8mb4'
});

connection.connect((err) => {
    if (err) {
        console.error('Error al conectar:', err);
        return;
    }

    // Forzar UTF-8
    connection.query("SET NAMES utf8mb4");

    console.log('Conectado a MySQL');
});

// ====================
// READ
// ====================
app.get('/peliculas', (req, res) => {

    connection.query(
        'SELECT * FROM peliculas',
        (err, results) => {

            if (err) {
                console.error(err);
                return res.status(500).json(err);
            }

            res.json(results);
        }
    );

});

// ====================
// CREATE
// ====================
app.post('/peliculas', (req, res) => {

    console.log(req.body);

    const {
        titulo,
        director,
        anio,
        genero,
        imagen
    } = req.body;

    connection.query(
        `INSERT INTO peliculas
        (titulo, director, anio, genero, imagen)
        VALUES (?, ?, ?, ?, ?)`,
        [
            titulo,
            director,
            anio,
            genero,
            imagen
        ],
        (err, result) => {

            if (err) {
                console.error(err);
                return res.status(500).json(err);
            }

            res.json({
                mensaje: 'Película creada correctamente'
            });
        }
    );

});

// ====================
// UPDATE
// ====================
app.put('/peliculas/:id', (req, res) => {

    const {
        titulo,
        director,
        anio,
        genero,
        imagen
    } = req.body;

    connection.query(
        `UPDATE peliculas
         SET titulo=?,
             director=?,
             anio=?,
             genero=?,
             imagen=?
         WHERE id=?`,
        [
            titulo,
            director,
            anio,
            genero,
            imagen,
            req.params.id
        ],
        (err, result) => {

            if (err) {
                console.error(err);
                return res.status(500).json(err);
            }

            res.json({
                mensaje: 'Película actualizada'
            });
        }
    );

});

// ====================
// DELETE
// ====================
app.delete('/peliculas/:id', (req, res) => {

    connection.query(
        'DELETE FROM peliculas WHERE id=?',
        [req.params.id],
        (err, result) => {

            if (err) {
                console.error(err);
                return res.status(500).json(err);
            }

            res.json({
                mensaje: 'Película eliminada'
            });
        }
    );

});

app.listen(port, () => {
    console.log(`Servidor en http://localhost:${port}`);
});