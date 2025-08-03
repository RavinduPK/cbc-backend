import express from "express";
import mongoose from "mongoose";
import studentRounter from "./roots/studentsrouter.js";
import userRouter from "./roots/userRouter.js";
import productRouter from "./roots/productrouter.js"; // Ensure productRouter is imported correctly
import jwt, { decode } from "jsonwebtoken"; // import jwt for token verification

const app = express();

app.use(express.json()); // middleware to parse JSON

// Middleware for token logging and verification
app.use((req, res, next) => {
    let token = req.headers["authorization"]; // use let to allow reassignment
    if (token != null) {
        token = token.replace("Bearer", "").trim(); // trim spaces after removing "Bearer"
        console.log("Token:", token);
        jwt.verify(token, "jwt secret", (err, decoded) => {
            if (decode == null) {
                res.json({
                    message : "Invalid Token",
                })
           return
            } else {
                req.user = decoded; // attach decoded user info to request object
            }
        });
    }
    next(); // proceed to the next middleware/route
});

const connectionstring = "mongodb+srv://admin:TJsod22520@cluster0.pqwfcqb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(connectionstring).then(() => {
    console.log("Database Connected Successfully");
}).catch((err) => {
    console.log("Database Connection failed.", err);
});

app.use("/students", studentRounter);
app.use("/users", userRouter);
app.use("/products", productRouter); // Ensure productRouter is imported correctly

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
