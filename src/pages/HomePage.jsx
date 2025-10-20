import React from 'react';
import ContactList from '../components/ContactList';
import SearchBar from '../components/SearchBar';
import { deleteContact, getContacts } from '../utils/data';
import { LocaleConsumer } from '../contexts/LocaleContext';

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        contacts: getContacts(),
        keyword: '',
    }

    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onKeywordChangeHandler = this.onKeywordChangeHandler.bind(this);
}

  onDeleteHandler(id) {
    deleteContact(id);

    // update the contact state from data.js
    this.setState(() => {
      return {
        contacts: getContacts(),
      }
    });
  }

  onKeywordChangeHandler(keyword) {
    this.setState(() => {
      return {
        keyword,
      }
    });
  }

  render() {
    const contacts = this.state.contacts.filter((contact) => {
      return contact.name.toLowerCase().includes(
        this.state.keyword.toLowerCase()
      );
    });

    return (
      <LocaleConsumer>
        {
          ({ locale }) => {
            return (
              <section>
                <SearchBar keyword={this.state.keyword} keywordChange={this.onKeywordChangeHandler} />
                <h2>{locale === 'id' ? 'Daftar Kontak' : 'Contact List'}</h2>
                <ContactList contacts={contacts} onDelete={this.onDeleteHandler} />
              </section>
            )
          }
        }
      </LocaleConsumer>
    )
  }
}

export default HomePage;