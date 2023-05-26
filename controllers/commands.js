const Workers= require('../models/employee')
const {createCustomError}=require('../Errors/EmployeeError')

const getAllEmployees= async(req,res)=>{
    const employees= await Workers.find({})
    res.status(200).json({employees})
}

const createEmployee=async(req,res)=>{
    const employee=await Workers.create(req.body)
    res.status(201).json({employee,added:true})
    
}

const deleteEmployee=async(req,res)=>{
    const {id:employeeID}=req.params
    const employee=await Workers.findOneAndDelete({_id:employeeID})
    if(!employee){
        return next(createCustomError(`no employee with id ${taskID} FOUND`,404))
    }
    res.status(200).json({employee,success:true})
}

const getEmployee=async(req,res,next)=>{
    const {id:employeeID}=req.params
    const employee=await Workers.findOne({_id:employeeID})
    if(!employee){
        return next(createCustomError(`no employee with id ${employeeID} FOUND`,404))
    }
    res.status(200).json({employee})
}

const updateEmployee=async(req,res)=>{
        const {id:employeeID}=req.params
        const employee= await Workers.findOneAndUpdate({_id:employeeID},req.body,{
            new:true,
            runValidators:true,
        })
        if(!employee){
            return next(createCustomError(`no employee with id ${employeeID} FOUND`,404))
        }
        res.status(200).json({employee})
        
}
module.exports={getAllEmployees,createEmployee,deleteEmployee,updateEmployee,getEmployee}