import s from './MainPage.module.css';
import Contacts from '../../components/Contacts';
import FilterContacts from '../../components/FilterContacts';
import AddContactBlock from '../../components/AddContactBlock';

function MainPage() {
  return (
    <div className={s.container}>
      <div className={s.form_container}>
        <AddContactBlock btnName={'Add contact'} />
      </div>
      <div className={s.contacts_container}>
        <h1>Contacts</h1>
        <FilterContacts />
        <Contacts />
      </div>
    </div>
  );
}

export default MainPage;
