import { useLocation } from "react-router-dom";
import Review from "../components/Review";

import { useState, useEffect } from "react";
import { API_URL } from "../constants";
import axios from "axios";

const BookDetails = () => {
  // which book sent us here?
  const location = useLocation();
  const { title, author, cover_image } = location.state;

  // to store the reviews
  const [reviews, setReviews] = useState([]);

  // run this when the component shows up
  // this will fetch the reviews for the book
  useEffect(() => {
    // get reviews for this book_id
    axios.get(`${API_URL}/reviews/${location.state.id}`).then((response) => {
      setReviews(response.data);
    });
  }, []);

  // to keep the review form data 
  const [formData, setFormData] = useState({
    rating: 1,
    body: "",
    book_id: location.state.id,
  });

  // handle disabiling the submit button
  const [isDisabled, setIsDisabled] = useState(false);
  const [error, setError] = useState("");

  // handles the form submission
  const handleSubmit = ()=> {

    // if the form is empty, show an error
    if (formData.body === "") {
      setError("Please enter a review");
      return;
    }

    setIsDisabled(true);
    // put the current date in the review in DD-MM-YYYY format
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;
    formData.date = formattedDate;
    axios.post(`${API_URL}/reviews`, formData).then((response) => {
      console.log(response);
      setIsDisabled(false);
      setError("Added!");
    }).catch((error) => {
      console.log(error);
      setIsDisabled(false);
      setError("Something went wrong!");
    });
  }

  return (
    <div className="container mb-5 py-5">
      <div className="row">
        <div className="col-md-6 d-flex justify-content-center">
          <div>
            <img
              src={cover_image === 'DEFAULT' ? 'assets/default_book_cover.png' : cover_image}
              className="card-img-top"
              alt="..."
              style={{
                width: "100%",
                height: "auto",
              }}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div>
            <h1>{title}</h1>
            <p className="text-secondary">by {author}</p>
          </div>
          <div className="mt-5">
            <h3 className="mb-3">Reviews</h3>
            {reviews.map((review) => {
              return <Review key={JSON.stringify(review)} data={review} />;
            })}
          </div>

          <div className="mt-5 border p-3">
            <h3 className="mb-3">Add Review</h3>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label htmlFor="rating">Rating</label>
                <select className="form-control" id="rating" value={formData.rating} onChange={(e)=> setFormData({...formData, rating: e.target.value})}>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="body">Review</label>
                <textarea
                  className="form-control"
                  id="body"
                  rows="3"
                  value={formData.body}
                  onChange={(e)=> setFormData({...formData, body: e.target.value})}
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary btn-block" disabled={isDisabled} onClick={handleSubmit}>
                Add Review
              </button>
              <p className="text-danger text-center">{error}</p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
