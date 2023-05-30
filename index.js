const express=require("express")
const mongoose=require("mongoose")
const app=express()
mongoose.connect("mongodb://localhost:27017",{
    useNewURLParser:true,useUnifiedTopology:true
},(err)=>{
    if(err)
    {
        console.log(err)
    }else{
        console.log("successfully connected")
    }
})

app.listen(3000,()=>{
    console.log("on port 3000!")
})