const mongoose = require("mongoose");
// const { boolean } = require("webidl-conversions");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const UserSchema = new mongoose.Schema({

    name: {
        type: String,

    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    tokens: [
        { token: String }
    ],

    cart_item: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Admin"
        }
    ],
    time: { type: Date, default: Date.now }

})



UserSchema.pre('save', async function (next) {
    console.log("arya1222")
    if (this.isModified('password')) {
        console.log("arya12222")

        this.password = await bcrypt.hash(this.password, 4);

    }
    next();
})

UserSchema.methods.genauthtoken = async function () {
    try {
        let token = jwt.sign({ id: this._id }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;
    } catch (err) {
        console.log(err);

    }

}




module.exports = mongoose.model("User", UserSchema);
