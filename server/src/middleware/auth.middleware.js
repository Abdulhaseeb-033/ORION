import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    console.log("===Middleware Called===")
    console.log(req.method, req.originalUrl);
    try {
        const token = req.header("Authorization")?.replace("Bearer ","").trim();
        console.log(req.headers.authorization);

        if(!token) {
            return res.status(401).json({
                success: true,
                message: "Access denied. Token not found."
            });
        }

        console.log("Received Token:", token);
        console.log("Token Length:", token.length);
        console.log("Received Token:", jwt.decode(token));

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            success: false,
            message: error.message
        });
    }
};
export default authMiddleware;