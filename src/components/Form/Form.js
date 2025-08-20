/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import s from './Form.module.css';

function Form({ btnName, nameInfo, phoneInfo, onSubmit }) {
  const {
    register,
    handleSubmit,
    reset,
    formState,
    setError,
    watch,
    setValue,
  } = useForm({
    mode: 'onChange',
  });

  const phoneWatch = watch('phone');
  const prevPhoneLength = useRef(0);

  const nameError = formState.errors['name']?.message;
  const phoneError = formState.errors['phone']?.message;

  useEffect(() => {
    if (nameInfo && phoneInfo) {
      reset({ name: nameInfo, phone: phoneInfo });
    }
  }, [nameInfo, phoneInfo]);

  useEffect(() => {
    if (!phoneWatch) {
      return;
    }

    if (phoneWatch.length > prevPhoneLength.current) {
      if (phoneWatch.length === 3 || phoneWatch.length === 7) {
        setValue('phone', `${phoneWatch}-`);
      }
    }

    prevPhoneLength.current = phoneWatch.length;
  }, [phoneWatch]);
  return (
    <form
      className={s.form}
      onSubmit={handleSubmit(info => onSubmit(info, setError, reset))}
    >
      <label className={s.label}>
        <p className={s.label_text}>Name</p>
        <input
          type="text"
          autoComplete="off"
          className={`${s.input} ${nameError && s.error}`}
          {...register('name', {
            minLength: {
              value: 2,
              message: 'Please write a longer name',
            },
            maxLength: {
              value: 20,
              message: 'Please write a shorter name',
            },
            required: 'Name not specified',
          })}
        />
        {nameError && <p className={s.name_error}>{nameError}</p>}
      </label>
      <label className={s.label}>
        <p className={s.label_text}>Phone</p>
        <input
          type="tel"
          autoComplete="off"
          placeholder="Format: 123-456-7890"
          className={`${s.input} ${phoneError && s.error}`}
          {...register('phone', {
            pattern: {
              value: /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/,
              message: 'Format: 123-123-1234',
            },
            required: 'Phone not specified',
          })}
        />
        {phoneError && <p className={s.number_error}>{phoneError}</p>}
      </label>
      <button className={s.btn} disabled={phoneError || nameError}>
        {btnName}
      </button>
    </form>
  );
}

export default Form;
