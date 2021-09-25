const mongoose = require("mongoose");
// const { boolean } = require("webidl-conversions");

const AdminSchema = new mongoose.Schema({

    p_name: {
        type: String,

    },
    p_price: {
        type: Number,
    },
    p_dis: {
        type: String,
    },
    p_disc: {
        type: Number,
    },
    p_sale: {
        type: String,
    },
    p_category: {
        type: String,
    },
    p_img: {
        type: String,
    },

    time: { type: Date, default: Date.now }

})


module.exports = mongoose.model("Admin", AdminSchema);