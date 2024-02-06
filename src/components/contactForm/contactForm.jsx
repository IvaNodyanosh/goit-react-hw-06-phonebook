import css from './contactForm.module.css';
import { useState } from 'react';
import { RiContactsFill } from 'react-icons/ri';
import { BsTelephoneFill } from 'react-icons/bs';
import { BsPersonFillAdd } from 'react-icons/bs';
import { addContact } from 'store/contacts/contactsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import { getContacts } from 'store/getSelectors';



export const ContactForm = () => {

  const dispatch = useDispatch();

  const handleAddContact = contact => dispatch(addContact(contact));
  const contacts = useSelector(getContacts);

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

  const [contactInfo, changeContactInfo] = useState({
    name: '',
    number: '',
  });

  const changeInput = e => {
    changeContactInfo(prevInfo => ({
      ...prevInfo,
      [e.target.name]: e.target.value,
    }));
  };

  const formReset = () => {
    changeContactInfo({ name: '', number: '' });
  };

  const { name, number } = contactInfo;
  return (
    <form
      onSubmit={e => {
        formSubmit(e, name, number);
        formReset();
      }}
      className={css.contactForm}
    >
      <label>
        <RiContactsFill className={css.contactForm__icon} />
        <input
          type="text"
          name="name"
          required
          onChange={changeInput}
          value={name}
          placeholder="Name"
        />
      </label>
      <label>
        <BsTelephoneFill className={css.contactForm__icon} />
        <input
          type="tel"
          name="number"
          required
          onChange={changeInput}
          value={number}
          placeholder="Number"
        />
      </label>
      <button type="submit" className={css.contactForm__button}>
        <BsPersonFillAdd className={css.contactForm__iconAdd} />
      </button>
    </form>
  );
};
