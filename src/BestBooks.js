import React, { useEffect, useState } from 'react';

const BestBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Make a GET request to your API to fetch all the books
    fetch('/api/books') // Replace '/api/books' with your actual API endpoint
      .then(response => response.json())
      .then(data => {
        setBooks(data); // Update the books state with the fetched data
      })
      .catch(error => {
        console.log('Error fetching books:', error);
      });
  }, []);

  return (
    <>
      <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

      {books.length ? (
        /* Render the books in a Carousel component or any other desired UI */
        <div>
          {books.map(book => (
            <div key={book._id}>
              <h3>{book.title}</h3>
              <p>{book.description}</p>
              <p>Status: {book.status}</p>
            </div>
          ))}
        </div>
      ) : (
        <h3>No Books Found :(</h3>
      )}
    </>
  );
}

export default BestBooks;
