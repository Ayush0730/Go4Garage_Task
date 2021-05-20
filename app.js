const express = require('express');
const mongoose = require('mongoose');

const app = express();

const Vendor = require('./models/vendor');
const User = require('./models/user');
const Items = require('./models/items');

app.use(express.json());
app.use(express.urlencoded());

app.set("view engine", "ejs");

const uri = "mongodb://localhost:27017/Go4Garage";
mongoose.connect(uri, {useNewUrlParser : true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false});

app.get('/',(req,res)=>{
    res.render('home');
});

app.get('/user/login', (req,res) => {
    res.render('user-login');
});

app.post('/user/login', (req,res)=>{
    User.findOne({userName: req.body.userName}, (err, foundUser) => {
        if(err){
            return res.send("Something Went Wrong");
        }
        if(!foundUser){
            return res.send("User with given Username not found");
        }
        else{
            if(foundUser.password === req.body.password){
                return res.status(200).json({"Status" : 1});
            }
            else{
                return res.status(200).json({"Status" : 2});
            }
        }
    });
});

app.get('/user/register', (req,res) => {
    res.render('user-register');
})

app.post('/user/register', (req,res) => {
    const newUser = new User({
        userName : req.body.userName,
        password : req.body.password
    });
    newUser.save((err) => {
        if(err){
            return res.status(200).json({"Status" : 2});
        }
        return res.status(200).json({"Status" : 1})
    });
});

app.get('/vendor/login', (req,res) => {
    res.render('vendor-login');
});

app.post('/vendor/login', (req,res)=>{
    Vendor.findOne({mobile: req.body.mobile}, (err, foundVendor) => {
        if(err){
            return res.send("Something Went Wrong");
        }
        if(!foundVendor){
            return res.send("Vendor with given mobile not found");
        }
        else{
            if(foundVendor.password === req.body.password){
                return res.status(200).json({"Status" : 1});
            }
            else{
                return res.status(200).json({"Status" : 2});
            }
        }
    });
});

app.get('/vendor/register', (req,res) => {
    res.render('vendor-register');
});

app.post('/vendor/register', (req,res) => {
    const newVendor= new Vendor({
        mobile : req.body.mobile,
        password : req.body.password
    });
    newVendor.save((err) => {
        if(err){
            return res.status(200).json({"Status" : 2});
        }
        return res.status(200).json({"Status" : 1})
    });
});

app.get('/vendor/list', (req,res)=>{
    Items.find({}, (err, foundItems) => {
        if(err || !foundItems){
            return res.status(200).json({"Status" : 2})
        }
        const data = {"Status": 1, items:foundItems}
        res.status(200).json(data);
    })
});

app.listen(3000, ()=>{
    console.log("Server started");
});