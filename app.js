const express = require("express");
const mongoose = require("mongoose");
const parser = require("body-parser");
const app =express();
const Register = require("./models/UserSchema");
const path = require('path');
app.set('view engine', 'hbs')// general config


console.log(path.join(__dirname,"../backend/public"));
const stat= path.join(__dirname,"../backend/public");
const template= path.join(__dirname,"../backend/views");
app.set('views',template);
app.use(express.static(stat));
app.use(express.json());
app.use(parser.urlencoded({extended:false}));
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
    res.render("");
});

app.post("/register",async (req,res)=>{
    try {
            const reg = new Register(req.body);
            const registed =await reg.save();
            console.log(registed);
                res.status(201).send("/register");
             
        
    } catch (error) {
        res.status(400).send(error);
    }
});

app.get("/login",async(req,res)=>{
    try {
        var searchuser = req.body.usern;
        var searchpassword = req.body.pass;
        // Register.find({
        //     $and: [
        //         {
        //             "email": searchuser
        //         },
        //         {
        //             "password": searchpassword
        //         }
        //     ]
        // }, (error, data) => {
        //     if (error) {
        //         throw error;
        //     }
        //     if (data.length > 0) {
        //         res.render("Welcome");
        //     }
        //     else {
        //         res.json({ "status": "Failed" });
        //     }
        // });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

app.listen(process.env.PORT || 3000,()=>{
    console.log("server started");
});