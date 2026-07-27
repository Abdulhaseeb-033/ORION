import { registerUser } from "../services/auth.service.js";

export const register = async(req, res) => {
    console.log(req.body)
    const result = await registerUser(req.body);

    res.status(201).json(result);
};