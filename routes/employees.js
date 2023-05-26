const express= require('express')
const router=express.Router()   
const {getAllEmployees,createEmployee,deleteEmployee,updateEmployee,getEmployee}=require('../controllers/commands')



router.route('/').get(getAllEmployees).post(createEmployee)
router.route('/:id').get(getEmployee).patch(updateEmployee).delete(deleteEmployee)

module.exports=router