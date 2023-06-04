const express = require('express');
const path = require('path');
const app = express();
const admin = require('./config');
const fb = require('./config')
const db = fb.firestore();
app.use(express.json())
app.use(express.urlencoded({extended:false}))



app.get('/index',(req,res)=>{

    res.sendFile(path.join(__dirname,'views','index.html'));
    
})
app.post('/store',async(req,res)=>{
     console.log(req.body)
    db.collection('users').doc().set(req.body).then(res=>{
        console.log(res)
        res.send({submit:"true"})
    })
 })
const server = app.listen(3000,()=>{
    console.log("running...");
    
})
