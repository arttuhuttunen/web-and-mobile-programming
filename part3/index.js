const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

let persons = [
    
      {
        name: "Arto Hellas",
        number: "040-123456",
        id: 1
      },
      {
        name: "Martti Tienari",
        number: "040-123456",
        id: 2
      },
      {
        name: "Arto Järvinen",
        number: "040-123456",
        id: 3
      },
      {
        name: "Lea Kutvonen",
        number: "040-123456",
        id: 4
      }   
]

app.get('/api/persons/', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const person = persons.find(person => person.id == id)
    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }  
})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id
    persons = persons.filter(person => person.id != id)
    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
    const body = req.body
    console.log(body)
    if (body.name === undefined || body.number === undefined || persons.map(person => person.name.toUpperCase()).includes(body.name.toUpperCase())) {
        return res.status(400).json({ error: 'name must be unique' }
        )
    }
    const person = {
        name: body.name,
        number: body.number,
        id: Math.floor(Math.random() * (100000 - 10000)) + 10000
    }
    //person.id = Math.floor(Math.random() * (100000 - 10000)) + 10000
    persons = persons.concat(person)
    
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
