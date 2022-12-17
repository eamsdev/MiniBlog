declare module '*.md' {
  const attributes: Record<string, string>;
  export { attributes };
}

declare module '*.md' {
  const body: string;
  export { body };
}

declare module '*.jpg' {
  const content: any;
  export default content;
}
