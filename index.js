const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors')
const app = express()
const port = 5000
app.use(cors())
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(express.json());
//Available routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
connectToMongo();