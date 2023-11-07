import { performIncomingQueryHtml, performQueryHtml } from "./query";
import { toPrefix } from "./utils";

const handleQueryHtml = async (uri: string, endpoint: string) => {
  const outcomingQuads = await performQueryHtml(uri, endpoint);
  const incomingQuads = await performIncomingQueryHtml(uri, endpoint);
  if (outcomingQuads.length === 0 && incomingQuads.length === 0) {
    throw new Error("Not Found");
  }
  const title = getTitle();
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
