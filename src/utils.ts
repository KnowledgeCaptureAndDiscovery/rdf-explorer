import { PREFIXES } from "./prefixes";

const toPrefix = (uri: string) => {
  for (const i in PREFIXES) {
    if (uri.includes(PREFIXES[i].uri)) {
      return uri.replace(PREFIXES[i].uri, PREFIXES[i].prefix);
    }
  }
  return uri;
};

export { toPrefix };
