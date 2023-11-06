import config from "./config/config";

const prefixes = config.prefixes;
const toPrefix = (uri: string) => {
  //transform this uri to prefix notation.
  for (const i in prefixes) {
    if (uri.includes(prefixes[i].uri)) {
      return uri.replace(prefixes[i].uri, prefixes[i].prefix);
    }
  }
  return uri;
};

export { toPrefix };
