const LocalStrategy = require('passport-local').Strategy
const {User} = require('./database')
exports.initizalizingPassPort =(passport)=>{
    try{
        passport.use(new LocalStrategy(async (username,password,done)=>{
            const user = await User.findOne({username:username})
            if(!user) return done(null,false)
    
            if(user.password !== password) return done(null,false)
            return done(null,user)
        }))

    }catch(err){
        return done(err,false)
    }

passport.serializeUser((user,done)=>{
    done(null,user.id)
})
passport.deserializeUser(async(id,done)=>{
    try{
       const user = await User.findById(id)
       return done(null,user)

    }catch(err){
        return done(err,false)

    }

})
}

exports.isAuthenticated = (req,res,next)=>{
    if(req.user) return next()
    res.redirect('/')
}

