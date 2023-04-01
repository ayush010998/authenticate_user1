const express=require('express');
const morgan=require('morgan');
const createError=require('http-errors');
require('dotenv').config()
require('./helpers/init_mogodb');


const AuthRoute=require('./routes/Auth')

const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'))

const PORT=process.env.PORT||3000;


app.get('/', async(req,res,next)=>{
    res.send("Hello from express")

})

app.use('/auth',AuthRoute);


app.use(async(req,res,next)=>{
    //const error=new Error('Not Found');
    //error.status=404
    //next(error)
    next(createError.NotFound())
})


app.use((err,req,res,next)=>{
    res.status(err.status||500)
    res.send({
        error:{
            status:err.status||500,
            message:err.message,
        },
    })
})


app.listen(PORT,()=>{
    console.log(`server up and running at port ${PORT}`)
})
