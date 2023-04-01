const mongoose=require('mongoose');

mongoose.connect(process.env.MONGODB_URI,{
    dbName:process.env.DB_NAME,
    //useNewUrlParse:true,
    useUnifiedTopology:true,
    //useFindAndModify:false,
   //useCreateIndex:true

}).then(()=>{
    console.log("connected ......");
}).catch((e)=>{
    console.log(e);

})

mongoose.connection.on('connected',()=>{
    console.log('Mongoose connection is connected successfully');
})

mongoose.connection.on('error',(err)=>{
    console.log(err);
})

mongoose.connection.on('disconnected',()=>{
    console.log('mongodb connection is noe disconnected ')
})

process.on('SIGINT',async()=>{
    await mongoose.connection.close();
    process.exit(0);
})