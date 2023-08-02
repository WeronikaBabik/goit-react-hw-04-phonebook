import React, { useEffect, useState } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import { nanoid } from 'nanoid';
import Filter from './Filter/Filter';

const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contact')) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contact', JSON.stringify(contacts));
  }, [contacts]);
  const addContact = ({ name, number }) => {
    let newContactAdded = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (newContactAdded) {
      alert(`${name} is already in contacts.`);
      return contacts;
    } else {
      const newContact = {
        id: nanoid(),
        name: name,
        number: number,
      };
      setContacts(contacts => [...contacts, newContact]);
    }
  };
  const deleteContact = id => {
    setContacts(contacts => {
      const newListOfContacts = [...contacts];
      newListOfContacts.splice(id, 1);
      return newListOfContacts;
    });
  };
  const filterOnChange = e => {
    setFilter(e.currentTarget.value.trim());
  };
  const getFilteredContacts = () =>
    contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  const filteredContacts = getFilteredContacts();
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 20,
        color: '#010101',
      }}
    >
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2>Contacts</h2>
      {contacts.length > 0 ? (
        <div>
          <Filter value={filter} onChange={filterOnChange} />
          <ContactList
            contacts={filteredContacts}
            deleteContact={deleteContact}
          />
        </div>
      ) : (
        <p>No contacts</p>
      )}
    </div>
  );
};

export default App;
