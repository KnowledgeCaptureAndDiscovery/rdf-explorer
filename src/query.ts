import { Parser, Generator } from "sparqljs";
import { QueryEngine } from "@comunica/query-sparql";

const performQueryHtml = async (uri: string, endpoint: string) => {
  const query = createQuery(uri);
  const stream = await sendQueryQuads(query, endpoint);
  const quads = await stream.toArray();
  return quads;
};

const performIncomingQueryHtml = async (uri: string, endpoint: string) => {
  const query = createQueryIncoming(uri);
  const stream = await sendQueryQuads(query, endpoint);
  const quads = await stream.toArray();
  return quads;
};

const performQuery = async (uri: string, format: string, endpoint: string) => {
  console.log("Performing query");
  const query = createQuery(uri);
  console.log(query);
  const result = await sendQuery(query, endpoint);
  const triples = await serializeResults(result, format);
  return triples;
};

const sendQuery = async (query: string, endpoint: string) => {
  const myEngine = new QueryEngine();
  return await myEngine.query(query, {
    sources: [endpoint],
  });
};

const sendQueryQuads = async (query: string, endpoint: string) => {
  const myEngine = new QueryEngine();
  return await myEngine.queryQuads(query, {
    sources: [endpoint],
  });
};

const serializeResults = async (result: any, format: string) => {
  const myEngine = new QueryEngine();
  const { data } = await myEngine.resultToString(result, format);
  return data;
};

const createQuery = (uri: string): string => {
  const generator = new Generator();
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
  const generator = new Generator();
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
