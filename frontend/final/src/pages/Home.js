import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { FaEdit, FaTrash } from 'react-icons/fa';

const url = 'http://localhost:3001/api/book';

function Home() {
  const [books, setBooks] = useState([]);
  const [bookName, setBookName] = useState('Book List');
  const [count, setCount] = useState(0);
  const fetchBooks = () => {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setBooks(data.payload);
      })
      .catch(() => {
        setBooks([]);
      });
  };
  useEffect(() => {
    fetchBooks();
  }, []);
  return (
    <div className='container'>
      <div className='header-container'>
        <h1 className='mb-3 mt-5'>{bookName}</h1>
        <Link to='save'>
          <Button variant='primary'>Create Book</Button>
        </Link>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Book Name</th>
            <th>Author</th>
            <th>No Of Books</th>
            <th>Publisher</th>
            <th>URL</th>
            <th>Price</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {books?.length
            ? books.map((book) => {
                return (
                  <tr key={book._id}>
                    <td>{book.bookName}</td>
                    <td>{book.author}</td>
                    <td>{book.noOfBook}</td>
                    <td>{book.publisher}</td>
                    <td>{book.url}</td>
                    <td>{book.price}</td>
                    <td>
                      <Link to={`/save/${book._id}`}>
                        <FaEdit />
                      </Link>
                    </td>
                    <td>
                      <FaTrash />
                    </td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </Table>
    </div>
  );
}

export default Home;
