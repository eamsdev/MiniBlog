/* eslint-disable react/no-children-prop */
import { FC, Suspense } from 'react';
import ReactMarkdown from 'react-markdown';
import React from 'react';

const CodeBlock = React.lazy(() => import('./CodeBlock'));

export const StylisedMarkdown: FC<{ markdown: string }> = (props) => {
  const { markdown } = props;
  return (
    <ReactMarkdown
      className="markdown"
      children={markdown}
      components={{
        // https://github.com/remarkjs/react-markdown#use-custom-components-syntax-highlight
        code: (props) => (
          <Suspense fallback={<span>loading...</span>}>
            <CodeBlock {...props} />
          </Suspense>
        ),
        pre: (props) => <>{props.children}</>,
      }}
    />
  );
};
