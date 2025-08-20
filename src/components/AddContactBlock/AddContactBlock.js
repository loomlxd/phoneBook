import { useDispatch, useSelector } from 'react-redux';
import s from './AddContactBlock.module.css';
import { addOneContact } from '../../redux/contacts/contacts-actions';
import { getContacts } from '../../redux/contacts/contacts-selectors';
import Form from '../Form';
import UserBlock from '../UserBlock';

function AddContactBlock({ toggleModal }) {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

  function onSubmit(info, setError, reset) {
    if (toggleModal) {
      toggleModal();
    }
    const findSameContactByName = contacts.find(
      contact => contact.name.toLowerCase() === info.name.toLowerCase(),
    );
    const findSamePhoneByName = contacts.find(
      contact => contact.phone === info.phone,
    );

    if (findSameContactByName) {
      setError('name', {
        type: 'exist',
        message: `${info.name} already exist`,
      });
      return;
    }

    if (findSamePhoneByName) {
      setError('phone', {
        type: 'exist',
        message: `${info.phone} already exist`,
      });
      return;
    }
    dispatch(addOneContact(info));
    reset({ phone: '', name: '' });
  }

  return (
    <div className={s.form_container}>
      <UserBlock />
      <h1>Add new contact</h1>
      <Form onSubmit={onSubmit} btnName={'Add contact'} />
    </div>
  );
}

export default AddContactBlock;
