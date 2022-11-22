const mongoose = require("mongoose")

const credentialSchema = new mongoose.Schema({
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
    OUDivisionID: {
        type: String
    },
    dateCreated: {
        type: Date,
        default: () => Date.now()
    },
    archived:Boolean
})
const Credentials = mongoose.model("credentials", credentialSchema)
module.exports = Credentials;