import Header from "./components/Header";
import Footer from "./components/Footer";
import BookIndex from "./pages/BookIndex";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookDetails from "./pages/BookDetails";
import NewBook from "./pages/NewBook";

import axios from "axios";
import { useState, useEffect } from "react";
import { API_URL } from "./constants";

function App() {

  return (
    <>
      <div className="App" style={{minHeight: '100vh'}}>
        <Header />
        <Navigator />
      </div>
      <Footer />
    </>
  );
}

export default App;

const Navigator = () => {

  // variable to store the list of books we get from the API
  const [bookData, setBookData] = useState([]);

  // this function fetches the list of books from the API
  useEffect(() => {
    axios.get(`${API_URL}/books`).then((response) => {
      setBookData(response.data);
    });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<BookIndex bookData={bookData} />} />
        <Route path="/book" exact element={<BookDetails />} />
        <Route path="/new" exact element={<NewBook />} />
      </Routes>
    </BrowserRouter>
  );
}