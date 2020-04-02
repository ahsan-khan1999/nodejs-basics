const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true,
    },
    password:{
        type:String,
        required:true,
    }

})

    userSchema.pre('save',function(next){
            const user = this;
            if(!user.isModified('password')){
                return next()
            }
            bcrypt.genSalt(10,(err,salt) => {
                if(err){
                    return next()
                }
                bcrypt.hash(user.password,salt,(err,hash) => {
                    if(err){
                        return next()
                    }
                    user.password = hash
                    next()
                })
            })


    })
    userSchema.methods.comparePassword = function (userPassword){
        const user = this;
        return new Promise((res,rej) => {
            bcrypt.compare(userPassword,user.password, (err, same) =>{
                if(err){
                    return rej(err)
                }
                if(!same){
                    return rej(err)
                }
                res(true)
            })
        })

    }
mongoose.model('User',userSchema);