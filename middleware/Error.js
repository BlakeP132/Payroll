const {CustomAPIError}=require('../Errors/EmployeeError')
const errorHandlerMiddleware=(err,req,res,next)=>{
    if(err instanceof CustomAPIError){
        return res.status(err.statuscode).json({msg:err.message})
    }
    return res.status(500).json({msg:`ERROR PLEASE TRY AGAIN`})
}

module.exports=errorHandlerMiddleware