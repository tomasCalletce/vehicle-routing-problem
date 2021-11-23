const dotenv = require('dotenv')//szs
const assert = require('assert')

dotenv.config()

const {
    PORT,
    HOST,
    HOST_URL,
} = process.env



module.exports = {
    port: PORT,
    host: HOST,
    url: HOST_URL,
}
