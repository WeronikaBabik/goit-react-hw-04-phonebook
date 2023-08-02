import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import css from './ContactForm.module.css';

const INITIAL_STATE = {
  contacts: [],
  name: '',
  number: '',
};
class ContactForm extends Component {
  state = { ...INITIAL_STATE };
  handleChange = evt => {
    const { name, value } = evt.currentTarget;

    this.setState({ [name]: value });
  };
  handleSubmit = evt => {
    evt.preventDefault();
    this.props.onSubmit({ ...this.state });
    this.reset();
  };
  reset = () => {
    this.setState({ ...INITIAL_STATE });
  };
  inputId = nanoid();
  render() {
    return (
      <div>
        <form className={css.contactForm} onSubmit={this.handleSubmit}>
          <label htmlFor={this.inputId} className={css.contactLabel}>
            Name
          </label>
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+((['\-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={this.state.name}
            onChange={this.handleChange}
            className={css.contactInput}
          />
          <label htmlFor={this.inputId} className={css.contactLabel}>
            Number
          </label>
          <input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[\-.\s]?\(?\d{1,3}?\)?[\-.\s]?\d{1,4}[\-.\s]?\d{1,4}[\-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={this.state.number}
            onChange={this.handleChange}
            className={css.contactInput}
          />
          <button type="submit" className={css.addContactButton}>
            Add contact
          </button>
        </form>
      </div>
    );
  }
}
ContactForm.propTypes = {
  addContact: PropTypes.object,
};
export default ContactForm;
