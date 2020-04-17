const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(bodyParser.json())
app.use(cors())
const Person = require('./models/person.js')
app.use(express.static('build'))

let persons = []

app.get('/api/persons/', (req, res) => {
    Person.find({})
    .then(result => {
        persons = result
        res.json(persons)
    })
})

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    Person.find({"id": id}).then(person => {
        if (person.length != 0) {
            res.json(person)
        } else {
            res.status(404).end()
        }
    })
})
    

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id
    Person.remove({"id": id}).then(result => {
        console.log(result)
        res.status(204).end()
    })
    .catch(error => {
        console.log(error)
        res.status(400).send({ error: 'malformatted id' })
      })
})

app.post('/api/persons', (req, res) => {
    const body = req.body
    if (body.name === undefined || body.number === undefined || persons.map(person => person.name.toUpperCase()).includes(body.name.toUpperCase())) {
        return res.status(400).json({ error: 'name must be unique' }
        )
    } else {
    const person = new Person ({
        name: body.name,
        number: body.number,
        id: Math.floor(Math.random() * (100000 - 10000)) + 10000
    })
    person.save().then(response => {
        console.log(`adding person ${person.name} number ${person.number} to the directory`)
        res.json(response)
    })
    //res.json(person)
}
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

