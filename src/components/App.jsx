import { nanoid } from 'nanoid';

import { ContactForm } from './contactForm/contactForm';
import { Filter } from './filter/filter';
import { ContactList } from './contactList/contactList';

import { addContact } from 'store/contacts/contactsSlice';
import { removeContact } from 'store/contacts/contactsSlice';
import { changeFilter } from 'store/filter/filterSlice';

import { getContacts, getFilter } from 'store/getSelectors';

import css from './app.module.css';

import { useDispatch, useSelector } from 'react-redux';


export const App = () => {
  const dispatch = useDispatch();

  const filter = useSelector(getFilter);
  const contacts = useSelector(getContacts);

  const handleChangeFilter = filter => dispatch(changeFilter(filter));
  const handleAddContact = contact => dispatch(addContact(contact));
  const handleRemoveContact = contact => dispatch(removeContact(contact));

  const changeInput = e => {
    handleChangeFilter(e.target.value);
  };

  const formSubmit = (e, name, number) => {
    if (contacts.some(contact => contact.name === name)) {
      e.preventDefault();
      return alert(`${name}is already in contacts`);
    } else if (contacts.some(contact => contact.number === number)) {
      e.preventDefault();
      return alert(`${number}is already in contacts`);
    }
    e.preventDefault();
    handleAddContact({ id: nanoid(), name: name, number: number });
  };

  const deleteContact = e => {
    const { id } = Number(e.currentTarget);

    handleRemoveContact(id);
  };

  console.log(contacts)

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
