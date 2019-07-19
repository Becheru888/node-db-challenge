
const express = require('express')
const server = express()
const port = 3000
server.use(express.json());









const PORT = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});