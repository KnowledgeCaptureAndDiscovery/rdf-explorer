import express, { Request, Response, Application } from "express";
import {
  performIncomingQueryHtml,
  performQuery,
  performQueryHtml,
} from "./src/query";
import { toPrefix } from "./src/utils";

const app: Application = express();
const port = process.env.PORT || 8000;
const publicDirectory = __dirname + "/public/";
app.set("view engine", "pug");
app.use(express.static(publicDirectory));

const handleQueryHtml = async (uri: string) => {
  const outcomingQuads = await performQueryHtml(uri as string);
  const incomingQuads = await performIncomingQueryHtml(uri as string);
  if (outcomingQuads.length === 0 && incomingQuads.length === 0) {
    throw new Error("Not Found");
  }
  const title = getTitle();
  return {
    incomingQuads: incomingQuads,
    outcomingQuads: outcomingQuads,
    title: title,
    toPrefix: toPrefix,
  };
  function getTitle() {
    return outcomingQuads.length > 0
      ? outcomingQuads[0].subject.value
      : incomingQuads[0].object.value;
  }
};

const handleQuery = async (uri: string, format: string) => {
  return await performQuery(uri, format);
};

app.get("/*", (req: Request, res: Response) => {
  const { path } = req;
  const uri = `https:/${path}`;
  res.format({
    "text/html": async () => {
      try {
        const data = await handleQueryHtml(uri);
        return res.render("results", data);
      } catch (error) {
        return res.status(404).send("Not Found");
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
});
