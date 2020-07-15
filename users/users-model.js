const db = require("../data/config")
const bcrypt = require("bcryptjs")

// async function add(newUser) {
//     const [id] = await db("users").insert(newUser)
//     return findById(id)
// }

async function add(user) {
    user.password = await bcrypt.hash(user.password, 14);
    const [id] = await db("users").insert(user);

    return findById(id);
}

const find = () => {
    return db("users")
        .select("id", "username")
}

const findBy = (filter) => {
    return db("users")
        .select("id", "username", "password", "department")
        .where(filter)
}

const findById = (id) => {
    return db("users")
        .select("id", "username", "department")
        .where({ id })
        .first()
}

module.exports = {
    add,
    find,
    findBy,
    findById
}