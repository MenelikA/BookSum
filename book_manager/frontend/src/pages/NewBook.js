import { useState } from "react";
import { API_URL } from "../constants";
import axios from "axios";


const NewBook = () => {

    const [isDisabled, setIsDisabled] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        author: "",
        genre: "",
        cover_image: "",
        publication_date: "",
        rating: 1,
        body: "",
        book_id: null,
    });

    const [addButtonDisabled, setAddButtonDisabled] = useState(false);
    const [error, setError] = useState("");

    // this handles the form submission
    const addBook = () => {

        // if cover image is empty, set it to default
        if (formData.cover_image === "") {
            formData.cover_image = "DEFAULT";
        }

        // if any of the fields are empty, show an error
        if (formData.title === "" || formData.author === "" || formData.genre === "" || formData.publication_date === "") {
            setError("Please fill in all the fields");
            return;
        }

        // disable the button until the API call is complete
        setAddButtonDisabled(true);
        // send the data to the API
        axios.post(`${API_URL}/books`, formData).then((response) => {
            setAddButtonDisabled(false);
            setError("Book added successfully!");
            
            // get the id of the book we just added
            axios.get(`${API_URL}/books`).then((response) => {
                const bookData = response.data;
                const bookId = bookData[bookData.length - 1].id;
                // add the book id to the form data
                formData.book_id = bookId;
                console.log(bookId);
    
                // add the review
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
    
            }).catch((error) => {
                console.log(error);
            });

        }).catch((error) => {
            setAddButtonDisabled(false);
            setError("Error adding book");
        });

    }

    return (
        <div className="container my-5" style={{maxWidth: '40rem'}}>
            <h1>New Book</h1>
            <form onSubmit={(e) => e.preventDefault()}>
                {/* Title */}
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" value={formData.title} onChange={(e)=> setFormData({...formData, title: e.target.value})} />
                </div>
                {/* Author */}
                <div className="mb-3">
                    <label htmlFor="author" className="form-label">Author</label>
                    <input type="text" className="form-control" id="author" value={formData.author} onChange={(e)=> setFormData({...formData, author: e.target.value})} />
                </div>
                {/* Cover Image */}
                <div className="mb-3">
                    <label htmlFor="cover" className="form-label">Cover</label>
                    <input type="file" className="form-control" id="cover" onChange={(e)=> {
                        // take the file and convert it to base64
                        const file = e.target.files[0];
                        const reader = new FileReader();
                        reader.readAsDataURL(file);

                        // when the reader is done, set the base64 string as the cover_image
                        reader.onloadend = () => {
                            setFormData({...formData, cover_image: reader.result});
                            console.log(reader.result.length);
                        }
                    }} />
                </div>
                {/* Genre */}
                <div className="mb-3">
                    <label htmlFor="genre" className="form-label">Genre</label>
                    <input type="text" className="form-control" id="genre" value={formData.genre} onChange={(e)=> setFormData({...formData, genre: e.target.value})} />
                </div>
                {/* Publication Date */}
                <div className="mb-3">
                    <label htmlFor="publicationDate" className="form-label">Publication Date</label>
                    <input type="date" className="form-control" id="publicationDate" value={formData.publication_date} onChange={(e) => {
                        // convert date from YYYY-MM-DD to DD-MM-YYYY
                        setFormData({...formData, publication_date: e.target.value})
                    }} />
                </div>
                
                {/* Rating */}
                <div className="mb-3 form-group">
                    <label htmlFor="rating" className="form-label">Rating</label>
                    <select className="form-control" id="rating" value={formData.rating} onChange={(e) => setFormData({...formData, rating: e.target.value})}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>

                {/* Review Body */}
                <div className="mb-3">
                    <label htmlFor="reviewBody" className="form-label">Review</label>
                    <textarea className="form-control" id="reviewBody" rows="3" value={formData.body} onChange={(e) => setFormData({...formData, body: e.target.value})}></textarea>
                </div>

                <button type="submit" disabled={addButtonDisabled} className="btn btn-primary btn-block" onClick={addBook}>Add Book</button>
            </form>
            <p className="text-danger text-center mt-3">{error}</p>
        </div>
    );
}

export default NewBook;