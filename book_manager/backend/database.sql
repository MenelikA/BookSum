-- postgresql database.sql

-- create a database named bookmanager
CREATE DATABASE bookmanager;

-- create a table named BOOKS(id, title, author, genre, publication_date, cover_image)
CREATE TABLE BOOKS (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    genre VARCHAR(255) NOT NULL,
    publication_date DATE NOT NULL,
    cover_image VARCHAR(999999) NOT NULL
);

-- create a table names REVIEWS(id, book_id: foreign key from BOOK table, rating, body, date)
CREATE TABLE REVIEWS (
    id SERIAL PRIMARY KEY,
    book_id INTEGER NOT NULL,
    rating INTEGER NOT NULL,
    body VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    FOREIGN KEY (book_id) REFERENCES BOOKS(id)
);

-- insert data into BOOKS table
INSERT INTO BOOKS (title, author, genre, publication_date, cover_image) VALUES ('The Hobbit', 'J.R.R. Tolkien', 'Fantasy', '1937-09-21', 'DEFAULT');
INSERT INTO BOOKS (title, author, genre, publication_date, cover_image) VALUES ('The Fellowship of the Ring', 'John Doe', 'Fantasy', '1954-07-29', 'DEFAULT');
INSERT INTO BOOKS (title, author, genre, publication_date, cover_image) VALUES ('The Two Towers', 'Emily Obama', 'Fantasy', '1954-11-11', 'DEFAULT');
INSERT INTO BOOKS (title, author, genre, publication_date, cover_image) VALUES ('The Return of the King', 'J.R.R. Tolkien', 'Fantasy', '1955-10-20', 'DEFAULT');

-- insert data into REVIEWS table
INSERT INTO REVIEWS (book_id, rating, body, date) VALUES (1, 5, 'This is a great book!', '2019-01-01');
INSERT INTO REVIEWS (book_id, rating, body, date) VALUES (1, 4, 'This is a good book!', '2019-01-02');
INSERT INTO REVIEWS (book_id, rating, body, date) VALUES (1, 3, 'This is an ok book!', '2019-01-03');
INSERT INTO REVIEWS (book_id, rating, body, date) VALUES (2, 5, 'This is a great book!', '2019-01-04');
INSERT INTO REVIEWS (book_id, rating, body, date) VALUES (2, 4, 'This is a good book!', '2019-01-05');