/***
 * This file will be used for the folling purpose:
 * 1. create the DB connection with the help of sequalize
 * 2. Export all the functionalities of the model through the file.
 * 
 * one of the biggest advantages of using index.js file is,other file
 * trying to import this file just need to provide the module name.
 */


const config= require('../configs/db.config');
const Sequelize=require ('sequelize');


/**
 * Creating the db connection 
 */

const seq =  new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD, 
    {
        host: config.HOST,
        dialect: config.dialect
    }
);

const db={};//db object is created
db.Sequelize=Sequelize;//adding Sequelize to the above created object
db.sequelize=seq;
db.category=require('./category.model.js')(seq,Sequelize);
db.product=require('./product.model.js')(seq,Sequelize);
/**
 * Above we are adding elements to the db object
 */

module.exports=db;//Finally we are exporting it