/**
 * This file contains the controller logic for the category
 * resources.
 * Everytime a CRUD request come for the category, methods define
 * in this controller file will be executed.
 */




const db = require("../models");
const Category= db.category;

/**
 * Post :create and save a new category
 */

exports.create=(req,res)=>{
    /**
     * validation of request body
     */

    if(!req.body.name){
        res.status(400).send({
            message: "Name of the category can't be empty!"
        })

        return;
    }

    /**
     * Creation of category object to be stored in db
     */

    const category={
        name: req.body.name,
        description: req.body.description
    };

    Category.create(category)
     .then(category =>{
        console.log(`category name: [$category.name] got inserted`)
        res.status(201).send(category);
    })
    .catch(err=>{
        console.log(`Issue in inserting category name: [${category.name}]`)
        console.log(`Error Message: ${err.message}`)
        res.status(500).send({
            message:"some internal error while storing the category"
        })
    })
}


/**
 * Get a list of all categories
 */
//ecom/v1/categories
//ecom/v1/categories/Kitchen


exports.findAll=(req,res)=>{

    let categoryName = req.query.name;
    let promise;
    if(categoryName){
        promise = Category.findAll({
            where:{
                name:categoryName
            }
        })
    }else{
        promise= Category.findAll();
    }

    promise
    .then(categories =>{
        res.status(200).send(categories);
    })
    .catch(err=>{
        res.status(500).send({
            message: "some internal error while fetching the category"
        })
    })



}

/**
 * Get a category based on the category id
 */


exports.findOne=(req,res)=>{
    const categoryID= req.params.id;

    Category.findByPk(categoryID)
    .then(category =>{
        if(!category){
            return res.status(404).json({
                message : 'Category not found'
            })
        }
        res.status(200).send(category);
    })
    .catch(err=>{
        res.status(500).send({
            message:"Some internal error while fetching the category"
        })
    })
}

/**
 * Update the existing category
 */

exports.update=(req,res)=>{
    const category ={
        name:req.body.name,
        description: req.body.description
    };

    const categoryId=req.params.id

    Category.update(category,{
        where: {id:categoryId}
    })
    .then(updateCategory=>{
        /**
         * Where the updation happened successfully.
         * You need to send the updated row to the table.
         * But while fetching that row and sending it yo user
         * there can be a error.
         */
        Category.findByPk(categoryId)
        .then(category =>{
            res.status(200).send(category);
        })
        .catch(err=>{
            res.status(500).send({
                message:"Some internal error occured while fetching"
            })
        })
    })
    .catch(err=>{
        //Where the updation task failed
        res.status(500).send({
            message:"Some internal error while updating the category"
        })
    })

}

/**
 * Delete an existing category based on categoryID
 */

exports.delete=(req,res)=>{
    const categoryId=req.params.id;

    Category.destroy({
        where:{
            id:categoryId
        }
    })

    .then(result=>{
        
        res.status(200).send({
            message:"Successfully deleted the category"
        })
    })
    .catch(err=>{
        res.status(500).send({
            message:"Some internal error while deleting the category by Id"
        })
    })
}

