const config = {
  endpoint: {
    sparqlUrl: "https://endpoint.mint.isi.edu/provenance",
  },
  logLevel: "info",
  prefixes: [
    { prefix: "owl:", uri: "http://www.w3.org/2002/07/owl#" },
    { prefix: "dc:", uri: "http://purl.org/dc/terms/" },
    { prefix: "rdf:", uri: "http://www.w3.org/1999/02/22-rdf-syntax-ns#" },
    { prefix: "rdfs:", uri: "http://www.w3.org/2000/01/rdf-schema#" },
  ],
};

export default config;
