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

//Socket.io setup
const server = app.listen( port , () => console.log(`Server is running on port ${ port } `) 
)

const io = require("socket.io")(server, { 
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
})

io.on("connection", (socket)=> {
  console.log("connected to socket.io")

  socket.on("setup", (userData)=> {
    socket.join(userData._id)
    socket.emit("connected")
  })

  socket.on("join chat", (room) => {
    socket.join(room)
    console.log("user joined room:" + room)
  })

  socket.on("typing", (room) => socket.in(room).emit("typing"))

  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"))

  socket.on("new message", (newMessageReceived) => {
    var chat = newMessageReceived.chat

    if(!chat.users) return console.log("chat.users not defined")

    chat.users.forEach(user => {
      if(user._id == newMessageReceived.sender._id) return

      socket.in(user._id).emit("message recieved", newMessageReceived)
    })
  })

  //turning of socket to save bandwidth when not messaging
  socket.off("setup", ()=> {
    console.log("user disconnected")
    socket.leave(userData._id)
  })
})

