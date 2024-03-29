import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { FaEdit, FaTrash } from 'react-icons/fa';
import DeleteModal from '../components/DeleteModal';

const url = 'http://localhost:3001/api/booking';

function Home() {
  const [users, setUsers] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const fetchUsers = () => {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUsers(data.payload);
      })
      .catch(() => {
        setUsers([]);
      });
  };
  const deleteUser = (id) => {
    fetch(`${url}/${id}`, { method: 'DELETE' })
      .then((response) => {
        return response.json();
      })
      .then(() => {
        fetchUsers();
        setShowDeleteModal(false);
      })
      .catch(() => {});
  };
  const handleDeleteUserClick = (user) => {
    setShowDeleteModal(true);
    setSelectedUser({ ...user });
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div className='container'>
      <div className='header-container'>
        <h1 className='mb-3 mt-5'>User List</h1>
        <Link to='save'>
          <Button variant='primary'>Create User</Button>
        </Link>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>User Name</th>
            <th>RegNo</th>
            <th>Address</th>
            <th>URL</th>
            <th>Pickup Place</th>
            <th>BusNo</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users?.length
            ? users.map((user) => {
                return (
                  <tr key={user._id}>
                    <td>{user.userName}</td>
                    <td>{user.regNumber}</td>
                    <td>{user.address}</td>
                    <td>{user.pickupAddress}</td>
                    <td>{user.url}</td>
                    <td>{user.busNumber}</td>
                    <td>
                      <Link to={`/save/${user._id}`}>
                        <FaEdit />
                      </Link>
                    </td>
                    <td>
                      <FaTrash onClick={() => handleDeleteUserClick(user)} />
                    </td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </Table>
      <DeleteModal
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        {...selectedUser}
        deleteUser={deleteUser}
      />
    </div>
  );
}

export default Home;
