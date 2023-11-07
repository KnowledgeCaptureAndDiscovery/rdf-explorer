import { PREFIXES } from "./prefixes";
import { Prefix } from "./types";

const toPrefix = (uri: string, prefixes: Prefix[]) => {
  for (const i in PREFIXES) {
    if (uri.includes(prefixes[i].uri)) {
      return uri.replace(prefixes[i].uri, prefixes[i].prefix);
    }
  }
  return uri;
};

export { toPrefix };
