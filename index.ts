import express, { Request, Response, Application } from "express";
import dotenv from "dotenv";
import performQuery from "./query";
const app: Application = express();
const port = process.env.PORT || 8000;

app.get("/*", (req: Request, res: Response) => {
  //Get path, query, fragment from the request
  const { path } = req;
  const uri = `https:/${path}`;
  res.format({
    "text/html": function () {
      res.send("<p>Welcome to the home page!</p>");
    },
    "application/n-quads": async function () {
      const stream = await performQuery(uri, "application/n-quads");
      return stream.pipe(res);
    },
    "application/n-triples": async function () {
      const stream = await performQuery(uri, "application/n-triples");
      return stream.pipe(res);
    },
    "application/rdf+xml": async function () {
      const stream = await performQuery(uri, "application/rdf+xml");
      return stream.pipe(res);
    },
    "application/trig": async function () {
      const stream = await performQuery(uri, "application/trig");
      return stream.pipe(res);
    },
    "application/trix": async function () {
      const stream = await performQuery(uri, "application/trix");
      return stream.pipe(res);
    },
    "application/turtle": async function () {
      const stream = await performQuery(uri, "application/turtle");
      return stream.pipe(res);
    },
    "application/x-turtle": async function () {
      const stream = await performQuery(uri, "application/x-turtle");
      return stream.pipe(res);
    },
    "application/ld+json": async function () {
      const stream = await performQuery(uri, "application/ld+json");
      return stream.pipe(res);
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
