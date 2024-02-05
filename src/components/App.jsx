import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './contactForm/contactForm';
import { Filter } from './filter/filter';
import { ContactList } from './contactList/contactList';

import css from './app.module.css';

export const App = () => {
  const [contacts, changeContacts] = useState([]);
  const [filter, changeFilter] = useState('');

  const changeInput = e => {
    changeFilter(e.target.value);
  };

  useEffect(() => {
    try {
      const contacts = localStorage.getItem('contacts');
      return contacts === null
        ? undefined
        : changeContacts(JSON.parse(contacts));
    } catch (error) {
      console.error('Get state error: ', error.message);
    }
  }, []);

  useEffect(() => {
    if (contacts.length !== 0) {
      try {
        localStorage.setItem('contacts', JSON.stringify(contacts));
      } catch (error) {
        console.error(error.message);
      }
    } else {
      try {
        localStorage.removeItem('contacts');
      } catch (error) {
        console.error(error.message);
      }
    }
  }, [contacts]);

  const formSubmit = (e, name, number) => {
    if (contacts.some(concat => concat.name === name)) {
      e.preventDefault();
      return alert(`${name}is already in contacts`);
    } else if (contacts.some(concat => concat.number === number)) {
      e.preventDefault();
      return alert(`${number}is already in contacts`);
    }
    e.preventDefault();
    changeContacts(prevContacts => [
      ...prevContacts,
      { id: nanoid(), name: name, number: number },
    ]);
  };

  const deleteContact = e => {
    const { id } = e.currentTarget;

    changeContacts(prevContacts =>
      prevContacts.filter(prevContact => prevContact.id !== id)
    );
  };

  const filterObjects = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );
  return (
    <div className={css.container}>
      <h1 className={css.phonebook__header}>Phonebook</h1>

      <ContactForm formSubmit={formSubmit} />
      <h2 className={css.phonebook__title}>Contacts</h2>
      <Filter changeInput={changeInput} filter={filter} />
      <ContactList
        filterObjects={filterObjects}
        deleteContact={deleteContact}
      />
    </div>
  );
};
