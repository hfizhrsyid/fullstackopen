const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

mongoose.connect(url)
    .then(result => {
        console.log('Connected to MongoDB')
    })
    .catch(error => {
        console.log('error connecting to MongoDB', error.message)
    })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true,
    },
    number: {
        type: String,
        minLength: 8,
        required: true,
        validate: {
            validator: (v) => {
                return /^\d{2,3}-\d{6,12}$/.test(v)
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

// const Person = mongoose.model('Person', personSchema)
module.exports = mongoose.model('Person', personSchema)

// if (process.argv.length === 3) {
//     Person.find({}).then(persons => {
//         persons.forEach(person => {
//             console.log(person)
//         })
//         mongoose.connection.close()
//     })
// } else {
//     const person = new Person({
//         name: process.argv[3],
//         number: process.argv[4],
//     })
    
//     person.save().then(result => {
//         console.log(`added ${result.name} number ${result.number} to phonebook`)
//         mongoose.connection.close()
//     })
// }