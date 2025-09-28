import PropTypes from 'prop-types';
import React from 'react';
 
class ContactInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        name: '',
        tag: '',
    };

    this.onNameChangeEventHandler = this.onNameChangeEventHandler.bind(this);
    this.onTagChangeEventHandler = this.onTagChangeEventHandler.bind(this);
    this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
  }

  onNameChangeEventHandler(event) {
    this.setState(() => {
        return { name: event.target.value };
    });
  }

  onTagChangeEventHandler(event) {
   this.setState(() => {
     return {
       tag: event.target.value,
     }
   });
 }
 
  onSubmitEventHandler(event) {
   event.preventDefault();
   this.props.addContact(this.state);
 }

 render() {
   return (
     <form className='contact-input' onSubmit={this.onSubmitEventHandler}>
       <input type="text" placeholder="Nama" onChange={this.onNameChangeEventHandler} />
       <input type="text" placeholder="Tag" onChange={this.onTagChangeEventHandler} />
       <button type="submit">Tambah</button>
     </form>
   )
 }
}

ContactInput.propTypes = {
  addContact: PropTypes.func.isRequired,
}
 
export default ContactInput;