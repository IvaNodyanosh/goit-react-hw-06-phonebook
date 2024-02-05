import css from './contactForm.module.css';
import { useState } from 'react';
import { RiContactsFill } from 'react-icons/ri';
import { BsTelephoneFill } from 'react-icons/bs';
import { BsPersonFillAdd } from 'react-icons/bs';

export const ContactForm = ({ formSubmit }) => {
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
