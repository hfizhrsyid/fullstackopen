require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const Person = require('./models/person')

app.use(express.json())
morgan.token('data', (req) => JSON.stringify(req.body))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))
app.use(express.static('dist'))


// let persons = [
//     {
//       "id": "1",
//       "name": "Arto Hellas",
//       "number": "040-123456"
//     },
//     {
//       "id": "2",
//       "name": "Ada Lovelace",
//       "number": "39-44-5323523"
//     },
//     {
//       "id": "3",
//       "name": "Dan Abramov",
//       "number": "12-43-234345"
//     },
//     {
//       "id": "4",
//       "name": "Mary Poppendieck",
//       "number": "39-23-6423122"
//     }
// ]

app.get('/', (request, response) => {
    response.send('Halo!')
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(people => {
        response.json(people)
    })
})

app.get('/info', async (request, response) => {
    const now = new Date()
    const timeString = now.toUTCString()

    console.log('Current time:', timeString)
    response.send(`<p>Phonebook has info for ${await Person.countDocuments( {}, { hint: '_id_' } )} people ${timeString}`)
})

app.get('/api/persons/:id', (request, response, next) => {
    Person
        .findById(request.params.id)
        .then(result => {
            if (result) {
                response.json(result)
            } else {
                response.send('No such person')
            }
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    console.log(request.params.id)
    Person
        .findByIdAndDelete(request.params.id)
        .then(result => {
            console.log(result)
            if (result) {
                response.json(result)
            } else {
                response.send('No such person')
            }
        })
        .catch(error => next(error))

})

// const generateRandomId = () => {
//   return Math.floor(Math.random() * 1000) + 1
// }

app.post('/api/persons', (request, response, next) => {
    const body = request.body

    if (!body.name) {
        return response.status(400).json({
            error: 'name is missing'
        })
    } else if (!body.number) {
        return response.status(400).json({
            error: 'number is missing'
        })
    } else if (Person.find({ name: body.name }).length > 0) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person
        .save()
        .then(result => {
            console.log(`${result.name} with number ${result.number} is saved to the phonebook`)
            response.json(person)
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const newPerson = new Person({
        name: request.body.name,
        number: request.body.number
    })
    Person
        .findById(request.params.id)
        .then(person => {
            if (!person) {
                return response.status(404).end()
            }

            person.name = newPerson.name
            person.number = newPerson.number

            return person.save().then(updatedPerson => response.json(updatedPerson))
        })
        .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})