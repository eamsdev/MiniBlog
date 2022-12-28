/* eslint-disable react/no-children-prop */
import { FC } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/prism-async-light';
import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript';
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';
import dracula from 'react-syntax-highlighter/dist/esm/styles/prism/dracula';

SyntaxHighlighter.registerLanguage('typescript', typescript);
SyntaxHighlighter.registerLanguage('javascript', javascript);

const CodeBlock: FC<{ className?; inline?; children? }> = ({ className, inline, children }) => {
  // https://github.com/react-syntax-highlighter/react-syntax-highlighter/issues/489#issuecomment-1316278858
  const match = /language-(\w+)/.exec(className || '');
  return !inline ? (
    <SyntaxHighlighter style={dracula} language={match ? match[1] : 'language-shell'}>
      {String(children).replace(/\n$/, '')}
    </SyntaxHighlighter>
  ) : (
    <code className={className}>{children}</code>
  );
};

export default CodeBlock;
