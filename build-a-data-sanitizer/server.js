const express = require('express');
const path = require('path');
const { inputCleaner, inputValidator } = require('./middleware.js');

const app = express();

// 1. Parse incoming request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 2. Redirect root route BEFORE serving static files
app.get('/', (req, res) => {
  res.redirect('/form');
});

// 3. Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// 4. Serve the form route explicitly
app.get('/form', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 5. POST handler with route-level middleware
app.post('/submit', inputCleaner, inputValidator, (req, res) => {
  res.json({
    username: req.body.username,
    comment: req.body.comment
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});