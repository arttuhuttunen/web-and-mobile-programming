const mongoose = require('mongoose')
const Person = require('./models/person.js')


if (process.argv.length > 2) {
    const name = process.argv[2]
    const number = process.argv[3]



    const person = new Person({
        name: name,
        number: number
    })

    person.save().then(response => {
        console.log(`adding person ${name} number ${number} to the directory`)
        mongoose.connection.close()
    })
} else {
    console.log("puhelinluettelo:")
    Person.find({})
    .then(result => {
        result.forEach(person => {
            console.log(person.name + ' ' + person.number)
        })
        mongoose.connection.close()
    })
}

