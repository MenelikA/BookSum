const express = require('express');
const router = express.Router();
const pool = require('../db');

// get all reviews
router.get('/', (req, res) => {
    // get all reviews
    pool.query('SELECT * FROM reviews', (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result.rows);
    });
});

// get review for a book-id
router.get('/:id', (req, res) => {
    // get the id from the url
    const id = parseInt(req.params.id);

    // get the review from the database
    pool.query('SELECT * FROM reviews WHERE book_id = $1', [id], (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result.rows);
    });
});

// create a review for a book_id
router.post('/', (req, res) => {
    // get data from the request body
    const { book_id, rating, body } = req.body;
    // get the current date in DD-MM-YYYY format
    const date = new Date().toLocaleDateString();

    // insert the review into the database
    pool.query('INSERT INTO reviews (book_id, rating, body, date) VALUES ($1, $2, $3, $4)', [book_id, rating, body, date], (err, result) => {
        if (err) {
            throw err;
        }
        res.status(201).send(`Review added!`);
    });
});

// update a review
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { book_id, rating, body } = req.body;
    // date in DD-MM-YYYY format
    const date = new Date().toLocaleDateString();

    pool.query('UPDATE reviews SET book_id = $1, rating = $2, body = $3, date = $4 WHERE id = $5', [book_id, rating, body, date, id], (err, result) => {
        if (err) {
            throw err;
        }
        res.status(200).send(`Review modified with ID: ${id}`);
    });
});

// delete a review
router.delete('/:id', (req, res) => {
    // extract the id from the request params
    const id = parseInt(req.params.id);

    // delete the review from the database
    pool.query('DELETE FROM reviews WHERE id = $1', [id], (err, result) => {
        if (err) {
            throw err;
        }
        res.status(200).send(`Review deleted!`);
    });
});

module.exports = router;