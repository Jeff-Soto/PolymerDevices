const express = require('express'),
      cors = require('cors');
      app = express();

app.use(cors())

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

app.get("/api/devices/:deviceId", (req, res) => {
  // send only 1 item from array using deviceId
  let deviceID = req.params.deviceId;
  let device = devices.findIndex(device => device.id == deviceID);
  res.json(devices[device]);
});

app.listen(3000);
