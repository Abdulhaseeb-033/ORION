import User from "../models/user.model.js";
import { registerUser, loginUser } from "../services/auth.service.js";

export const register = async(req, res) => {
    console.log(req.body)
    const result = await registerUser(req.body);

    res.status(201).json(result);
};

export const login = async (req, res) => {
    const result = await loginUser(req.body);

    res.status(201).json(result);
};

export const getCurrentUser = async (req, res) => {
   try {
    const user = await User.findById(req.user.id).select("-password");

    return res.status(200).json({
        success: true,
        user,
    });
   } catch (error) {
    return res.status(500).json({
        success: false,
        message: error.message
    });
   }
};