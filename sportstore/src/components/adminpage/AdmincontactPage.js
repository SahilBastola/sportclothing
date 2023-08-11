import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminContactPage = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = () => {
    axios.get('http://localhost:4000/contact/')
      .then((res) => {
        console.log(res.data); // Check the value of res.data
        setContacts(res.data);
      })
      .catch((err) => console.log(err));
  };

  const deleteContact = (id) => {
    axios.delete(`http://localhost:4000/contact/${id}`)
      .then((res) => {
        console.log(res.data); // Check the response after deleting the contact
        fetchContacts(); // Fetch updated contacts after deletion
      })
      .catch((err) => console.log(err));
  };

  return (
    <section id="contact-form">
      <div className="container shadow-lg p-3 mt-5 py-5 rounded text-center">
        <div className="container">
          <h1 className="text-center my-5">Order Details</h1>
          <table className="table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact._id}>
                  <td>{contact.Fullname}</td>
                  <td>{contact.Email}</td>
                  <td>{contact.Description}</td>
                  <td>
                    <button className="btn btn-success mx-2">Verify</button>
                    <button className="btn btn-danger mx-2" onClick={() => deleteContact(contact._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default AdminContactPage;
