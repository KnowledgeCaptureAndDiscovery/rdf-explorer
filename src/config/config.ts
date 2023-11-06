const config = {
  endpoint: {
    endpointUrl: "https://endpoint.mint.isi.edu/provenance",
    // updateUrl: "https://endpoint.mint.isi.edu/provenance/update",
    // user: "dba",
    // password: "dba",
  },
  prefixes: [
    {
      prefix: "mint-component:",
      uri: "https://w3id.org/wings/export/MINT-production/Component#",
    },
    {
      prefix: "mint-extension:",
      uri: "https://w3id.org/wings/export/MINT-production/extension#",
    },
    {
      prefix: "mint-ci:",
      uri: "https://w3id.org/wings/export/MINT-production/resource/CanonicalInstance/",
    },
    {
      prefix: "mint-data:",
      uri: "https://w3id.org/wings/export/MINT-production/Data#",
    },

    {
      prefix: "wings-wd:",
      uri: "http://www.wings-workflows.org/ontology/workflow.owl#",
    },
    {
      prefix: "wings-wd:",
      uri: "https://www.wings-workflows.org/ontology/workflow.owl#",
    },

    {
      prefix: "wings-we:",
      uri: "http://www.wings-workflows.org/ontology/execution.owl#",
    },
    {
      prefix: "wings-we:",
      uri: "https://www.wings-workflows.org/ontology/execution.owl#",
    },

    { prefix: "os:", uri: "http://ontosoft.org/software#" },
    { prefix: "opmo:", uri: "http://openprovenance.org/model/opmo#" },
    { prefix: "opmv:", uri: "http://purl.org/net/opmv/ns#" },
    { prefix: "opmw:", uri: "https://www.opmw.org/ontology/" },
    { prefix: "prov:", uri: "http://www.w3.org/ns/prov#" },

    {
      prefix: "opmwTemplate",
      uri: "https://www.opmw.org/export/resource/WorkflowTemplate",
    },
    {
      prefix: "opmwTemplateProcess",
      uri: "https://www.opmw.org/export/resource/WorkflowTemplateProcess",
    },
    {
      prefix: "opmwDataVariable",
      uri: "https://www.opmw.org/export/resource/DataVariable",
    },

    { prefix: "owl:", uri: "http://www.w3.org/2002/07/owl#" },
    { prefix: "dc:", uri: "http://purl.org/dc/terms/" },
    { prefix: "rdf:", uri: "http://www.w3.org/1999/02/22-rdf-syntax-ns#" },
    { prefix: "rdfs:", uri: "http://www.w3.org/2000/01/rdf-schema#" },

    { prefix: "sd:", uri: "https://w3id.org/okn/o/sd#" },
    { prefix: "o:", uri: "https://w3id.org/okn/o#" },
    { prefix: "sdm:", uri: "https://w3id.org/okn/o/sdm#" },

    { prefix: "resource:", uri: "http://localhost:7070/mint/instance/" },
    { prefix: "resource:", uri: "https://w3id.org/mint/instance/" },
    { prefix: "vocab:", uri: "http://localhost:7070/mint/modelCatalog#" },
    { prefix: "vocab:", uri: "https://w3id.org/mint/modelCatalog#" },
  ],
};

export default config;
