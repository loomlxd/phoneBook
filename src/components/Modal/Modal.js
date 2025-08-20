/* eslint-disable react-hooks/exhaustive-deps */
import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import s from './Modal.module.css';
import { editOneContact } from '../../redux/contacts/contacts-actions';
import Form from '../Form';

const modalRoot = document.querySelector('#modal-root');

function Modal({ toggleModal, modalInfo }) {
  const dispatch = useDispatch();

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  function onKeyDown(e) {
    if (e.key !== 'Escape') {
      return;
    }

    toggleModal();
  }

  function handleClick(e) {
    if (e.target !== e.currentTarget) {
      return;
    }

    toggleModal();
  }

  function onSubmit(data) {
    if (toggleModal) {
      toggleModal();
    }
    dispatch(editOneContact({ id: modalInfo.id, data: data }));
  }

  return createPortal(
    <div className={s.backdrop} onClick={handleClick}>
      <div className={s.modal}>
        <h1>Editor</h1>
        <Form
          btnName={'Edit'}
          nameInfo={modalInfo.name}
          phoneInfo={modalInfo.phone}
          onSubmit={onSubmit}
        />
      </div>
    </div>,
    modalRoot,
  );
}

export default Modal;
