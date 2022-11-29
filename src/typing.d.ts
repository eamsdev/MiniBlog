declare module '*.md' {
  const attributes: Record<string, string>;
  export { attributes };
}

declare module '*.md' {
  const body: string;
  export { body };
}
