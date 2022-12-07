/* eslint-disable react/no-children-prop */
import { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import { CodeProps } from 'react-markdown/lib/ast-to-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';

export const StylisedMarkdown: FC<{ markdown: string }> = (props) => {
  const { markdown } = props;
  return (
    <ReactMarkdown
      className="markdown"
      children={markdown}
      remarkPlugins={[remarkGfm]}
      components={{
        // https://github.com/remarkjs/react-markdown#use-custom-components-syntax-highlight
        code: (props) => <CodeBlock {...props} />,
      }}
    />
  );
};

const CodeBlock: FC<CodeProps> = ({ className, children, ...props }: CodeProps) => {
  // https://github.com/react-syntax-highlighter/react-syntax-highlighter/issues/489#issuecomment-1316278858
  const match = /language-(\w+)/.exec(className || '');
  return (
    <SyntaxHighlighter
      {...props}
      style={dracula}
      PreTag="div"
      language={match ? match[1] : 'language-shell'}
    >
      {String(children).replace(/\n$/, '')}
    </SyntaxHighlighter>
  );
};
