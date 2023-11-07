## RDF Explorer

RDF Explorer is a frontend for SPARQL endpoints that lets you explore resources and view their information, including attributes and relations.

DISCLAIMER: This is a work in progress. The application has been tested with Apache Jena Fuseki. Other SPARQL endpoints may not work properly. If you want extra features, please open read the [contributing guidelines](CONTRIBUTING.md) and open an issue.

## Installation

To install RDF Explorer, you need to have Node.js and `yarn` and `node` installed. Once you have them installed, you can install all the dependencies by running the following command:

```bash
yarn install
yarn build
yarn start
```

### Configuration

The application can be configured by using environment variables. The following variables are supported:

- `PORT`: The port where the application will be listening.
- `LOGLEVEL`: The log level. The possible values are `DEBUG`, `INFO`, `WARN`, and `ERROR`.
- `SPARQL_QUERY_URL`: The URL of the SPARQL endpoint to be used.

You can use an `.env` file to set environment variables. For example, this command creates an `.env` file for our PROVENANCE endpoint:

```bash
$ echo 'SPARQL_QUERY_URL="https://endpoint.mint.isi.edu/provenance"
PORT=8000
LOGLEVEL=INFO' > .env
```

### Usage

To get the information of a resource (for example, `https://opmw.org/exportTest/resource/WorkflowExecutionAccount/Caesar_Cypher-2b-3c5e9dd8-6c44-4666-a6a2-cf572aca76db`), you can use the following URL:

http://localhost:8000/opmw.org/exportTest/resource/WorkflowExecutionAccount/Caesar_Cypher-2b-3c5e9dd8-6c44-4666-a6a2-cf572aca76db

RDF Explorer will show the information of the resource, including its attributes and relations.

#### Content negotiation

RDF Explorer supports content negotiation. You can get the information of a resource in different formats by using the `Accept` header. For example, to get the information of `https://opmw.org/exportTest/resource/WorkflowExecutionAccount/Caesar_Cypher-2b-3c5e9dd8-6c44-4666-a6a2-cf572aca76db` in Turtle format, you can use the following command:

```bash
curl -H "Accept: text/turtle" http://localhost:8000/opmw.org/exportTest/resource/WorkflowExecutionAccount/Caesar_Cypher-2b-3c5e9dd8-6c44-4666-a6a2-cf572aca76db
```

The following formats are supported:

- `text/turtle`: Turtle format.
- `application/rdf+xml`: RDF/XML format.
- `application/ld+json`: JSON-LD format.
- `application/n-triples`: N-Triples format.
- `application/n-quads`: N-Quads format.
- `application/trig`: TriG format.
- `application/n3`: N3 format.
- `text/n3`: N3 format.
- `text/html`: HTML format.
