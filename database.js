const mongoose = require('mongoose')

exports.connectMongoose = ()=>{
    mongoose.connect('mongodb+srv://ketansali:Ketan7600@cluster0.jc8ks.mongodb.net/PassPortDB?retryWrites=true&w=majority')
.then((e)=>{
    console.log("DataBase Connected");
}).catch((err)=>{
    console.log(err);
})
}

const userSchema = new mongoose.Schema({
        name:String,
        username : {
            type : String,
            required : true,
            unique : true
        },
        password : String
})

exports.User = mongoose.model('User',userSchema)