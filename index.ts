import express, { Request, Response, Application } from "express";
import {
  performIncomingQueryHtml,
  performQuery,
  performQueryHtml,
} from "./query";
const app: Application = express();
const port = process.env.PORT || 8000;
const views = __dirname + "/views/";
const publicDirectory = __dirname + "/public/";
app.set("view engine", "pug");
app.use(express.static(publicDirectory));

app.get("/*", (req: Request, res: Response) => {
  const { path } = req;
  const uri = `https:/${path}`;
  res.format({
    "text/html": async function () {
      const outcomingQuads = await performQueryHtml(uri);
      const incomingQuads = await performIncomingQueryHtml(uri);
      if (outcomingQuads.length === 0 && incomingQuads.length === 0) {
        return res.status(404).send("Not Found");
      }
      const title =
        outcomingQuads.length > 0
          ? outcomingQuads[0].subject.value
          : incomingQuads[0].object.value;
      return res.render("results", {
        incomingQuads: incomingQuads,
        outcomingQuads: outcomingQuads,
        title: title,
      });
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
