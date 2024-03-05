const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const { dot } = require("node:test/reporters");

const app = express();

dotenv.config();

const port = process.env.PORT || 3000;

const username = process.env.MONGODB_USERNAME;
const password= process.env.MONGODB_PASSWORD;
mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.m8yt74r.mongodb.net/registrationFormDB`,{
    useNewUrlParser : true,
    useUnifiedTopology : true,
});

const registrationSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String
})

const registration = mongoose.model("registration", registrationSchema);

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/public/index.html")
})

app.post("/register",async (req,res)=>{
    try{
        const { name,email,password}=req.body;

        const registrationdata=new registration({
            name,
            email,
            password
        });
        await registrationdata.saver();
        res.redirect("/success");
    }
    catch(error){
        console.log(error);
        res.redirect("error");
    }
})

app.get("/success",(req,res)=>{
    res.sendFile(__dirname+"/public/success.html")
    
})

app.get("/error",(req,res)=>{
    res.sendFile(__dirname+"/public/error.html")
    
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
