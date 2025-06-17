//Database Schema of the Todo list


import mongoose from "mongoose";            // defining the Schema from Mongoose npm

const todoSchema = new mongoose.Schema({
    text:{
        type:String,
        required:true
    },

    completed:{
        type:Boolean,
        required:true
    },

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",         //referencing user model to connect to users collection in MongoDb
        required: true,
    }
});
//



const todo=mongoose.model("todo",todoSchema) //creating model of todo schema

export default todo;  // export default is used in todo coz we can use it in another file easily
