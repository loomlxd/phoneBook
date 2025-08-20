import { useSelector, useDispatch } from 'react-redux';
import s from './UserBlock.module.css';
import { ReactComponent as Exit } from '../../icons/exit.svg';
import avatar from '../../images/user-photo.jpg';
import { getUserName } from '../../redux/user/user-selectors';
import { logOutCurrentUser } from '../../redux/user/user-actions';

function UserBlock() {
  const userName = useSelector(getUserName);
  const dispatch = useDispatch();

  function handleClick() {
    dispatch(logOutCurrentUser());
  }

  return (
    <div className={s.container}>
      <Exit
        width={30}
        stroke="rgb(255, 137, 137)"
        className={s.exit}
        onClick={handleClick}
      />
      <p className={s.title}>Hi {userName}</p>
      <img src={avatar} alt={userName} className={s.img} />
    </div>
  );
}

export default UserBlock;
