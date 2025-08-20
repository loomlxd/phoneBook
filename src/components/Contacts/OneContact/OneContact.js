import { useDispatch } from 'react-redux';
import s from './OneContact.module.css';
import { ReactComponent as Edit } from '../../../icons/edit.svg';
import { deleteOneContact } from '../../../redux/contacts/contacts-actions';

function OneContact({ name, phone, id, toggleModal }) {
  const dispatch = useDispatch();

  function onDeleteButtonClick() {
    dispatch(deleteOneContact(id));
  }

  return (
    <li className={s.container}>
      <span>
        <Edit
          width={20}
          className={s.edit}
          onClick={() => toggleModal(id, name, phone)}
        />
        {name}: {phone}
      </span>
      <button type="button" onClick={onDeleteButtonClick} className={s.btn}>
        DELETE
      </button>
    </li>
  );
}

export default OneContact;
