require("dotenv").config()
const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
var userRoute = require('./routes/UserRoute')

const db = require("./models");

db.sequelize.sync();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(userRoute);

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.get('/register', (req, res) => {
//     res.json({
//       success: 1,
//       message:"success"
//     })
// })

app.listen(process.env.PORT, () => {
  console.log('Example app listening on port', process.env.PORT)
})