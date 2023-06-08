import React, { useEffect, useState } from 'react';
import { Carousel, Button } from 'react-bootstrap';
import BookFormModal from './BookFormModal';
import axios from 'axios';
import EditBookModal from './EditBookFormModal';
import { useAuth0 } from '@auth0/auth0-react';

const BestBooks = () => {
  const [books, setBooks] = useState([]); // State to store the books data
  const [activeIndex, setActiveIndex] = useState(0); // State to manage the active index of the Carousel
  const { getAccessTokenSilently } = useAuth0(); // Auth0 hook for accessing the access token

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const API = `${process.env.REACT_APP_SERVER_URL}/books`; // API URL for fetching books
        const token = await getAccessTokenSilently(); // Get the access token
        const res = await axios.get(API, { headers: { Authorization: `Bearer ${token}` } }); // Make GET request to fetch books
        console.log(res.data);
        setBooks(res.data); // Update the books state with the fetched data
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks(); // Fetch books when the component mounts
  }, [getAccessTokenSilently]);

  const deleteBook = async (event, bookId) => {
    event.stopPropagation();
    try {
      const API = `${process.env.REACT_APP_SERVER_URL}/books/${bookId}`; // API URL for deleting a book
      const token = await getAccessTokenSilently(); // Get the access token
      await axios.delete(API, { headers: { Authorization: `Bearer ${token}` } }); // Make DELETE request to delete the book
      console.log('Book deleted:', bookId);
      window.location.reload(false); // Reload the page to reflect the updated book list
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const editBook = (editBook) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) => (book._id === editBook._id ? editBook : book)) // Update the book with the edited book data
    );
  };

  const handleCarouselItemClick = () => {
    // Do nothing when clicking on Carousel.Item to prevent moving the Carousel
  };

  return (
    <>
      <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

      {books.length > 0 ? (
        <Carousel activeIndex={activeIndex} onSelect={index => setActiveIndex(index)}>
          {books.map((book, index) => (
            <Carousel.Item key={book._id} onClick={handleCarouselItemClick}>
              <div>
                <h3>{book.title}</h3>
                <p>{book.description}</p>
                <p>Status: {book.status}</p>
              </div>
              <div className='moveButtons'>
                <Button variant="danger" onClick={(event) => deleteBook(event, book._id)}>
                  Delete
                </Button>
                <EditBookModal book={book} updateBook={editBook} />
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      ) : (
        <h3>No Books Found :(</h3>
      )}
      <BookFormModal books={books} setBooks={setBooks} />
    </>
  );
};

export default BestBooks;
