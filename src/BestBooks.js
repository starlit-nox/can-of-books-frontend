import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import axios from 'axios';

const BestBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Make a GET request to fetch all the books from the server
    fetch(`${process.env.REACT_APP_SERVER_URL}books`)
      .then(response => response.json())
      .then(data => setBooks(data))
      .catch(error => {
        console.log('Error fetching books:', error);
      });
  }, []);

  const deleteBook = async (bookId) => {
    try {
      // Make a DELETE request to the server to delete the book
      await axios.delete(`${process.env.REACT_APP_SERVER_URL}books/${bookId}`);
      // Update the books state by filtering out the deleted book
      setBooks(prevBooks => prevBooks.filter(book => book._id !== bookId));
      console.log('Book deleted:', bookId);
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <>
      <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

      {/* Check if there are books in the array */}
      {books.length > 0 ? (
        /* Render the books using a Bootstrap carousel */
        <Carousel>
          {/* Map over the books array and render each book as a Carousel.Item */}
          {books.map(book => (
            <Carousel.Item key={book._id}>
              <h3>{book.title}</h3>
              <p>{book.description}</p>
              <p>Status: {book.status}</p>
              {/* Add the Delete button with onClick event */}
              <button onClick={() => deleteBook(book._id)}>Delete</button> {/* Delete button */}
            </Carousel.Item>
          ))}
        </Carousel>
      ) : (
        /* Render a message if no books are found */
        <h3>No Books Found :(</h3>
      )}
    </>
  );
};

export default BestBooks;
