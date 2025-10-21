import React from 'react';
import { useSearchParams } from 'react-router-dom';
import ContactList from '../components/ContactList';
import SearchBar from '../components/SearchBar';
import { deleteContact, getContacts } from '../utils/data';
import LocaleContext from '../contexts/LocaleContext';

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [contacts, setContacts] = React.useState([]); // State to hold contacts
  const [keyword, setKeyword] = React.useState(() => searchParams.get('keyword') || '');
  const { locale } = React.useContext(LocaleContext); // Access locale from context

  React.useEffect(() => {
    setContacts(getContacts());
  }, []);

  function onDeleteHandler(id) {
    deleteContact(id);
    setContacts(getContacts());
  }

  function onKeywordChangeHandler(keyword) {
    setKeyword(keyword);
    setSearchParams({ keyword });
  }

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(keyword.toLowerCase())
  );
  
  return (
    <section>
      <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler} />
      <h2>{locale === 'id' ? 'Daftar Kontak' : 'Contact List'}</h2>
      <ContactList contacts={filteredContacts} onDelete={onDeleteHandler} />
    </section>
  );
}

export default HomePage;