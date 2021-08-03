import logo from './logo.svg';
import './App.css';
import contacts from './contacts.json'
import { useState } from 'react';

function App() {

  const [ contactList, setContactList ] = useState(contacts.slice(0,5))


  const addContact = (event) => {

    event.preventDefault()

    const filteredContacts = contacts.filter((contact) => {
      return !contactList.find((existingContact) => {
        return existingContact.id === contact.id
      })
    })

    const randomIndex = Math.floor(Math.random() * filteredContacts.length)
    const selectedContact = filteredContacts[randomIndex]

    setContactList([
      ...contactList,
      {
        name: selectedContact.name,
        pictureUrl: selectedContact.pictureUrl,
        popularity: selectedContact.popularity,
        id: selectedContact.id
      },
    ])

    
    
  }

  const sortName = (event) => {

    event.preventDefault()

    const sortedContacts = contactList.sort((a, b) => a.name.localeCompare(b.name))
    setContactList([
      ...sortedContacts,
     
    ])
    
  }

  const sortPopularity = (event) => {

    event.preventDefault()

    const sortedPopularity = contactList.sort((a, b) => b.popularity - a.popularity)
    setContactList([
      ...sortedPopularity,

    ])
  }

  const deleteContact = (event, contact) => {

    event.preventDefault()

    const filteredArray = contactList.filter((e) => {

      return e.id !== contact.id

    })

    setContactList(filteredArray)

  }

  return (
    <>
      <h1>IronContacts</h1>
      <button onClick={(event) => {
        addContact(event)
      }}>Add Random Contact</button>
      <button onClick={(event) => {
        sortName(event)
      }}>Sort by Name</button>
      <button onClick={(event) => {
        sortPopularity(event)
      }}>Sort by Popularity</button>
      <table>
        <tr>
          <th>Picture</th>
          <th>Name</th>
          <th>Popularity</th>
          <th>Action</th>
        </tr>
        {
          contactList.map((contact) => {
            return(
              <tr>
                <td><img src={contact.pictureUrl} width="50" height="80"/></td>
                <td>{contact.name}</td>
                <td>{contact.popularity}</td>
                <td><button onClick={ (e) => { deleteContact(e, contact) } }>Delete</button></td>
              </tr>
            )
          })
        }
      </table>
    </>
  );
}

export default App;
