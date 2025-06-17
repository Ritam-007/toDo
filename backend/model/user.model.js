//Database Schema of the user


import mongoose, { Types } from "mongoose";             // defining the Schema from Mongoose npm

const userSchema = new mongoose.Schema({
    userName:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
        select: false,
    },
    token:{
        type: String
    }
});
//

const User = mongoose.model("User", userSchema);          // creating model of user schema

export default User;  //export default is used in User coz we can use it in another file easily
