const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as an argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@cluster0.30pdy.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  number: {
    type: String,
    required: true,
    validate: {
      validator: (v) => /^\+?[0-9\s\-()]{7,15}$/.test(v),
      message: (props) => `${props.value} is not a vaild phone number!`,
    },
  },
});

const Contact = mongoose.model("Contact", contactSchema);

const contact = new Contact({
  name: process.argv[3],
  number: process.argv[4],
});

if (process.argv.length === 5) {
  contact
    .save()
    .then((result) => {
      console.log(`added ${result.name} number ${result.number} to phonebook`);
      mongoose.connection.close();
    })
    .catch((err) => {
      console.log(err.message);
      mongoose.connection.close();
    }).finally(()=>{
        console.log('finally');
        
    })
} else if (process.argv.length === 3) {
  Contact.find({}).then((result) => {
    console.log("Phonebook:");
    result.forEach((contact) => {
      console.log(contact.name, " ", contact.number);
    });
    mongoose.connection.close();
  });
}
