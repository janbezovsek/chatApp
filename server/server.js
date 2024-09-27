const express = require('express')
const { chats } = require('./data/data')
const app = express()
const dbConnect = require("./configuration/db")
const { notFound, errorHandler } = require('./middleware/errorMiddleware')
const helmet = require("helmet")
const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors')
const userRoutes = require("./routes/userRoutes")
const chatRoutes = require("./routes/chatRoutes")
const messageRoutes = require("./routes/messageRoutes")
const port = process.env.PORT || 5000


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

//API endpoints for users
app.use('/api/user',userRoutes)

//API endpoints for chats
app.use("/api/chat", chatRoutes)

//API endpoint for sending and receiving message
app.use("/api/message", messageRoutes)


//error handlers
app.use(notFound)
app.use(errorHandler)

app.listen( port , () => console.log(`Server is running on port ${ port } `) 
)