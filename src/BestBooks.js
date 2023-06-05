import React, { useEffect, useState } from 'react';
import { Carousel, Button } from 'react-bootstrap';
import axios from 'axios';

const BestBooks = () => {
  const [books, setBooks] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // Check if books are stored in local storage
    const storedBooks = JSON.parse(localStorage.getItem('books'));
    if (storedBooks) {
      // If books are found in local storage, set the state with the stored books
      setBooks(storedBooks);
    } else {
      // If no books are found in local storage, fetch books from the server
      fetchBooks();
    }
  }, []);

  const fetchBooks = async () => {
    try {
      // Make a GET request to fetch books from the server
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}books`);
      const fetchedBooks = response.data;
      // Update the state with the fetched books
      setBooks(fetchedBooks);
      // Store the fetched books in local storage
      localStorage.setItem('books', JSON.stringify(fetchedBooks));
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const deleteBook = async (event, bookId) => {
    // Prevent the event from bubbling up to the Carousel and triggering the slide transition
    event.stopPropagation();
    try {
      // Make a DELETE request to delete the book from the server
      await axios.delete(`${process.env.REACT_APP_SERVER_URL}books/${bookId}`);
      setBooks(prevBooks => {
        // Filter out the deleted book from the current state
        const updatedBooks = prevBooks.filter(book => book._id !== bookId);
        // Update the state with the updated books
        setBooks(updatedBooks);
        // Store the updated books in local storage
        localStorage.setItem('books', JSON.stringify(updatedBooks));
        return updatedBooks;
      });
      console.log('Book deleted:', bookId);
      // Adjust the active index to stay on the current book after deletion
      setActiveIndex(prevIndex => (prevIndex === books.length - 1 ? prevIndex - 1 : prevIndex));
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <>
      <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

      {books.length > 0 ? (
        <Carousel activeIndex={activeIndex}>
          {books.map((book, index) => (
            <Carousel.Item key={book._id}>
              <h3>{book.title}</h3>
              <p>{book.description}</p>
              <p>Status: {book.status}</p>
              <Button
                variant="danger"
                onClick={(event) => deleteBook(event, book._id)}
              >
                Delete
              </Button>
            </Carousel.Item>
          ))}
        </Carousel>
      ) : (
        <h3>No Books Found :(</h3>
      )}
    </>
  );
};

export default BestBooks;
