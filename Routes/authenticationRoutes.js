const express = require('express')
const mongoose = require('mongoose')
// const
const jwt = require('jsonwebtoken')
const {jwtkey} = require('../keys')
const router = express.Router()
const User = mongoose.model('User')
router.post('/signup' , async (req,res) =>{
    console.log(req.body)
    const {email,password} = req.body;
    try{
        const user1 = new User({email,password})
        await user1.save()
        const token = jwt.sign({userId:user1._id},jwtkey)
        // if (user1.save())
        res.send({token})
    }
    catch(error){
        res.send('something went wrong')
    }
    
    })

module.exports = router