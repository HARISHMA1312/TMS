import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const initialBook = {
  bookName: 'mani',
  author: 'mani',
  noOfBook: 10,
  publisher: 'mani',
  url: 'https://amazon.com',
  price: 122
};
const url = 'http://localhost:3001/api/book';
function SaveBook() {
  const { id } = useParams();
  const [bookInfo, setBookInfo] = useState(initialBook);
  const fetchBook = () => {};
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...bookInfo })
    })
      .then((doc) => {
        console.log(doc);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const setValueForm = (newValue, propName) => {
    if (propName === 'price' || propName === 'noOfBook') {
      newValue = Number(newValue);
    }
    setBookInfo((preBook) => ({ ...preBook, [propName]: newValue }));
  };
  return (
    <div className='container'>
      <div className='header-container'>
        <h1 className='mb-3 mt-5 text-center'>Create Book</h1>
        <Link to='/'>
          <Button variant='primary'>Back</Button>
        </Link>
      </div>
      <div className='container f1orm-container'>
        <Form onSubmit={handleSubmit}>
          <Form.Group className='mb-3' controlId='bookForm.bookName'>
            <Form.Label>Book Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='You can win'
              value={bookInfo.bookName}
              onChange={(e) => setValueForm(e.target.value, 'bookName')}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='bookForm.author'>
            <Form.Label>Author</Form.Label>
            <Form.Control
              type='text'
              placeholder='Shiv Karo'
              value={bookInfo.author}
              onChange={(e) => setValueForm(e.target.value, 'author')}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='bookForm.noOfBook'>
            <Form.Label>No of book</Form.Label>
            <Form.Control
              type='number'
              placeholder='1'
              value={bookInfo.noOfBook}
              onChange={(e) => setValueForm(e.target.value, 'noOfBook')}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='bookForm.publisher'>
            <Form.Label>publisher</Form.Label>
            <Form.Control
              type='text'
              placeholder='Mac Millan'
              value={bookInfo.publisher}
              onChange={(e) => setValueForm(e.target.value, 'publisher')}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='bookForm.publisher'>
            <Form.Label>URL</Form.Label>
            <Form.Control
              type='url'
              placeholder='https://www.amazon.com'
              value={bookInfo.url}
              onChange={(e) => setValueForm(e.target.value, 'url')}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='bookForm.price'>
            <Form.Label>Price</Form.Label>
            <Form.Control
              type='price'
              placeholder='100'
              value={bookInfo.price}
              onChange={(e) => setValueForm(e.target.value, 'price')}
            />
          </Form.Group>
          <Button type='submit' variant='primary' className='text-right'>
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default SaveBook;
