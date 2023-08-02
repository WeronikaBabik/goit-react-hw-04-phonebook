import React, { Component } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import { nanoid } from 'nanoid';
import Filter from './Filter/Filter';

class App extends Component {
  state = {
    contacts: JSON.parse(localStorage.getItem('contact')) ?? [],
    // contacts: [
    //   { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    //   { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    //   { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    //   { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    // ],
    filter: '',
  };
  componentDidUpdate(prevState) {
    console.log(prevState);
    prevState.contacts !== this.state.contacts &&
      localStorage.setItem('contact', JSON.stringify(this.state.contacts));
  }
  addContact = ({ name, number }) => {
    this.setState(({ contacts }) => {
      let newContactAdded = contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      );

      if (newContactAdded) {
        alert(`${name} is already in contacts.`);
        return contacts;
      } else {
        const newContact = {
          id: nanoid(),
          name,
          number,
        };
        return {
          contacts: [newContact, ...contacts],
        };
      }
    });
  };
  deleteContact = id => {
    this.setState(prevState => {
      const newListOfContacts = [...prevState.contacts];
      newListOfContacts.splice(id, 1);
      return { contacts: newListOfContacts };
    });
  };
  filterOnChange = evt => {
    this.setState({ filter: evt.currentTarget.value });
  };
  filteredContacts = () => {
    return this.state.contacts
      .map(
        contact =>
          contact.name
            .toLowerCase()
            .includes(this.state.filter.toLowerCase()) && contact
      )
      .filter(contact => contact !== false);
  };
  render() {
    const newContacts = this.filteredContacts();
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
        <ContactForm onSubmit={this.addContact} />
        <h2>Contacts</h2>
        <Filter value={this.state.filter} onChange={this.filterOnChange} />
        {newContacts.length > 0 ? (
          <ContactList
            contacts={newContacts}
            deleteContact={this.deleteContact}
          />
        ) : (
          <p>No contacts</p>
        )}
      </div>
    );
  }
}

export default App;
