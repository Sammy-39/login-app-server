const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
require("dotenv").config()

const ConnectDb = require("./db/connectDb")
const {notFound, errorHandler} = require("./middlewares/errorHandler")


const app = express()

app.use(cors({ origin: 'https://login-app-frontend.herokuapp.com', credentials: true }))
app.use(express.json())
app.use(express.static("public"))
app.use(cookieParser())

// Connect to mongodb
ConnectDb()

// routes
const usersRouter = require("./routes/users")

app.use("/api", usersRouter)

// error handlers
app.use(notFound)
app.use(errorHandler)


const port = process.env.PORT || 5000

app.listen(port, ()=>{
    console.log("Server is running on http://localhost:"+port)
})