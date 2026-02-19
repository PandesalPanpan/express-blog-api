import express from "express";
import * as routes from "./routes/index.js";
import errorHandler from "./middleware/errorHandler.js";
import { PORT } from "./config.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use("/api/auth", routes.auth);
app.use("/api/post", routes.post);

// Error Middleware
app.use(errorHandler);

app.listen(PORT, (error) => {
    if (error) {
        console.error(error);
    }

    console.log(`Server running on port ${PORT}.`);
})