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

export { Config, Prefix };
