import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { useNavigate } from 'react-router-dom';

const initialBooking = {
  userName: 'User',
  regNumber: 'CE04',
  address: 'No.2,abc street,def-10',
  pickupAddress: 'location1',
  url: 'https://transportmanagement.com',
  busNumber: 122
};
const url = 'http://localhost:3001/api/booking';

const defaultUserTexts = {
  header: 'Create User',
  alert: 'User created successfully',
  showAlert: false,
  variant: 'success'
};
const updateUserTexts = {
  header: 'Update User',
  alert: 'User updated successfully',
  showAlert: false,
  variant: 'success'
};
function SaveUser() {
  const { id } = useParams();
  const [userInfo, setUserInfo] = useState(initialBooking);
  const [userText, setUserText] = useState(defaultUserTexts);
  const navigate = useNavigate();
  const fetchUser = () => {
    if (id) {
      setUserText(updateUserTexts);
      fetch(`${url}/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setUserInfo(data.payload[0] || initialBooking);
        });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let methodName = 'POST';
    let userData = JSON.stringify({
      userName: userInfo.userName,
      regNumber: userInfo.regNumber,
      address: userInfo.address,
      pickupAddress: userInfo.pickupAddress,
      url: userInfo.url,
      busNumber: userInfo.busNumber
    });
    let methodUrl = url;
    if (id) {
      methodName = 'PUT';
      methodUrl = `${methodUrl}/${id}`;
    }
    const options = {
      method: methodName,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: userData
    };
    fetch(methodUrl, options)
      .then((doc) => {
        setUserText({
          ...userText,
          showAlert: true,
          variant: 'success'
        });
        setTimeout(() => {
          navigate('/');
        }, 1000);
      })
      .catch((e) => {
        setUserText({
          ...userText,
          showAlert: true,
          variant: 'danger'
        });
      });
  };
  useEffect(() => {
    fetchUser();
  }, [id]);
  // const setValueForm = (newValue, propName) => {
  //   if (propName === 'price' || propName === 'noOfBook') {
  //     newValue = Number(newValue);
  //   }
  //   setUserInfo((preBook) => ({ ...preBook, [propName]: newValue }));
  // };
  const setValueForm = (newValue, propName) => {
    setUserInfo((prevUser) => ({
      ...prevUser,
      [propName]: newValue
    }));
  };
  return (
    <div className='container'>
      <div className='header-container'>
        <h1 className='mb-3 mt-5 text-center'>{userText.header}</h1>
        <Link to='/'>
          <Button variant='primary'>Back</Button>
        </Link>
      </div>
      <div className='container f1orm-container'>
        {userText.showAlert && (
          <Alert variant={userText.variant}>{userText.alert}</Alert>
        )}
        <Form onSubmit={handleSubmit}>
          <Form.Group className='mb-3' controlId='userForm.userName'>
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='User'
              value={userInfo.userName}
              onChange={(e) => setValueForm(e.target.value, 'userName')}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='userForm.regNumber'>
            <Form.Label>RegNo</Form.Label>
            <Form.Control
              type='text'
              placeholder='CE04'
              value={userInfo.regNumber}
              onChange={(e) => setValueForm(e.target.value, 'regNumber')}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='userForm.busNumber'>
            <Form.Label>Bus No</Form.Label>
            <Form.Control
              type='number'
              placeholder='1'
              value={userInfo.busNumber}
              onChange={(e) => setValueForm(e.target.value, 'busNumber')}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='userForm.address'>
            <Form.Label>Address</Form.Label>
            <Form.Control
              type='text'
              placeholder='No.2,abc street,def-10'
              value={userInfo.address}
              onChange={(e) => setValueForm(e.target.value, 'address')}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='userForm.url'>
            <Form.Label>URL</Form.Label>
            <Form.Control
              type='url'
              placeholder='https://www.transportmanagement.com'
              value={userInfo.url}
              onChange={(e) => setValueForm(e.target.value, 'url')}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='userForm.pickupAddress'>
            <Form.Label>Pickup place</Form.Label>
            <Form.Control
              type='text'
              placeholder='location1'
              value={userInfo.pickupAddress}
              onChange={(e) => setValueForm(e.target.value, 'pickupAddress')}
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

export default SaveUser;
