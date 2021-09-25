const router = require('express').Router()
const bcrypt = require('bcrypt')
const db = require("../models")
const jwt = require("jsonwebtoken");
router.post("/arya", async (req, res) => {

    var result = await new db.Admin(req.body)
    console.log(result, "arya1");
    result = await result.save();
    console.log(result, "arya2");
    return res.json(result);

})


//home page products
router.get('/getall', async (req, res) => {
    res.cookie("jwtoken", "adsfhkjashd", {
        expires: new Date(Date.now() + 258920000),
        httpOnly: true
    })
    const result = await db.Admin.find({});
    console.log(result);
    var ans = { men: [], women: [], kid: [] };

    for (var i = 0; i < result.length; i++) {
        if (result[i].p_category === "mens") {
            ans.men.push(result[i]);
        }
        else if (result[i].p_category === "womens") {
            ans.women.push(result[i]);
        }
        else {
            ans.kid.push(result[i]);
        }
    }
    return res.json(ans);

})

//registration of user
router.post('/registration', async (req, res) => {
    try {

        console.log("arya23")
        const new_doc = new db.User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        const result = await new_doc.save();
        console.log(result);
        res.status(201).json({
            message: "user registered successfully"
        })
    } catch (err) {
        console.log(err);
        return res.status(402);
    }


})



//user login
router.post("/login", async (req, res) => {
    console.log(req.body)

    if (req.body.type === 'admin') {

    }
    else {

        const user = await db.User.findOne({ email: req.body.email });
        if (user) {
            const valid = await bcrypt.compare(req.body.password, user.password)
            if (valid) {
                const token = await user.genauthtoken();
                res.cookie("jwtoken", token, {
                    expires: new Date(Date.now() + 258920000),
                    httpOnly: true
                })
                console.log(token);
                return res.json({ message: token })
            }
            else {
                return res.status(400).json({ message: "Invalid Credentials" });

            }
        }
        else {
            return res.status(400).json({ message: "Invalid Credentials" });
        }


    }

})




//add to cart
router.post("/addtocart", async (req, res) => {
    try {
        console.log(req.body)

        const res_tok = await jwt.verify(req.body.token, process.env.SECRET_KEY, async (err, decoded) => {
            if (err) {
                console.log(err)
                return res.status(401).json({ message: "can't login" })
            }
            console.log(decoded)
            var p_id = {};
            const users = await db.User.find({});
            for (var i = 0; i < users.length; i++) {
                var user = users[i].tokens;
                console.log(user.length, "len")
                for (var j = 0; j < user.length; j++) {
                    // console.log("arya123")
                    if (user[j].token === req.body.token) {
                        console.log(users[i], "23")
                        users[i].cart_item.push(req.body.id);
                        const r = await users[i].save();
                        console.log("final", r)
                        return res.status(200).json("all good");
                    }
                }
            }

        })
        console.log(res_tok, "asdfsd")

    } catch (err) {

    }


})

router.post("/itemofcart", async (req, res) => {
    try {
        console.log(req.body)

        const res_tok = await jwt.verify(req.body.token, process.env.SECRET_KEY, async (err, decoded) => {
            if (err) {
                console.log(err)
                return res.status(401).json({ message: "can't login" })
            }
            console.log(decoded)
            var p_id = {};
            const users = await db.User.find({}).populate("cart_item").exec();
            for (var i = 0; i < users.length; i++) {
                console.log(users[i]);
                var user = users[i].tokens;
                console.log(user.length, "len")
                for (var j = 0; j < user.length; j++) {
                    // console.log("arya123")
                    if (user[j].token === req.body.token) {

                        return res.status(200).json(users[i]);
                    }
                }
            }

        })
        console.log(res_tok, "asdfsd")

    } catch (err) {

    }


})


module.exports = router;