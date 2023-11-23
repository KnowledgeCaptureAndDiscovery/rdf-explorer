import type * as RDF from "@rdfjs/types";

interface Config {
  sparqlQueryUrl: string;
  port: number;
  logLevel: string;
  prefixes: Prefix[];
}

interface Prefix {
  prefix: string;
  uri: string;
}

interface QueryResults {
  quads: RDF.Quad[];
  query: string;
}

export { Config, Prefix, QueryResults };
