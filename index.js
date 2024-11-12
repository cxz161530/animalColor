const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const cors = require('cors');
app.use(cors());

// Serve the JSON file when visiting the '/data' endpoint
app.get('/animalColor', (req, res) => {
  res.sendFile(path.join(__dirname, 'animalColor.json'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
