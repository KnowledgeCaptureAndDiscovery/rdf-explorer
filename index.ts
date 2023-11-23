import express, { Request, Response, Application } from "express";
import pino from "pino-http";
import { performQuery } from "./src/query";
import { config } from "./src/config";
import { handleQueryHtml } from "./src/renderHtml";

//set express
const app: Application = express();
const port = config.port;
const publicDirectory = __dirname + "/public/";
const logger = pino({
  level: config.logLevel,
  autoLogging: false,
});

app.set("view engine", "pug");
app.use(express.static(publicDirectory));
app.use(logger);

const handleQuery = async (uri: string, format: string) => {
  return await performQuery(uri, format, config.sparqlQueryUrl);
};

app.get("/*", (req: Request, res: Response) => {
  const { path } = req;
  const uri = `https:/${path}`;
  req.log.info(`Request for ${uri}`);
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
      return (await handleQuery(uri, "application/n-quads")).pipe(res);
    },
    "application/n-triples": async function () {
      return (await handleQuery(uri, "application/n-triples")).pipe(res);
    },
    "application/rdf+xml": async function () {
      return (await handleQuery(uri, "application/rdf+xml")).pipe(res);
    },
    "application/n3": async function () {
      return (await handleQuery(uri, "application/n3")).pipe(res);
    },
    "text/n3": async function () {
      return (await handleQuery(uri, "text/n3")).pipe(res);
    },
    "application/trig": async function () {
      return (await handleQuery(uri, "application/trig")).pipe(res);
    },
    "application/trix": async function () {
      return (await handleQuery(uri, "application/trix")).pipe(res);
    },
    "application/turtle": async function () {
      return (await handleQuery(uri, "application/turtle")).pipe(res);
    },
    "text/turtle": async function () {
      return (await handleQuery(uri, "text/turtle")).pipe(res);
    },
    "application/x-turtle": async function () {
      return (await handleQuery(uri, "application/x-turtle")).pipe(res);
    },
    "application/ld+json": async function () {
      return (await handleQuery(uri, "application/ld+json")).pipe(res);
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
