import dotenv from "dotenv";
import { Config } from "./types";
import { PREFIXES } from "./prefixes";

dotenv.config();

const config: Config = {
  sparqlQueryUrl: process.env.SPARQL_QUERY_URL as string,
  port: parseInt(process.env.PORT as string) || 8000,
  logLevel: (process.env.LOG_LEVEL as string) || "info",
  prefixes: PREFIXES,
};

if (!config.sparqlQueryUrl) {
  console.error("SPARQL_QUERY_URL is not set");
  process.exit(1);
}

export { config };
