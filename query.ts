import { Parser, Generator } from "sparqljs";
import { QueryEngine } from "@comunica/query-sparql";

import config from "./config/production";

const myEngine = new QueryEngine();

const generator = new Generator();

const performQuery = async (uri: string, format: string) => {
  const query = createQuery(uri);
  const triples = await sendQuery(query, format);
  return triples;
};

const sendQuery = async (query: string, format: string) => {
  const result = await myEngine.query(query, {
    sources: [config.endpoint.endpointUrl],
  });
  const { data } = await myEngine.resultToString(result, format);
  return data;
};

const createQuery = (uri: string): string => {
  const parser = new Parser();
  const query = `CONSTRUCT { <${uri}> ?p ?o }
  WHERE  {
    GRAPH ?g
    { <${uri}> ?p ?o }
  }`;
  const parsedQuery = parser.parse(query);
  return generator.stringify(parsedQuery);
};
export default performQuery;
