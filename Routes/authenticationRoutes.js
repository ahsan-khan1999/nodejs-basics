const express = require('express')
const mongoose = require('mongoose')
// const


const router = express.Router()
const User = mongoose.model('User')
router.post('/signup' , async (req,res) =>{
    console.log(req.body)
    const {email,password} = req.body;
    try{
        const user1 = new User({email,password})
        await user1.save()
        // if (user1.save())
        res.send('sucessful')
    }
    catch(error){
        res.send(error.message)
    }
    
    // res.send('Home Route')
})

module.exports = router