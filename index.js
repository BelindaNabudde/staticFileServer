const express = require('express');
const app = express();
const fs  = require('fs');

app.use(express.json())

app.get('/quotes',(req,res)=>{
    fs.readFile('quotes.json',(err, quotes)=>{
    if(quotes){
        res.send(quotes);
    }else{
        res.send('quotes not found')
    } 
})  
})

    
app.post('/quotes',(req, res)=>{
    let newQuote = req.body
    let quotes = [];
    fs.readFile('quotes.json',(err,data)=>{
        if(data){
            const parsedData = JSON.parse(data);
            quotes=[...parsedData,newQuote];
            fs.writeFile('quotes.json',JSON.stringify(quotes,null,1),(err)=>{
                if(err){
                    res.send('Failed to add quote')
                }else{
                    res.send('Successfully added new quote');
                }
            })
        }
    })
})

app.get('/quotes/:quoteId',(req,res)=>{
    let id= req.params.quoteId
    let quotes = [];
    fs.readFile('quotes.json',(err,data)=>{
        if(data){
            quotes=JSON.parse(data);
            let quoteOfId = '';

            for(let quote of quotes){
                if(quote.id === id){
                    quoteOfId = quote
                }
            }
            if(quoteOfId){
                res.send(quoteOfId)
            }else{
            res.send('Quote not found')
            }
        }else{
             res.send('Quote not found')
        }
    })
})

 app.patch('/quotes/:quoteId',(req,res)=>{
    let id= req.params.quoteId    
    let quotes = [];
    fs.readFile('quotes.json',(err,data)=>{
        if(data){
            quotes=JSON.parse(data);
            let quoteOfId = req.body;
            for(let quote of quotes){
                if(quote.id === id){
                    quoteOfId = quote
                }
            }
            if(quoteOfId){
                let updatedQuote=req.body
                quoteOfId=updatedQuote
                quotes=[...quotes,quoteOfId];
                res.send("sucessfully updated")    
            }else{
            res.send('Quote not updated')
            }
        }
        })
 })






const PORT=5000;
app.listen(PORT,()=>{
    console.log(`Server Listening on http://localhost:${PORT}`)
})



















// const http = require('http');
// const url = require('url');
// const fs = require('fs');

// // create server

// const server =
//     http.createServer(
//         function(request,response){
//             // get the pathname
//             const parsedUrl=url.parse(request.url)
//             const filename =parsedUrl.pathname !== '/'?`.${parsedUrl.pathname}.html`:'./index.html'
//             // ./about.html
//             fs.readFile(filename,(err,data)=>{   
//                 if(data){
//                     response.write(data);
//                     response.end();
//                 }else{
//                     fs.readFile('./404.html',(err,data)=>{
//                         response.write(data);
//                         response.end();
//                     })
//                 }
//             })    
//         }
// )
// listen for requests
// server.listen(5000)

// localhost:5000-index.js
// localhost:5000/about -about.html
// localhost:5000/contact -contact.js
