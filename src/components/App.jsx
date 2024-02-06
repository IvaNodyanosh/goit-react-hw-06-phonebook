import { ContactForm } from './contactForm/contactForm';
import { Filter } from './filter/filter';
import { ContactList } from './contactList/contactList';

import css from './app.module.css';

export const App = () => {
 

 

  return (
    <div className={css.container}>
      <h1 className={css.phonebook__header}>Phonebook</h1>

      <ContactForm />
      <h2 className={css.phonebook__title}>Contacts</h2>
      <Filter />
      <ContactList />
    </div>
  );
};
