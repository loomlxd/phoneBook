import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import s from './Contacts.module.css';
import { getAllContacts } from '../../redux/contacts/contacts-actions';
import Modal from '../Modal';
import Loading from '../Loading';
import {
  getFilteredContacts,
  getLoadingStatus,
  getError,
} from '../../redux/contacts/contacts-selectors';
import OneContact from './OneContact';

function Contacts() {
  const [modal, setModal] = useState(false);
  const [modalInfo, setModalInfo] = useState({});
  const filteredContacts = useSelector(state => getFilteredContacts(state));
  const isLoading = useSelector(getLoadingStatus);
  const error = useSelector(getError);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    dispatch(getAllContacts());
  }, [dispatch]);

  function toggleModal(id, name, phone) {
    setModalInfo({ id, name, phone });
    setModal(state => {
      document.body.style.overflow = !state ? 'hidden' : '';
      return !state;
    });
  }

  return (
    <ul className={s.container}>
      {modal && <Modal toggleModal={toggleModal} modalInfo={modalInfo} />}
      {isLoading && <Loading />}
      {!isLoading &&
        filteredContacts.map(contact => (
          <OneContact
            key={contact.id}
            id={contact.id}
            name={contact.name}
            phone={contact.phone}
            toggleModal={toggleModal}
          />
        ))}
      {!isLoading && filteredContacts.length === 0 && (
        <p className={s.notification}>No contacts found</p>
      )}
    </ul>
  );
}

export default Contacts;
