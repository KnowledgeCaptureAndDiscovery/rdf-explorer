import { Parser, Generator } from "sparqljs";
import { QueryEngine } from "@comunica/query-sparql";
import config from "../config/config";

const myEngine = new QueryEngine();
const generator = new Generator();

const performQueryHtml = async (uri: string) => {
  const query = createQuery(uri);
  const stream = await sendQueryQuads(query);
  const quads = await stream.toArray();
  return quads;
};

const performIncomingQueryHtml = async (uri: string) => {
  const query = createQueryIncoming(uri);
  const stream = await sendQueryQuads(query);
  const quads = await stream.toArray();
  return quads;
};

const performQuery = async (uri: string, format: string) => {
  const query = createQuery(uri);
  const result = await sendQuery(query);
  const triples = serializeResults(result, format);
  return triples;
};

const sendQuery = async (query: string) => {
  return await myEngine.query(query, {
    sources: [config.endpoint.sparqlUrl],
  });
};

const sendQueryQuads = async (query: string) => {
  return await myEngine.queryQuads(query, {
    sources: [config.endpoint.sparqlUrl],
  });
};

const serializeResults = async (result: any, format: string) => {
  const { data } = await myEngine.resultToString(result, format);
  return data;
};

const createQuery = (uri: string): string => {
  const parser = new Parser();
  const query = `
  CONSTRUCT { <${uri}> ?p ?o }
  WHERE  {
    GRAPH ?g
    { <${uri}> ?p ?o }
  }`;
  const parsedQuery = parser.parse(query);
  return generator.stringify(parsedQuery);
};

const createQueryIncoming = (uri: string): string => {
  const parser = new Parser();
  const query = `
  CONSTRUCT { ?s ?p <${uri}> }
  WHERE  {
    GRAPH ?g
    { ?s ?p <${uri}> }
  }`;
  const parsedQuery = parser.parse(query);
  return generator.stringify(parsedQuery);
};

export { performQueryHtml, performQuery, performIncomingQueryHtml };
