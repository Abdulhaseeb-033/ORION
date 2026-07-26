import dotenv from "dotenv"
import app from "./app.js"
import connectDB from "./config/database.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();

        app.get('/', (req, res) => {
            res.json({
                success: true,
                message: "ORION Core s running...."
            });
        });


        app.listen(PORT, () => {
            console.log(`ORION Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error(`Failed to start Server`);
        console.error(error.message);
    }
};

startServer();

