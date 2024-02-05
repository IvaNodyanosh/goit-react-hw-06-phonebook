import { RiUserSearchFill } from 'react-icons/ri';
import css from './filter.module.css';

export const Filter = ({ filter, changeInput }) => {
  return (
    <label className={css.filter__label}>
      <RiUserSearchFill className={css.filter__icon} />
      <input
        type="text"
        name="filter"
        className={css.filter__input}
        placeholder="Find contact by Name"
        required
        onChange={changeInput}
        value={filter}
      />
    </label>
  );
};
