import { performIncomingQueryHtml, performQueryHtml } from "./query";
import { toPrefix } from "./utils";

const handleQueryHtml = async (uri: string, endpoint: string) => {
  const outcomingQuads = await performQueryHtml(uri, endpoint);
  const incomingQuads = await performIncomingQueryHtml(uri, endpoint);
  const title =
    outcomingQuads.length === 0 && incomingQuads.length === 0
      ? "Not Found"
      : getTitle();
  return {
    incomingQuads: incomingQuads,
    outcomingQuads: outcomingQuads,
    title: title,
    toPrefix: toPrefix,
  };
  function getTitle() {
    return outcomingQuads.length > 0
      ? outcomingQuads[0].subject.value
      : incomingQuads[0].object.value;
  }
};

export { handleQueryHtml };
