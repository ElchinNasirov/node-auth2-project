const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const usersRouter = require("./users/users-router")
const authRouter = require("./auth/auth-router")

const server = express()

server.use(cors())
server.use(express.json())
server.use(cookieParser())
server.use("/auth", authRouter)
server.use("/users", usersRouter)


module.exports = server