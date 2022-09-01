const express=require('express');
const http=require('http');
const mongoose = require('mongoose');
const app=express();
const server=http.createServer(app)
const cors=require('cors')
const userRoute=require('./route/user')
const bodyParser=require('body-parser')
require('dotenv').config()

mongoose.connect('mongodb+srv://wtf-web-backend:Vn6m2RDgv3IaD7kr@cluster0.iji3kbr.mongodb.net/wtfdatabase?retryWrites=true&w=majority')



mongoose.connection.on('error', err=>{
    console.log("Not connected")
})

mongoose.connection.on('connected', connected=>{
    console.log("connected")
})

app.use(cors());

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())

app.use("/users", userRoute)

const PORT = process.env.PORT

app.get("/",(req,res)=>{
    res.send("Server is running.");
});

server.listen(PORT,()=>console.log(`Server listening on port ${PORT}`))