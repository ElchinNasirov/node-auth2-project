const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Users = require("../users/users-model")

const router = express.Router()

// Add new user(s)
router.post("/register", async (req, res, next) => {
    try {
        const { username } = req.body
        const user = await Users.findBy({ username }).first()

        if (user) {
            res.status(409).json({ message: "This username is not available" })
        }
        res.json(await Users.add(req.body))
    }
    catch (err) {
        next(err)
    }
})

// Login a registered user
router.post("/login", async (req, res, next) => {
    try {
        const user = await Users.findBy({ username: req.body.username }).first()

        if (!user) {
            res.status(401).json({ message: "Invalid username" })
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password)

        if (!validPassword) {
            res.status(401).json({ message: "Invalid password" })
        }

        const tokenPayload = {
            userId: user.id,
            userDepartment: user.department
        }

        res.json({
            message: `Welcome ${user.username}!`,
            token: jwt.sign(tokenPayload, process.env.JWT_SECRET),
        });
    }
    catch (err) {
        next(err)
    }
})

module.exports = router