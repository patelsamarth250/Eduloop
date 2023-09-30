const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema({
    firstname:
    {
        type: String,
        required:true,
        
    },
    lastname:
    {
        type: String,
        required:true,
        
        
    },
    mobileno:
    {
        type: Number,
        required:true,

    },
    address:
    {
        type: String,
       
    },
    country:
    {
        type: String,
        required:true,
        
    },
    country:
    {
        type: String,
        required:true,
       
    },
    zipcode:
    {
        type: Number,
        required:true,
  
    },
    
    email:
    {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    repassword:{
        type: String,
        
    }
});

module.exports = mongoose.model('User',userSchema);