import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ReactComponent as RightArrow } from '../../icons/right-arrow.svg';
import { ReactComponent as PassClose } from '../../icons/pass-close.svg';
import { ReactComponent as PassOpen } from '../../icons/pass-open.svg';
import s from './Register.module.css';
import { getUserAfterRegister } from '../../redux/user/user-actions';
import { getUserError } from '../../redux/user/user-selectors';
import { userActions } from '../../redux/user/user-slice';

function Register() {
  const [isPassClose, setIsPassClose] = useState(true);
  const { register, handleSubmit, formState } = useForm();

  const emailError = formState.errors['email']?.message;
  const nameError = formState.errors['name']?.message;
  const passwordError = formState.errors['password']?.message;

  const dispatch = useDispatch();
  const error = useSelector(getUserError);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  function onSubmit(data) {
    dispatch(getUserAfterRegister(data));
  }

  function linkClick() {
    dispatch(userActions.wipeError());
  }

  function togglePassShow() {
    setIsPassClose(state => !state);
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={s.container}>
        <div className={s.title_container}>
          <h1 className={s.title}>REGISTER</h1>
          <RightArrow width={30} stroke="white" />
          <Link to={'/login'} className={s.link} onClick={linkClick}>
            Already have an account?
          </Link>
        </div>

        <label className={s.label}>
          <input
            autoComplete="off"
            type="text"
            placeholder="name..."
            {...register('name', {
              required: 'Name not specified',
            })}
            className={`${s.input} ${nameError && s.error}`}
          />
          {nameError && <p className={s.name_error}>{nameError}</p>}
        </label>
        <label className={s.label}>
          <input
            autoComplete="off"
            type="email"
            placeholder="email..."
            {...register('email', {
              required: 'Email not specified',
            })}
            className={`${s.input} ${emailError && s.error}`}
          />
          {emailError && <p className={s.email_error}>{emailError}</p>}
        </label>
        <label className={s.label}>
          <input
            autoComplete="off"
            type={isPassClose ? 'password' : 'text'}
            placeholder="password..."
            {...register('password', {
              required: 'Email not specified',
            })}
            className={`${s.input} ${passwordError && s.error}`}
          />
          <div className={s.pass_show} onClick={togglePassShow}>
            {isPassClose ? (
              <PassClose width={30} stroke="white" />
            ) : (
              <PassOpen width={30} stroke="white" />
            )}
          </div>
          {passwordError && <p className={s.password_error}>{passwordError}</p>}
        </label>
        <button className={s.btn}>Register</button>
      </form>
    </>
  );
}

export default Register;
