const mongoose=require('mongoose')


const employeeSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,'ENTER A NAME'],
        trim:true,
        maxlength:[20,'NAME IS TOO LONG']
    },
    Salary:{
        type:Number,
        default:0,
        required:[true,'ENTER A SALARY'],
    },
    Position:{
        type:String,
        required:[true,'ENTER A POSITION'],
    }


})
module.exports= mongoose.model('Employee',employeeSchema)