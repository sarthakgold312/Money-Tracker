// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// Import the Transaction model
const Transaction = require('./models/transaction');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/money-tracker', {
  // No need for useNewUrlParser and useUnifiedTopology
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Define routes
app.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.render('index', { transactions });
  } catch (error) {
    res.status(500).send('Error retrieving transactions');
  }
});

app.post('/add-transaction', async (req, res) => {
  try {
    const { type, amount, description } = req.body;
    const newTransaction = new Transaction({ type, amount, description });
    await newTransaction.save();
    res.redirect('/');
  } catch (error) {
    res.status(500).send('Error adding transaction');
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
