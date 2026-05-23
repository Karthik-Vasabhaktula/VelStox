import {User} from "../model/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {generateAccessToken, generateRefreshToken} from "../utils/generateToken.js";

export const signup= async (req, res) =>{
    try{
        const {username, email, password} = req.body;
        const existingUser= await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message: "User already exists"});
        }
        const hashedPassword= await bcrypt.hash(password, 10);
        const user= await User.create({
            username,
            email,
            password: hashedPassword,
        });

        res.status(201).json({
            message: "Signup successfully",
        });
    }catch(error){
        console.error("Error registering user:", error);
        res.status(500).json({message:"Server Error"});
    }
};

export const login= async (req,res)=>{
    try{
        const {email, password}= req.body;
        const user= await User.findOne({ email });
        if(!user){
            return res.status(400).json({message: "User not found"});
        }
        const isMatch= await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message: "Invalid credentials"});
        }
        const accessToken = generateAccessToken(user._id);

        const refreshToken= generateRefreshToken(user._id);
        
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            path: "/",
            maxAge: 15 * 60 * 1000,
        });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            path:"/",
            maxAge: 7*24*60*60*1000,
        });

        res.status(200).json({
            message: "Login Successful",
            user:{
                id: user._id,
                username: user.username,
                email: user.email,
            },
        });
    }catch(error){
        console.error("Error logging in user:", error);
        return res.status(500).json({message: "server error"}); 
    }
};


export const logout= async (req, res)=>{
    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
    });

    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
    });
    res.status(200).json({
        message: "Logout successful",
    });
};

export const getMe= async (req,res)=>{
    try{
        const user= await User.findById(req.user.id).select("-password");
        res.status(200).json(user);
    }catch(error){
        res.status(500).json({
            message:"Server error",
        });
    }
};
