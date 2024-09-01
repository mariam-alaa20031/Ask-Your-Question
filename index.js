import bodyParser from 'body-parser'
import express from 'express'
import axios from 'axios'
import dotenv from 'dotenv';
// initialising my app and port to listen for requests
const port=3000
const app= express()


dotenv.config();

const apiKey = process.env.apiKey;
//adding all constants
const URL="https://simple-chatgpt-api.p.rapidapi.com/ask"
const config ={headers: {"X-Rapidapi-Key": apiKey,
    "X-Rapidapi-Host": "simple-chatgpt-api.p.rapidapi.com"}}


app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}))


app.get("/",(req,res)=>{
     res.render("index.ejs")
})

app.post("/ask", async (req,res)=>{
        const question= req.body.question //this is your question
        try{
        const response= await axios.post(URL, {question:question}, config)
        res.render("index.ejs", {response:response.data.answer})}
        catch(error){
            console.log(error.response.data)
            res.status(500)
        }

})


app.listen(port, ()=>{
    console.log("Server listening on port "+port+ " !")
})




