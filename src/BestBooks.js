import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
// import axios from 'axios';

const BestBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Make a GET request to your API to fetch all the books
     fetch(`${process.env.REACT_APP_SERVER_URL}books`)    // Molly's API, calling backend to frontend
      .then(response => {
        let fixJson = response.json()
        console.log(fixJson)
        return (fixJson)
      })
      .then(data => {
        console.log(data)
        setBooks(data)
      })
     
      // Update the books state with the fetched data
      // })
      .catch(error => {
        console.log('Error fetching books:', error);
      });
  }, []);

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
            </Carousel.Item>
          ))}
        </Carousel>
      ) : (
        /* Render a message if no books are found */
        <h3>No Books Found :(</h3>
      )}
    </>
  );
}

export default BestBooks;
