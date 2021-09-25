require("dotenv").config();
var express = require("express")
var cors = require('cors')
var bodyParser = require('body-parser')
const app = express();
var adminRoutes = require("./routes/adminRoutes");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });




app.use("/admin", adminRoutes)
app.get("/", (req, res) => {
    res.send("yes");
})

app.get('/upload/img', (req, res) => {
    console.log(req.body.p_img);
})


app.listen(process.env.PORT || 8000, () => {
    console.log("server started");
})

