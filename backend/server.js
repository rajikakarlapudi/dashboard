const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

// Initialize SQLite database
const db = new sqlite3.Database('./mydatabase.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Create datasets table if it doesn't exist
db.run(
  `CREATE TABLE IF NOT EXISTS datasets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    addedDate TEXT NOT NULL,
    files TEXT
  )`,
  (err) => {
    if (err) {
      console.error('Error creating table:', err.message);
    } else {
      console.log('Table "datasets" ready.');
    }
  }
);

// Endpoint to save dataset
app.post('/api/save-data', (req, res) => {
  const { datasets } = req.body;

  if (!datasets || !Array.isArray(datasets) || datasets.length === 0) {
    return res.status(400).json({ message: 'Invalid datasets data' });
  }

  const stmt = db.prepare(
    'INSERT INTO datasets (name, description, addedDate, files) VALUES (?, ?, ?, ?)'
  );

  datasets.forEach((dataset) => {
    const { name, description, addedDate, files } = dataset;
    const filesString = JSON.stringify(files);
    stmt.run(name, description, addedDate, filesString, (err) => {
      if (err) {
        console.error('Error inserting dataset:', err.message);
      }
    });
  });

  stmt.finalize((err) => {
    if (err) {
      console.error('Error finalizing statement:', err.message);
      return res.status(500).json({ message: 'Internal server error' });
    }
    res.status(200).json({ message: 'Data saved successfully' });
  });
});

// Endpoint to get all datasets
app.get('/api/get-data', (req, res) => {
  const query = 'SELECT * FROM datasets';

  db.all(query, [], (err, rows) => {
    if (err) {
      console.error('Error retrieving data:', err.message);
      return res.status(500).json({ message: 'Internal server error' });
    }

    res.status(200).json(rows);
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Close the database connection when the app terminates
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err.message);
    } else {
      console.log('Closed the database connection.');
    }
    process.exit(0);
  });
});
