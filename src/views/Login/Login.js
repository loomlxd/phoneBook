import { useForm } from 'react-hook-form';
import { userActions } from '../../redux/user/user-slice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ReactComponent as RightArrow } from '../../icons/right-arrow.svg';
import { ReactComponent as PassClose } from '../../icons/pass-close.svg';
import { ReactComponent as PassOpen } from '../../icons/pass-open.svg';
import s from './Login.module.css';
import { getUserError } from '../../redux/user/user-selectors';
import { getUserAfterLogin } from '../../redux/user/user-actions';

function Login() {
  const [isPassClose, setIsPassClose] = useState(true);
  const { register, handleSubmit, formState } = useForm();

  const emailError = formState.errors['email']?.message;
  const passwordError = formState.errors['password']?.message;

  const dispatch = useDispatch();
  const error = useSelector(getUserError);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  function onSubmit(data) {
    dispatch(getUserAfterLogin(data));
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
          <h1 className={s.title}>LOGIN</h1>
          <RightArrow width={30} stroke="white" />
          <Link to={'/register'} className={s.link} onClick={linkClick}>
            Don't have an account?
          </Link>
        </div>
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
              required: 'Password not specified',
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
        <button className={s.btn}>Log in</button>
      </form>
    </>
  );
}

export default Login;
