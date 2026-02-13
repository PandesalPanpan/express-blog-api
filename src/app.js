import express from "express";
import { configDotenv } from "dotenv";
import * as routes from "./routes/index.js";
import errorHandler from "./middleware/errorHandler.js";

configDotenv();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use("/api/auth", routes.auth);


// Error Middleware
app.use(errorHandler);

app.listen(PORT, (error) => {
    if (error) {
        console.error(error);
    }

    console.log(`Server running on port ${PORT}.`);
})