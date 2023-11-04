import express, { Express, Request, Response, Application } from "express";
import dotenv from "dotenv";

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.get("/", (req: Request, res: Response) => {
  res.format({
    "text/plain": function () {
      res.send("Welcome to the home page!");
    },

    "text/html": function () {
      res.send("<p>Welcome to the home page!</p>");
    },

    "text/turtle": function () {
      res.send({ message: "Welcome to the home page!" });
    },

    default: function () {
      // log the request and respond with 406
      res.status(406).send("Not Acceptable");
    },
  });
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
