const server = require("./server")

const PORT = process.envPORT || 5000

server.listen(PORT, () => {
    console.log(`===SERVER RUNNING ON PORT ${PORT}`)
})