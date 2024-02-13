const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'nani#143',
  database: 'mydb',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    throw err;
  }
  console.log('Connected to MySQL database!');
});

app.use(express.json());

app.post('/books', (req, res) => {
  const { title, author } = req.body;
  const query = 'INSERT INTO books (title, author) VALUES (?, ?)';
  db.query(query, [title, author], (err, results) => {
    if (err) {
      console.error('Error creating book:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.status(201).json({  title, author });
  });
});

app.put('/books/update', (req, res) => {
  const { title, author } = req.body;
  const query = 'UPDATE books SET author = ? WHERE title = ?';
  db.query(query, [author, title], (err, results) => {
    if (err) {
      console.error('Error updating book:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json({ title, author });
  });
});

app.delete('/books/delete', (req, res) => {
  const { title } = req.body; 
  console.log(req.body);  
  const query = 'DELETE FROM books WHERE title = ?';
  db.query(query, [title], (err) => {
    if (err) {
      console.error('Error deleting book:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json({ message: 'Book deleted successfully' });
  });
});


app.get('/books/show', (req, res) => {
  const query = 'SELECT * FROM books';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error reading books:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json({ books: results }); 
  });
});


app.get('/', (req, res) => {
    res.render('index.ejs');
});

const port = 8081;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
