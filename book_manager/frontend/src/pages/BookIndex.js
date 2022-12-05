import React from "react";
import BookCard from "../components/BookCard";
import {Link} from "react-router-dom";
import { useState, useEffect } from "react";

import { v4 } from 'uuid';

const BookIndex = ({ bookData }) => {

  // this keeps the list of books
  const [listOfBooks, setListOfBooks] = useState([]);

  // this updates the list of books whenever the component is rendered
  useEffect(() => {
    setListOfBooks(bookData);
  }, [bookData]);

  return (
    <React.Fragment>
      <h3 className="text-center pt-5">Books Index</h3>

      <div className="container">
        {
          // for every 4 books, we add a new row
          listOfBooks.map((_, index) => {
            if (index % 4 === 0) {
              return (
                <div className="row d-flex justify-content-left" key={v4()}>
                  {
                    // render 3 books per row
                    listOfBooks.slice(index, index + 4).map((book) => {
                      return (
                        <div className="col-3" key={v4()}>
                          <div style={{padding: 5}}>
                            <BookCard
                              id={book.id}
                              title={book.title}
                              author={book.author}
                              cover_image={book.cover_image}
                            />
                          </div>
                        </div>
                      );
                    })
                  }
                </div>
              );
            }
          })
        }
      </div>

      <div className="p-5 d-flex justify-content-center">
        <Link to="/new" className="btn btn-success">Add New Book</Link>
      </div>
    </React.Fragment>
  );
};

export default BookIndex;
