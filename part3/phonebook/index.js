const express = require('express')
const app = express()
const morgan = require('morgan')

app.use(express.json())
morgan.token('data', (req) => JSON.stringify(req.body))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'));
app.use(express.static('dist'))

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
    response.send('Halo!')
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    const now = new Date();
    const timeString = now.toUTCString();

    console.log("Current time:", timeString);
    response.send(`<p>Phonebook has info for ${persons.length} people ${timeString}`)   
})

app.get('/api/persons/:id', (request, response) => {
    const person = persons.find(p => p.id === request.params.id)

    if (person) {
        response.json(person)
    } else {
        response.status(204).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const person = persons.find(p => p.id === request.params.id)
    persons = persons.filter(p => p !== person)

    response.json(person)
    response.status(204).end()
})

const generateRandomId = () => {
  return Math.floor(Math.random() * 1000) + 1
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name) {
        return response.status(400).json({
            error: "name is missing"
        })
    } else if (!body.number) {
        return response.status(400).json({
            error: "number is missing"
        })
    } else if (persons.find(person => person.name === body.name)) {
        return response.status(400).json({
            error: "name must be unique"
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateRandomId() 
    }

    persons = persons.concat(person)
    response.json(persons)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})