const  express=require('express');
const path  = require('path');
const server =express();



server.use(express.static(path.join(__dirname,'./public')));

server.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'./public/index.html'))
    // res.send('Welcome to Express Server')
})
server.get('/about',(req,res)=>{
    res.sendFile(path.join(__dirname,'./public/about.html'))
    // res.send('Express Server About Page')
})
server.get('/contact',(req,res)=>{
    res.sendFile(path.join(__dirname,'./public/contact.html'))
    // res.send('Express Server Contact Page')
})
server.listen(5000,()=>{
    console.log('Server is listening on port:5000')
})

