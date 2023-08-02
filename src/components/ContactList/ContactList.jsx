import React from 'react';
import css from './ContactList.module.css';
import PropTypes from 'prop-types';

const ContactList = ({ contacts, deleteContact }) => {
  return (
    <ul className={css.listOfContacts}>
      {contacts.map(({ id, name, number }) => (
        <li key={id} className={css.contact}>
          <p>{name}:&nbsp;</p>
          <p>{number}</p>
          <button type="button" className={css.btn} onClick={deleteContact}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};
ContactList.propTypes = {
  deleteContact: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    })
  ),
};
export default ContactList;
