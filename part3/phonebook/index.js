const express = require('express')
const morgan = require('morgan')

const app = express()
app.use(express.json())

app.use(morgan('tiny', {
  skip: function(req, res) { return req.method === 'POST' }
}))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content', {
  skip: function(req, res) { return req.method !== 'POST' }
}))

morgan.token('content', (request, response) => {
  if (request.method === 'POST')
    return JSON.stringify(request.body)
  return null
})

persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
    response.send('<h1>PhoneBook API Server - Part3</h1>')
})

app.get('/info', (request, response) => {
  const entries = persons.length > 0 ? persons.length : 0
  const date = new Date()
  response.send(`<p>PhoneBook has info for ${entries} persons</p> ${date}`)
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
  response.status(204).end()
})

const generateId = () => {
  return Math.floor(Math.random() * 9999)
}

const checkName = (name) => {
  if (persons.find(person => person.name === name))
    return true
  return false
}

app.post('/api/persons', (request, response) => {
  const body = request.body
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'person info, name or number is missing'
    })
  }
  if (checkName(body.name))
    return response.status(400).json({
      error: 'name must be unique'
    })
  const person = {
    name: body.name,
    number: body.number,
    id: generateId()
  }
  persons = persons.concat(person)
  //console.log(`Adding person: ${person.name}`)
  response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Phonebook server running on port ${PORT}`)
})