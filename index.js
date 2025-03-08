const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

app.use(express.static('dist'))
app.use(express.json());

morgan.token("body", (req) => {
  return req.body && Object.keys(req.body).length
    ? JSON.stringify(req.body)
    : "";
});

app.use(
  morgan(":method :url :status :res[content-length] - :total-time ms :body")
);
app.use(cors());

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (request, response) => {
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
        `);
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const person = persons.find((p) => p.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.get("/info", (req, res) => {
  res.send(`
        <html>
            <head>
                <title>Phonebook API Info</title>
            </head>
            <body>
                <h1>Phonebook Information</h1>
                <p>Phonebook has info for ${persons.length} person${
    persons.length === 1 ? "" : "s"
  }</p>
                <p>${new Date()}</p>
            </body>
        </html>
        `);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  persons = persons.filter((person) => person.id !== id);

  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const body = req.body;
  console.log("hii", req.body);
  if (!body) {
    return res.status(400).json({error:"Body is empty."})
  } else if (!body.name) {
    return res.status(400).json({ error: "Name is missing." });
  } else if (!body.number) {
    return res.status(400).json({ error: "Number is missing." });
  } else if (
    persons.some((p) => p.name.toLowerCase() === body.name.toLowerCase())
  ) {
    return res.status(400).json({ error: `name must be unique` });
  }

  const newPerson = {
    id: (Math.random() * 10000).toFixed(0),
    name: body.name,
    number: body.number,
  };

  persons.push(newPerson);

  res.json(newPerson);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
});
