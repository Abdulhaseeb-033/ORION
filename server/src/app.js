import { errorMiddleware } from "./middleware/error.middleware.js";
import notFoundMiddleware from "./middleware/notFound.middleware.js";
import express from "express";
import cors from "cors";
import morgan from "morgan"
import routes from "./routes/index.js"

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan());

app.use("/", routes);
app.use(notFoundMiddleware);
app.use(errorMiddleware);
export default app;