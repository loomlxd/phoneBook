/* eslint-disable react-hooks/exhaustive-deps */
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import s from './FilterContacts.module.css';
import { filterActions } from '../../redux/filter/filter-slicer';

function FilterContacts() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { register, reset, watch } = useForm();
  const filterWatch = watch('filter');

  const filterOrder = new URLSearchParams(location.search).get('filter');

  useEffect(() => {
    if (filterWatch) {
      navigate({
        ...location,
        search: `filter=${filterWatch.toLowerCase()}`,
      });
    } else {
      navigate({ ...location, search: '' });
    }

    dispatch(filterActions.change(filterWatch));
  }, [dispatch, filterWatch]);

  useEffect(() => {
    if (filterOrder) {
      dispatch(filterActions.change(filterOrder));
      reset({ filter: filterOrder });
    }
  }, []);

  return (
    <form className={s.form}>
      <label className={s.label}>
        Find contacts by name
        <input type="text" className={s.input} {...register('filter')} />
      </label>
    </form>
  );
}

export default FilterContacts;
