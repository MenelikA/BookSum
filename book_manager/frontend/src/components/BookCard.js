import { Link } from "react-router-dom";

const BookCard = ({id, title, author, cover_image})=> {
    return (
        <div className="card" style={{width: "100%", marginTop: 10, marginBottom: 10, marginLeft: 5, marginRight: 5}}>
        <img src={cover_image === 'DEFAULT' ? 'assets/default_book_cover.png' : cover_image} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{title.length > 15 ? title.substring(0,15) + "..." : title}</h5>
                <p className="card-text">Author: {author}</p>
                <Link to="/book" className="btn btn-primary btn-block" state={{id, title, author, cover_image}}>View Book</Link>
            </div>
        </div>
    )
}

export default BookCard;