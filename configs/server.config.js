if(process.env.NODE_ENV != 'production'){
    require('dotenv').congig();
}

module.exports={
    PORT:process.env.PORT
}