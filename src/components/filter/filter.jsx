import { RiUserSearchFill } from 'react-icons/ri';
import css from './filter.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { changeFilter } from 'store/filter/filterSlice';
import { getFilter } from 'store/getSelectors';

export const Filter = () => {
  const dispatch = useDispatch();

  const filter = useSelector(getFilter);

  const handleChangeFilter = filter => dispatch(changeFilter(filter));

  const changeInput = e => {
    handleChangeFilter(e.target.value);
  };
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
