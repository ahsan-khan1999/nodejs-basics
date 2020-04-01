const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = mongoose.model('User')
const {jwtkey} = require('../keys')

module.exports = (req,res,next) => {
    const { authorization } = req.headers;

    if(!authorization){
        return res.status(401).send({error:"No Authorization"})
    }
    const token = authorization.replace("Bearer " ,"");
    jwt.verify(token,jwtkey, async (error,payload) =>{
        if(error){
            return res.status(401).send({error:"Wrong Authorization"})

        }
        const {userId} = payload;
        const user = await User.findById(userId)
        req.user=user;
        next()
    })
}