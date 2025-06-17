import jwt from "jsonwebtoken";
import User from "../model/user.model.js";
const JWT_SECRET = process.env.JWT_Secret_Key || "default_secret_key";

export const authenticate = async(req, res, next) => {
    //console.log("Cookies received:", req.cookies);
    let token = req.cookies.jwt;
    if(!token){
        // Check Authorization header for Bearer token
        const authHeader = req.headers.authorization;
        if(authHeader && authHeader.startsWith("Bearer ")){
            token = authHeader.split(" ")[1];
            //console.log("Token from Authorization header:", token);
        }
    }
    if(!token){
        //console.log("Unauthorized: No token found in cookies or Authorization header");
        return res.status(401).json({message: "Unauthorized User"});
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = await User.findById(decoded.userId);
        //console.log("Decoded token:", decoded);
    } catch (error) {
        //console.log("Unauthorized: Token verification failed", error.message);
        return res.status(401).json({message: "Unauthorized: " + error.message});
    }
    next();
}
