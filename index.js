require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const app = express()

app.use(express.static('dist'))
app.use(express.json())

morgan.token('body', (req) => {
  return req.body && Object.keys(req.body).length
    ? JSON.stringify(req.body)
    : ''
})

app.use(
  morgan(':method :url :status :res[content-length] - :total-time ms :body')
)
app.use(cors())

app.get('/api', (request, response) => {
  response.send(`
    <html>
        <head>
            <title>Persons API</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                }
                h1 {
                    text-align: center;
                    padding: 20px;
                    background-color: #4CAF50;
                    color: white;
                    margin: 0;
                }
                table {
                    width: 80%;
                    margin: 50px auto;
                    border-collapse: collapse;
                    background-color: white;
                }
                th, td {
                    padding: 15px;
                    text-align: left;
                    border-bottom: 1px solid #ddd;
                }
                th {
                    background-color: #f2f2f2;
                }
                tr:hover {
                    background-color: #f1f1f1;
                }
            </style>
        </head>
        <body>
            <h1>Persons API</h1>
            <table>
                <tr>
                    <th>Endpoint</th>
                    <th>Description</th>
                </tr>
                <tr>
                    <td><a href="/api/persons">/api/persons</a></td>
                    <td>All persons.</td>
                </tr>
                <tr>
                    <td><a href="/api/persons/1">/api/persons/{id}</a></td>
                    <td>Search by a person's id.</td>
                </tr>
                <tr>
                    <td><a href="/info">/info</a></td>
                    <td>Phonebook information, including the number of persons.</td>
                </tr>
            </table>
        </body>
    </html>
        `)
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons)
  })
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch((err) => next(err))
})

app.get('/info', (req, res, next) => {
  Person.countDocuments({})
    .then((count) => {
      res.send(`
        <html>
            <head>
                <title>Phonebook API Info</title>
            </head>
            <body>
                <h1>Phonebook Information</h1>
                <p>Phonebook has info for ${count} person${
                  count === 1 ? '' : 's'
                }</p>
                <p>${new Date()}</p>
            </body>
        </html>
        `)
    })
    .catch((err) => next(err))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch((err) => next(err))
})

app.post('/api/persons', async (req, res, next) => {
  const { name, number } = req.body

  const person = new Person({ name, number })

  person
    .save()
    .then((savedPerson) => {
      res.json(savedPerson)
    })
    .catch((err) => next(err))
})

app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body

  Person.findByIdAndUpdate(
    req.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' }
  )
    .then((updatedPerson) => {
      if (updatedPerson) {
        res.json(updatedPerson)
      } else {
        res.status(404).end()
      }
    })
    .catch((err) => next(err))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).json({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if(error.code === 11000){
    return response.status(400).json({ error: `Name must be unique. '${Object.values(error.keyValue)}' already exists.` })
  }

  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`)
})
