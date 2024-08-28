const express = require('express')
const { chats } = require('./data/data')
const app = express()
const dbConnect = require("./configuration/db")
const helmet = require("helmet")
const dotenv = require('dotenv')
dotenv.config()
const port = process.env.PORT || 5000
const cors = require('cors')

// For parsing application/json
app.use(express.json())

// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(cors())

// enabling the Helmet middleware,///////new line of code added for security
app.use(helmet())

// execute database connection 
dbConnect()


// Curb Cores Error by adding a header here
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
  });




app.get('/', (req, res) =>{
    res.send("API is running")
})

app.get('/api/chat', (req, res) =>{
    
    res.send(chats)
})

app.get('/api/chat/:id', (req, res) =>{
    const singleChat = chats.find((chat) => chat._id === req.params.id)
    res.send(singleChat)
})

app.listen( port , () => console.log(`Server is running on port ${ port } `) 
)