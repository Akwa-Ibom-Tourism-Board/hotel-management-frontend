// Walks a dotted path (e.g. "establishments.0.businessName") through a
// react-hook-form `errors` object, which mirrors form shape whether the
// segment is an object key or an array index.
export const getFieldError = (errors: unknown, path: string): string | undefined => {
  const parts = path.split(".");
  let cur: unknown = errors;
  for (const part of parts) {
    if (cur == null || typeof cur !== "object") return undefined;
    cur = (cur as Record<string, unknown>)[part];
  }
  if (cur && typeof cur === "object" && "message" in cur) {
    return (cur as { message?: string }).message;
  }
  return undefined;
};
