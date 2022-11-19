const mongoose = require("mongoose")

const ouSchema = new mongoose.Schema({
   division: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        default: () => Date.now()
    },
}, {collection: 'OUdivision'})

const OUdivision = mongoose.model("OUdivision", ouSchema)

module.exports = OUdivision;