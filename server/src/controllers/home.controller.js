import { getWelcomeMessage } from "../services/home.service.js";


export const home = (req, res) => {
    const response = getWelcomeMessage();
    res.json(response);
};