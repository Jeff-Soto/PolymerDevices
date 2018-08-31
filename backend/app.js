const express = require('express'),
      app = express();

const devices = [
    {
      name: 'iPhone X',
      description: 'The latest model of iPhone',
      id: 1
    },
    {
      name: 'Xbox One',
      description: 'Better than PlayStation 4',
      id: 2
    },
    {
      name: 'Laptop',
      description: 'The mobile version of a Desktop',
      id: 3
    },
    {
      name: 'Coffee Machine',
      description: 'Currently in need of one',
      id: 4
    }
];

app.get("/api/devices", (req, res) => {
  res.json(devices);
});

app.get('/', (req, res) => {
  res.send('server root');
});

app.listen(3000);
