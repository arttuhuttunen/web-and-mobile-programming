import React from 'react'
import axios from 'axios'

const baseUrl = '/api/persons'

const Person = ({person, removePerson}) => {
  return (
    <tr>
      <td >{person.name} {person.number}  <button onClick={(event) => removePerson(person.id, event)}>Delete</button></td>
    </tr>
  )
}

const NumberForm = ({addNumber, newName, handleNameChange, newNumber, handleNumberChange, persons, removePerson}) => {
  return(
    <div>
        <h2>Puhelinluettelo</h2>
        <form onSubmit={addNumber}>
          <div>
            nimi: <input  value={newName} onChange={handleNameChange} />
          </div>
          <div>
            numero: <input  value={newNumber} onChange={handleNumberChange} />
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        <table>
          <tbody>
            {persons.map(person => <Person key={person.id} person={person} removePerson={removePerson} />)}
          </tbody>
        </table>
      </div>
  )
}


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: ''
    }
  }

  componentDidMount() {
    axios.get(baseUrl).then(response => { this.setState({persons: response.data})})
  }

  addNumber = (event) => {
    event.preventDefault()
    console.log(this.state.newName)
    const phonebookObj = {name: this.state.newName, number: this.state.newNumber}
    //const persons = this.state.persons.concat(phonebookObj)
    if (this.state.persons.map(persons => persons.name.toUpperCase()).includes(phonebookObj.name.toUpperCase())) {
      alert('This number already exists-')
      return
    }
    axios.post(baseUrl, phonebookObj)
    .then(response => {
      this.setState({persons: this.state.persons.concat(response.data)})
    })
    
  }

  handleNameChange = (event) => {
    this.setState({ newName: event.target.value})
  }

  handleNumberChange = (event) => {
    this.setState({newNumber: event.target.value})
  }

  removePerson = (id, event) => {
    const person = this.state.persons.find(person => person.id === id)
    if (!window.confirm(`Are you sure you want to remove ${person.name}`)) {
      return
    }
    axios.delete(baseUrl + '/' + id, person)
    .then(response => 
      this.setState({persons: this.state.persons.filter(person => person.id !== id)})
    )
  }

  render() {
    return (
      <NumberForm addNumber={this.addNumber} newName={this.state.newName} handleNameChange={this.handleNameChange} newNumber={this.state.newNumber} handleNumberChange={this.handleNumberChange} persons={this.state.persons} removePerson={this.removePerson}/>
    )
  }
}

export default App
