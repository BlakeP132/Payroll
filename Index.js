const express=require('express')
const app=express();
const db=require('./DB/connect')
const employees=require('./routes/employees')
require('dotenv').config()
const NotFound=require('./middleware/NotFound.js')


app.use(express.static('./public'))
app.use(express.json())


//ROUTES
app.get('/', function(req, res){
    res.redirect('/Page.html');
});
app.get('/api/v1/EmployeeAddition', function(req, res){
    res.redirect('/Add.html');
});
app.use('/api/v1/employees',employees)
app.use(NotFound)

const port= process.env.PORT 
const start= async()=>{
    try{
        await db(process.env.MONGO_URI)
        app.listen(port,()=>{
            console.log(`WEBSITE IS LIVE ON PORT ${port}...`)
        })
        
    }catch(error){
        console.log(error)
    }
}

start()