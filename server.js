const xpress = require('express');
const serverConfig=require('./configs/server.config');
const app=xpress();

app.listen(serverConfig.PORT,()=>{
    console.log(`Application started on the port no: ${serverConfig.PORT}`)
})