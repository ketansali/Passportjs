const express = require('express')
const app = express()
const {User,connectMongoose} = require('./database')
connectMongoose()
const ejs = require('ejs')
const passport = require('passport')
const { initizalizingPassPort, isAuthenticated } = require('./passPortConfig')
const expressSession = require('express-session')

initizalizingPassPort(passport)
app.use(express.json())
app.use(express.urlencoded({extends:true}))
app.use(expressSession({secret:'secret',resave:false,saveUninitialized:false}))
app.use(passport.initialize())
app.use(passport.session())

app.set("view engine","ejs")


app.get("/",(req,res)=>{
    res.render("index")
})
app.get("/login",(req,res)=>{
    res.render("login")
})
app.get("/register",(req,res)=>{
    res.render("register")
})
app.post("/login",passport.authenticate('local',{failureRedirect:"/register",successRedirect:"/"}),(req,res)=>{

})
app.post("/register",async(req,res)=>{
    const user = await User.findOne({username:req.body.username})
    if(user) return res.status(400).send("User Aleady Existed")
    const newUser = await User.create(req.body)
    return res.status(201).send(newUser)
})

app.get("/profile",isAuthenticated,(req,res)=>{
    res.send(req.user)
})
app.get("/logout",(req,res)=>{
    req.logout(function(err) {
        if (err) { return next(err); }
        res.send("Logged out")
      });
})
app.listen(7676,()=>{
    console.log('Server is Running On PORT:7676');
})