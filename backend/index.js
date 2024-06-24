import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";
// http://localhost:5555/books

const app = express();

//MIDDLEWARE FOR PARSING REQUEST BODY
app.use(express.json());
//MIDDLEWARE FOR HANDLING CORS POLICY

//OPTION1: ALLOW ALL ORIGINS WITH DEFAULT OF CORS
app.use(cors());
//CORS is a security feature implemented by web browsers that restricts HTTP requests that are initiated from scripts running in the browser to a different origin (domain, protocol, or port) than the one from which the script was loaded.
//OPTION2: ALLOW CUSTOM ORIGINS
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );
app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("WELCOME TO MERN");
});

app.use("/books", booksRoute); // for each book request handle them with this route. for each model create a route file. eg.bookRoute.js

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
