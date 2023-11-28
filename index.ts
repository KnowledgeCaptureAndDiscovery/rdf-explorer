import express, { Request, Response, Application } from "express";
import { performQuery } from "./src/query";
import { config } from "./src/config";
import { handleQueryHtml } from "./src/renderHtml";

//set express
const app: Application = express();
const port = config.port;
const publicDirectory = __dirname + "/public/";

app.set("view engine", "pug");
app.use(express.static(publicDirectory));

const handleQuery = async (uri: string, format: string) => {
  console.log(`Request for ${uri} in ${format}`);
  return await performQuery(uri, format, config.sparqlQueryUrl);
};

app.get("/*", (req: Request, res: Response) => {
  const { path } = req;
  const uri = `https:/${path}`;
  console.log(`Request for ${uri}`);
  res.format({
    "text/html": async () => {
      const data = await handleQueryHtml(uri, config.sparqlQueryUrl);
      if (data.outcomingQuads.length === 0 && data.incomingQuads.length === 0) {
        const message = `<h1>Not Found</h1> <p>There is no data for <a href="${uri}">${uri}</a></p> <p> Endpoint: <a href="${config.sparqlQueryUrl}">${config.sparqlQueryUrl}</a></p>`;
        return res.status(404).send(message);
      } else {
        return res.render("results", data);
      }
    },
    "application/n-quads": async () => {
      const stream = await handleQuery(uri, "application/n-quads");
      return stream.pipe(res);
    },
    "application/n-triples": async function () {
      const stream = await handleQuery(uri, "application/n-triples");
      return stream.pipe(res);
    },
    "application/rdf+xml": async function () {
      const stream = await handleQuery(uri, "application/rdf+xml");
      return stream.pipe(res);
    },
    "application/n3": async function () {
      const stream = await handleQuery(uri, "application/n3");
      return stream.pipe(res);
    },
    "text/n3": async function () {
      const stream = await handleQuery(uri, "text/n3");
      return stream.pipe(res);
    },
    "application/trig": async function () {
      const stream = await handleQuery(uri, "application/trig");
      return stream.pipe(res);
    },
    "application/trix": async function () {
      const stream = await handleQuery(uri, "application/trix");
      return stream.pipe(res);
    },
    "application/turtle": async function () {
      const stream = await handleQuery(uri, "application/turtle");
      return stream.pipe(res);
    },
    "text/turtle": async function () {
      const stream = await handleQuery(uri, "text/turtle");
      return stream.pipe(res);
    },
    "application/x-turtle": async function () {
      const stream = await handleQuery(uri, "application/x-turtle");
      return stream.pipe(res);
    },
    "application/ld+json": async function () {
      const stream = await handleQuery(uri, "application/ld+json");
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
  console.log(`Sparql endpoint is ${config.sparqlQueryUrl}`);
});
