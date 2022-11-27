declare module '*.md' {
  const attributes: Record<string, unknown>;
  export { attributes };
}

declare module '*.md' {
  const body: string;
  export { body };
}
