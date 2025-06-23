//defining functions and write actual logical part

import User from "../model/user.model.js";
import { z } from 'zod';                // zod is a library for email, password validation. Means if there are no "@" in the email and is there are less than 3 characters is the password, then the email and password is invalid.
import bcrypt from "bcrypt";            // bcrypt is a library to secure password. In database, the user's password will not be visible as actual value, the password will be visibile as hashed value
import { generateTokenAndSaveInCookies } from "../jwt/token.js";

const userSchema = z.object({
    email: z.string().email({message: "Invalid Email Address"}),         // using "z.string()" the email must be "string" type and by using "email({invalid...})"", that is an invalid formation of the email
    userName: z.string().min(3, {message: "User Name must be atleast 3 characters"}),
    password: z.string().min(8, {message: "The Password must be atleast 8 characters"})
})
// Registration of an User
export const register = async(req, res) => {
    try {
        const {email, userName, password} = req.body;       // either do this or do seperate as shows bellow

        if(!email || !userName || !password){               // if all fields are not entered by user 
            return res.status(400).json({errors: "All Field Must Be Filled"});     
        }
        const validation = userSchema.safeParseAsync({email, userName, password});          // "safeParseAsync()" is a function is "zod" to check validation
        if(!(await validation).success){                                                    // if validation is not successed, 
            const errorMessage = (await validation).error.errors.map((err) => err.message); // to set datas in "errorMessage" about "(await validation).error.errors.map((err) => err.message)" the error texts as written is line no. "8,9,10" will be shown to the user
            return res.status(400).json({errors: errorMessage});                            // by using "(await validation).error.errors.map((err) => err.message)" the error texts as written is line no. "8,9,10" will be shown to the user
        }

        // const email = req.body.email;
        // const userName = req.body.userName;
        // const password = req.body.password;

        //console.log(email,  userName,  password);         // if you want to check, do this comment out 

        const user = await User.findOne({email});           // looking for user is registered or not
        if(user){
            return res.status(400).json({errors: "This User Already Exists"});     // ckecked that, user already exists  
        }
        const hashPassword = await bcrypt.hash(password, 10);           // to make the password hashed or secure to hide actual value of the password in database
        const newUser = new User({email, userName, password: hashPassword});                      // Else, information of the new user is storing in the newUser
        await newUser.save();                                                       // new user is saved
        if(newUser){
            const token = await generateTokenAndSaveInCookies(newUser._id, res);
            return res.status(201).json({message: "User Registration is Successfull", newUser, token});    // Registration is successfull
            //return delete
        }

    } catch (error) {
        console.log(error);                                                         // if any error occurs
        if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
            return res.status(400).json({ message: "This email is already registered" });
        }
        res.status(404).json({message: "Error is User Registratiion"});             // problrm in user registration
    }
};


// Login of an User
export const login = async(req, res) => {
    const {email, password} = req.body;

    try {
        if(!email || !password){
            return res.status(500).json({errors: "Email and Password Both are Required for User Login"});      //email and password both field must be filled ny user
        }
        const user = await User.findOne({email}).select("+password");       // in "user", storing the given email and the password of the user provided by user in the time of register
        if(!user || !(await bcrypt.compare(password, user.password))){      // if "user" is not available im the database means, "user" didn't registered user or the entered password during login is wrong password [that is checked by "(await bcrypt.compare(password, user.password))"] , then...
            return res.status(400).json({message: "Invalis email or password"});
        }
        const token = await generateTokenAndSaveInCookies(user._id, res);
        return res.status(200).json({message: "User Loggedin Successfull", user, token});
    } catch (error) {
        console.log(error);                                                         // if any error occurs
        res.status(404).json({message: "Error is User Login Process"});
    }
};

export const logout = (req, res) => {
    try {
        res.clearCookie("jwt",{
            path: "/",
        })
        return res.status(200).json({message: "User Loggedout Successfully"})
    } catch (error) {
        console.log(error);                                                         // if any error occurs
        res.status(404).json({message: "Error is User Logout Process"});
    }
};