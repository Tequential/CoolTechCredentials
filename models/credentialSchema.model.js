const mongoose = require("mongoose")

const credentialSchema = new mongoose.Schema({
    OUDivisionID: {
        type: String
    },
    OUdivision: {
        type: String
    },
    website: {
        type: String
    },
    username: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        default: () => Date.now()
    },
    archived:Boolean
})
const Credentials = mongoose.model("credentials", credentialSchema)
module.exports = Credentials;