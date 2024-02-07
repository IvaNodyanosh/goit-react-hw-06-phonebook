import css from './contactList.module.css';
import { MdDeleteForever } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import { getFilter } from 'store/getSelectors';
import { getContacts } from 'store/getSelectors';
import { removeContact } from 'store/contacts/contactsSlice';

export const ContactList = () => {
  const filter = useSelector(getFilter);
  const contacts = useSelector(getContacts);
   const dispatch = useDispatch();

  const filterObjects = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

   const handleRemoveContact = contact => dispatch(removeContact(contact));

  const deleteContact = e => {
    const { id } = e.currentTarget;

    handleRemoveContact(id);
    console.log(id)
  };
  return (
    <ul className={css.contactList}>
      {filterObjects.map(({ id, number, name }) => (
        <li key={id} className={css.contactList__item}>
          <p className={css.contactList__text}>
            <span className={css.contactList__name}>{name}:</span> {number}
          </p>
          <button
            id={id}
            onClick={e => deleteContact(e)}
            type="button"
            className={css.contactList__button}
          >
            <MdDeleteForever className={css.contactList__icon} />
          </button>
        </li>
      ))}
    </ul>
  );
};
