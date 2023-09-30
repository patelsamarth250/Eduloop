const express=require('express');
const mongoose = require("mongoose");

const registers = require('./register_mongoose.js');
var bodyParser = require('body-parser');
// const update_schema = require('./update_schema.js');

const app=express();

const port=process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended:false}))


var urlencodedParser = bodyParser.urlencoded({ extended: true })


const mongouri = "mongodb://127.0.0.1:27017/form_demo";

mongoose
    .connect(mongouri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,

    })
    .then((res) => {
        console.log("MonogoDB connected");
});

var db=mongoose.connection;

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/"+"form.html");
}); 



// app.get("/login",urlencodedParser, (req,res)=>{
//     res.render("login");
// })


// app.get("/index", (req,res)=>{
//     res.render("index");
// })

app.post("/form_data",urlencodedParser, (req,res)=>{
    try{
        const mycolln=new registers({
            fname:req.body.fname,
            phnumber:req.body.phnumber,
            email:req.body.email,
            tick: req.body.tick
        })

        // await mycolln.save();
        // console.log("saved and proceeding");
        db.collection('mycollns').insertOne(mycolln,(err)=>{
            if(err)
            {
                throw err;
            }
            console.log('Record inserted Successfully');
        }
        );
        res.send(db.collection('mycollns').find().toArray(
            function(err,mycollns){
                if(err) throw err;
                console.log(mycollns);
            }
        ));
        // res.send(JSON.stringify(mycolln));

    }catch(error){
        console.log('some error occured !')
        res.status(400).send(error)
    }

})

app.get('/ops',(req,res)=>{

    res.sendFile(__dirname+'/'+'update_db.html');

});

app.post('/update',urlencodedParser,async (req,res)=>{

    const original= req.body.original;
    const newval= req.body.newval;

    var query = { fname: original};
    var newvalue = {$set :{fname: newval} };

    db.collection('mycollns').updateOne(query, newvalue);
    console.log('changed!');

    var result= await db.collection('mycollns').find().toArray();
    console.log(result);
    res.send(JSON.stringify(result));
});

app.listen(port,()=>{
    console.log(`Server is runnig at port no. ${port}`);
});