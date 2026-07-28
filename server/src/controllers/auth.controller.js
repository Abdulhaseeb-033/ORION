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