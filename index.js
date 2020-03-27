const express = require('express')
const app = express()
const PORT = 3000;
const bodyParser = require('body-parser')
const {mongokey} = require('./keys')
const mongoose = require('mongoose')


require('./Schema/User')
const authenticationRoutes = require('./Routes/authenticationRoutes')
app.use(bodyParser.json())
app.use(authenticationRoutes)
mongoose.connect(mongokey,{
    // useNew
    useNewUrlParser:'true',
    useUnifiedTopology:'true'
    

})

mongoose.connection.on('connected', () => {
    console.log('connected')
})



app.get('/' , (req,res) =>{
    res.send('Home Route')
})

app.listen(PORT,() =>{
    console.log("Server running on port "+PORT)
})

