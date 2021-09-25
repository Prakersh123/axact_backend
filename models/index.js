const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    // useCreateIndex : true, 
    // seUnifiedTopology: true,
    keepAlive: true
}).then(() => {
    console.log("connection is successful")
}).catch(err => {
    console.log("Got Error ===> ", err.message);
});

module.exports.Admin = require('./Admin')
module.exports.User = require('./User')
