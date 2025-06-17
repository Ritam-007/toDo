import jwt from "jsonwebtoken";
import { date } from "zod";
import User from "../model/user.model.js";

const JWT_SECRET = process.env.JWT_Secret_Key || "default_secret_key";

export const generateTokenAndSaveInCookies = async(userId, res) => {
    const token = jwt.sign({ userId },
    JWT_SECRET, { expiresIn: "15 days" })

    res.cookie(
        "jwt", token,
        {
            httpOnly: true,                 // for security purpose or to make it secure
            //expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000)            //15 days expires timming
            secure: false,
            sameSite: "lax",
            path: "/"
        })

        await User.findByIdAndUpdate(userId, {token});
        return token;
};
