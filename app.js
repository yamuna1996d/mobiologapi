const express = require("express");
const mongoose = require("mongoose");
const parser = require("body-parser");
const app =express();
const Register = require("./models/UserSchema");
const path = require('path');

app.use(parser.urlencoded({extended:false}));

app.set('view engine', 'hbs');

const stat= path.join(__dirname,"../public");
const template= path.join(__dirname,"../backend/views");
console.log(template);
app.set('views',template);
app.use(express.static(stat));
//app.use(express.json());
mongoose.connect("mongodb+srv://usserdb123:usserdb123@cluster0.opis6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("database connection successful");
})
.catch((err) => {
    console.log("database connection error " + err);
});

app.get("/",(req,res)=>{
    res.send("Hai");
});

app.post("/register",async (req,res)=>{
    try {
            const reg = new Register(req.body);
            const registed =await reg.save();
            console.log(registed);
            // res.status(201).render("index");
        
    } catch (error) {
        res.status(400).send(error);
    }
});

app.post("/login",async(req,res)=>{
    try {
        var searchuser = req.body.usern;
        var searchpassword = req.body.pass;
        Register.find({
            $and: [
                {
                    "email": searchuser
                },
                {
                    "password": searchpassword
                }
            ]
        }, (error, data) => {
            if (error) {
                throw error;
            }
            if (data.length > 0) {
                res.status(201).render("Welcome");
            }
            else {
                res.json({ "status": "Failed" });
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

app.listen(process.env.PORT || 3000,()=>{
    console.log("server started");
});