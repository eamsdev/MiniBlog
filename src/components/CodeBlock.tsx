/* eslint-disable react/no-children-prop */
import { FC } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/prism-light';
import dracula from 'react-syntax-highlighter/dist/esm/styles/prism/dracula';
import light from 'react-syntax-highlighter/dist/esm/styles/prism/gruvbox-light';
import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript';
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import csharp from 'react-syntax-highlighter/dist/esm/languages/prism/csharp';
import scss from 'react-syntax-highlighter/dist/esm/languages/prism/scss';
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json';
import yaml from 'react-syntax-highlighter/dist/esm/languages/prism/yaml';
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash';
import { rootStore } from '../stores/RootStore';
import { observer } from 'mobx-react-lite';

SyntaxHighlighter.registerLanguage('typescript', typescript);
SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('tsx', tsx);
SyntaxHighlighter.registerLanguage('jsx', jsx);
SyntaxHighlighter.registerLanguage('csharp', csharp);
SyntaxHighlighter.registerLanguage('yaml', yaml);
SyntaxHighlighter.registerLanguage('json', json);
SyntaxHighlighter.registerLanguage('scss', scss);
SyntaxHighlighter.registerLanguage('bash', bash);

const CodeBlock: FC<{ className?; inline?; children? }> = observer(
  ({ className, inline, children }) => {
    // https://github.com/react-syntax-highlighter/react-syntax-highlighter/issues/489#issuecomment-1316278858
    const match = /language-(\w+)/.exec(className || '');
    return !inline ? (
      <SyntaxHighlighter
        style={rootStore.themeStore.isLight ? light : dracula}
        language={match ? match[1] : 'language-shell'}
      >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    ) : (
      <code className={className}>{children}</code>
    );
  },
);

export default CodeBlock;
