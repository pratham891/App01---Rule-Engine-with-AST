const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const ruleRoutes = require('./routes/ruleRoutes');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://sanbox-user:HLbu9JqLvx8fVJmN@sandbox-cluster0.ckfzpbu.mongodb.net/?retryWrites=true&w=majority&appName=sandbox-cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to MongoDB");
}).catch(err => {
  console.error("Error connecting to MongoDB", err);
});

app.use('/api/rules', ruleRoutes);

app.get("/", (req, res) => {
  res.send(`backend server is running`);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
