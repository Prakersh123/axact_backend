const mongoose = require("mongoose");
// const { boolean } = require("webidl-conversions");

const AdSchema = new mongoose.Schema({

    nam: String,
    tokens: [
        {
            token: String
        }
    ],
    time: { type: Date, default: Date.now }

})


module.exports = mongoose.model("Ad", AdSchema);