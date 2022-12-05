import { useState } from "react";

import axios from "axios";
import { API_URL } from "../constants";

const Review = ({ data }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editModeValues, setEditModeValues] = useState(data);

  const handleDelete = () => {
    setIsVisible(false);
    axios.delete(`${API_URL}/reviews/${data.id}`).then((response) => {
      console.log(response);
    });
  };

  const handleSave = () => {
    setEditMode(false);
    // put the current date in the review in DD-MM-YYYY format
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;
    editModeValues.date = formattedDate;
    axios.put(`${API_URL}/reviews/${data.id}`, editModeValues).then((response) => {
      console.log(response);
    });
  };

  return (
    <div
      className="card mb-3"
      style={{
        display: isVisible ? "block" : "none",
      }}
    >
      {!editMode ? (
        <div className="card-body">
          <h5 className="card-title">{data.rating} / 5</h5>
          <p className="card-text">{data.body}</p>
          <p className="card-text">
            <small className="text-muted">Date: {data.date.substring(0,10)}</small>
          </p>

          {/* Two buttons for edit and delete */}
          <div className="d-flex justify-content-between">
            <button className="btn btn-danger" onClick={handleDelete}>
              Delete
            </button>
            <button
              className="btn btn-primary"
              onClick={() => setEditMode(true)}
            >
              Edit
            </button>
          </div>
        </div>
      ) : (
        <div className="card-body">
          <h5 className="card-title">Edit Review</h5>
          <div className="mb-3">
            <label htmlFor="rating" className="form-label">
              Rating
            </label>
            <input
              type="number"
              max={5}
              min={1}
              className="form-control"
              id="rating"
              value={editModeValues.rating}
              onChange={(value) => {
                setEditModeValues({
                  ...editModeValues,
                  rating: value.target.value,
                });
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="body" className="form-label">
              Review
            </label>
            <textarea
              className="form-control"
              id="body"
              rows="3"
              value={editModeValues.body}
              onChange={(value) => {
                setEditModeValues({
                  ...editModeValues,
                  body: value.target.value,
                });
              }}
            ></textarea>
          </div>
          <button className="btn btn-primary btn-block" onClick={handleSave}>
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default Review;
