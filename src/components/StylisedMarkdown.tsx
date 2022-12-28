/* eslint-disable react/no-children-prop */
import { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import { CodeProps } from 'react-markdown/lib/ast-to-react';
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx';
import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript';
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';
import scss from 'react-syntax-highlighter/dist/esm/languages/prism/scss';
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash';
import markdown from 'react-syntax-highlighter/dist/esm/languages/prism/markdown';
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

SyntaxHighlighter.registerLanguage('tsx', tsx);
SyntaxHighlighter.registerLanguage('typescript', typescript);
SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('scss', scss);
SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('markdown', markdown);
SyntaxHighlighter.registerLanguage('json', json);

export const StylisedMarkdown: FC<{ markdown: string }> = (props) => {
  const { markdown } = props;
  return (
    <ReactMarkdown
      className="markdown"
      children={markdown}
      components={{
        // https://github.com/remarkjs/react-markdown#use-custom-components-syntax-highlight
        code: (props) => <CodeBlock {...props} />,
        pre: (props) => <>{props.children}</>,
      }}
    />
  );
};

const CodeBlock: FC<CodeProps> = ({ className, inline, children, ...props }: CodeProps) => {
  // https://github.com/react-syntax-highlighter/react-syntax-highlighter/issues/489#issuecomment-1316278858
  const match = /language-(\w+)/.exec(className || '');
  return !inline ? (
    <SyntaxHighlighter {...props} style={dracula} language={match ? match[1] : 'language-shell'}>
      {String(children).replace(/\n$/, '')}
    </SyntaxHighlighter>
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  );
};
