import { Parser } from "sparqljs";

const sendQuery = (uri: string, format) => {
  const parser = new Parser();
  const query = `CONSTRUCT { ?s ?p ?o }
  WHERE  {
    GRAPH < ${uri} >
    { ?s ?p ?o }
  } LIMIT 10 `;
  parser.parse(query);

  console.log("sending query " + uri);
};
export default sendQuery;
