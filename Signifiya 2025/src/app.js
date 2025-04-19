const express=require("express")
const port= process.env.PORT || 3000
const app=express()
const hbs=require("hbs")
const path=require('path')
const views_path=path.join(__dirname,"../templates/views")
const body_parser=require("body-parser")
app.use(body_parser.json())
app.use(body_parser.urlencoded(extended=false))
const mongoose=require("mongoose")
require("./db/conn")
const register=require("./models/register")
app.set("view engine","hbs")
app.set("views",views_path)




app.listen(port,()=>{
    console.log(`Running in Port: ${port}`)
})

//~Root route
app.get("/",(req,res)=>{
    res.render("index");
});

app.get("/index",(req,res)=>{
    res.render("index")
})

// app.post("/send",(req,res)=>{
//
// })

app.get("/data",(req,res)=>{
    res.send("I AM COMING FROM BACKEND !")
})

app.get("/geo",(req,res)=>{
    res.send("THIS IS A MINOR CLASS")
})


app.get("/bca",(req,res)=>{
    res.send("this is a full stack class")
})

app.post("/send",(req,res)=>{
    const name = req.body.name;
    const roll = req.body.roll;
    const reg = req.body.reg;
    const school = req.body.school;
    const role = req.body.role;

    console.log(name, school, role);

    const save_data = new register({name: name, roll: roll, reg: reg, school: school, role: role,});

    save_data
        .save()
        .then(
        ()=>{
            console.log("Data Saved to DB !");
            //~to show status for alert of registration.
            //res.redirect("/display?status=3");
            res.send("You Registered Successfully! Thank you for registering!")
        }
    ).catch((e)=>{
            console.log(`Error: ${e}`);
        });

});

app.get("/display",async(req,res)=>{
    try {
        const data = await register.find();
        const status = req.query.status; //~change
        res.render("display", {data: data, status: status});//change
    } catch(error){     //~change
        console.error("Failed to register");
        res.status(500).send("Error loading data.");
    }//console.log(data)
    //res.render("display",{data})
    //res.send("DATA DISPLAYED IN BACKEND !")
});


app.post("/update",async(req,res)=>{
    const name=req.body.name
    const roll = req.body.roll;
    const reg=req.body.reg;
    const id=req.body.id
    const school = req.body.school;
    const role=req.body.role
    const btn=req.body.btn
    let status;
    try { if (btn === "UPDATE")
    { await register.updateOne(
        {_id: new mongoose.Types.ObjectId(id)},
        {$set: {"name": name, roll: roll, reg: reg, school: school, role: role}} );
        status = 1
    }
        if (btn === "DELETE") {
            await register.deleteOne({_id: new mongoose.Types.ObjectId(id)});
            status = 2;
            //console.log(status)
        }
        const data = await register.find();
        res.render("display", {data, status});
    }catch (error){
        console.error("Update/Delete error:", error);
        res.status(500).send("Error updating/deleting data.");
    }
});
