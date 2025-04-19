const mongoose=require("mongoose")
mongoose.connect("mongodb://localhost:27017/sundoor").then(
    ()=>{
        console.log("Connected to MongoDB !")
    }
).catch(
    (e)=>{
        console.log(`Error: ${e}`)
    }
)