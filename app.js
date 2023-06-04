const express = require('express');
const path = require('path');
const app = express();

const fb = require('./config')
const db = fb.firestore();
app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'views','signup.html'))
})
app.get('/index',(req,res)=>{

    res.sendFile(path.join(__dirname,'views','index.html'));
    
})


app.get('/registered',(req,res)=>{
    res.sendFile(path.join(__dirname,'views','thank.html'));
 })

 app.get('/login',(req,res)=>{
    res.sendFile(path.join(__dirname,'views','login.html'));
 })

app.post('/store',async(req,res)=>{
    // console.log(req.body)
    res.redirect('/registered')
    db.collection('users').doc().set(req.body)
   
 })

 
const server = app.listen(3000,()=>{
    console.log("running...");
    
})
