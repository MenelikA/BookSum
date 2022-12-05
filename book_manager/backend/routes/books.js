// books router
const express = require('express');
const router = express.Router();
const pool = require('../db');

// get all books
router.get('/', (req, res) => {
    pool.query('SELECT * FROM books', (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result.rows);
    });
});

// get a book
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);

    pool.query('SELECT * FROM books WHERE id = $1', [id], (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result.rows);
    });
});

// create a book
router.post('/', (req, res) => {
    // get data from the request body
    const { title, author, cover_image, genre, publication_date } = req.body;

    // insert the book into the database
    pool.query('INSERT INTO books (title, author, cover_image, genre, publication_date) VALUES ($1, $2, $3, $4, $5)', [title, author, cover_image, genre, publication_date], (err, result) => {
        if (err) {
            throw err;
        }
        res.status(201).send(`Book added!`);
    });
});

// update a book
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { title, author, cover, genre, publication_date } = req.body;

    pool.query(
        'UPDATE books SET title = $1, author = $2, cover = $3, genre = $4, publication_date = $5 WHERE id = $6',
        [title, author, cover, genre, publication_date, id],
        (err, result) => {
            if (err) {
                throw err;
            }
            res.status(200).send(`Book modified with ID!`);
        }
    );
});

// delete a book
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);

    pool.query('DELETE FROM books WHERE id = $1', [id], (err, result) => {
        if (err) {
            throw err;
        }
        res.status(200).send(`Book deleted with ID!`);
    });
});

module.exports = router;