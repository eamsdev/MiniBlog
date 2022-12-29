---
id: bundle-size
title: Your bundle size matters
description: Reduce your JS bundle size to improve user experience
date: 29-12-2022
author: Pete Eamsuwan
readtime: 6 min
meta: Learn how to reduce your JS bundle size to improve user experience by extracting css, compress JS files using GZip, using react.lazy to break down JS bundles into chunks.
tags:
  - React
  - Webpack
---

Webpack configuration is one of the things that I had taken for granted since I have started my web development journey (my background was in backed, so I rarely touch frontend configurations). It is something that you only have to configure once, and if you have done it correctly, you usually don't have to touch it again. However, it is not until I started this blog that I have started paying attention to what the configuration actually does and what impact it has on performance and user experience.

A larger JavaScript bundle can take longer to download, which can result in a slower loading time for your application. This can be frustrating for users, and may even cause them to leave your site if it takes too long to load.

Lets explore some tweaks you can easily do to your configuration to dramatically reduce your js bundle size and/or improve your website's load time.

## GZip Compression

The first time I built the static assets for deployment, I was presented with this message: 

```shell
WARNING in asset size limit: The following asset(s) exceed the recommended size limit (244 KiB).
This can impact web performance.
Assets:
  js/bundle.55cf82631abc91f34661.min.js (1.98 MiB)
```

_OK... thats pretty big_. This led me to do some research about Gzip compression, and that's when I learned that it is uncommon for minified JS files to be served uncompressed, as modern browsers typically support Gzip compression.

Lets add Gzip plugin and see how much the bundle size can be improved. In the plugins section of your webpack configuration, add the following.

```js
plugins: [
  ...
  new CompressionPlugin({
    algorithm: 'gzip',
    test: /.js$|.css$/,
  }),
  ...
],
```

I re-ran the build, and I was presented with:

```shell
WARNING in asset size limit: The following asset(s) exceed the recommended size limit (244 KiB).
This can impact web performance.
Assets:
  js/bundle.55cf82631abc91f34661.min.js (1.98 MiB)
  js/bundle.55cf82631abc91f34661.min.js.gz (523 KiB)
```

Four times smaller, now we're cooking with gas. Definitely not perfect, but an improvement.

## Choosing the right modules

Next, we need to analyze our package.json dependencies to see if there are any modules that are causing our bundles to become too large. Fortunately, there is a website called [BundlePhobia](https://bundlephobia.com/) that can help us with that.

When I used BundlePhobia to scan my package.json, it highlighted some interesting issues:

- react-bootstrap size comes in at 113.7kb (minified), 36.7kb (minified + gzip)
- moment.js size comes in at 290.4kb (minified), 72.1kb (minified + gzip)
- react-syntax-highlighter comes in at a **whopping 1.5MB (minified)** and 496.5kb (minified + gzip)

After some thoughts, I came to the following conclusion:

- remove react-bootstrap, because I'm already using bootstrap scss
- changed moment.js to day.js, a lighter weight library that does pretty much the same thing
- I'm not going to deal with react-syntax-highlighter yet; we will address it in the "Code Splitting" section of this article.

After making the above changes and re-running the build, the sizes have come down to:

```shell
WARNING in asset size limit: The following asset(s) exceed the recommended size limit (244 KiB).
This can impact web performance.
Assets:
  js/bundle.74aa3bdc43110058c6aa.min.js (1.69 MiB)
  js/bundle.74aa3bdc43110058c6aa.min.js.gz (451 KiB)
```

Not great, not terrible.

Lets see if we can do better.

## Only importing what you need

At this point I would like to introduce you to a Webpack's plugin called BundleAnalyzerPlugin. This will help us pinpoint where the bloat in our JS bundle is coming from.

To add it to your application, run `yarn add -D webpack-bundle-analyzer` and add the following to your webpack configuration:

```js
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
...
plugins: [
    ...
    new CompressionPlugin({
      algorithm: 'gzip',
      test: /.js$|.css$/,
    }),
    new BundleAnalyzerPlugin(),
    ...
```

Build your static assets, and the plugin will report out what your bloat consists of.

Initially, I was surprised to see that 35% or 124kb (minified + gzip) of the size actually came from my scss/css files! Then it hit me that I had done `@import '../../../node_modules/bootstrap/scss/bootstrap.scss';` instead of actually importing only the components that I needed. 

So I went back and selectively imported only the bootstrap components that I actually needed, for example:

```scss
@import '../../../node_modules/bootstrap/scss/functions';
@import '../../../node_modules/bootstrap/scss/variables';
@import '../../../node_modules/bootstrap/scss/maps';
@import '../../../node_modules/bootstrap/scss/mixins';
...
@import '../../../node_modules/bootstrap/scss/utilities/api';
@import '../../../node_modules/bootstrap/scss/pagination';
...
```

Rerunning the bundle analyzer showed that the scss asset size went down from 125kb (minified + gzip) down to 72kb (minified + gzip).

```shell
WARNING in asset size limit: The following asset(s) exceed the recommended size limit (244 KiB).
This can impact web performance.
Assets:
  js/bundle.7ec103a7da3596fcf355.min.js (1.37 MiB)
  js/bundle.7ec103a7da3596fcf355.min.js.gz (399 KiB)
```

Getting better!

## Extracting CSS/Minmize CSS

At this point, about 25% of the bundle size is still the css assets. Lets see if we can optimize this further

### Extracting CSS

By default without any additional Webpack's configuration, CSS are automatically inlined into the bundled JS files. This has some disadvantages:

- Visitors of the site may experience Flash of Unstyled Content (FOUC), due to the CSS being loaded only after the content has already been rendered (because the CSS is coupled with the JS files)
- CSS cannot be loaded in parallel, which hurts the overal performance of the site. By keeping them separate, the browser can start rendering the page as soon as the CSS is available, rather than waiting for the entire JavaScript bundle to download and execute.

Let add the CSS extractor and the CSS Minimizer plugin to our Webpack's configuration:

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
...
module: {
    rules: [
      {
        test: /\.(scss|sass)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'], // Note: MiniCssExtractPlugin's loader sits in-place of the style-loader
      },
    ],
  },
...
optimization: {
  minimize: true,
  minimizer: [new CssMinimizerPlugin(), '...'],
},
...
plugins: [
  ...
    new MiniCssExtractPlugin(),
  ...
  ],
```

Rerunning the build and the analyzer will show that the css assets are no longer part of the bundled js, and the bundle size has been brought down to:

```shell
WARNING in asset size limit: The following asset(s) exceed the recommended size limit (244 KiB).
This can impact web performance.
Assets:
  js/bundle.9823fae9f9c86ef89e74.min.js (985 KiB)
  js/bundle.9823fae9f9c86ef89e74.min.js.gz (326 KiB)
```

## Code splitting

In the previous section, I mentioned that react-syntax-highlighter was the main culprit in my js bundle being so bloated. As it turns out, I was not the only one who encountered this issue. One of the Github issues mentioned that I should be lazy loading the component.

### What does React.lazy do?

Using React.lazy, you can split your components into separate code chunks and only import and render them when they are needed. This means that the initial JavaScript bundle will be smaller, as it will only include the code for the components that are required for the initial rendering of the application. As the user navigates to different pages, additional code chunks can be loaded on demand, further reducing the overall bundle size and improving the performance of the application.

Without React.lazy, all of the code for all of the components would be included in the initial JavaScript bundle, even if a particular component is only used on one page. This can result in a larger bundle size and slower loading times.

This is how React.laxy is being used in my application:

```tsx
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
```

Additionally in the CodeBlock component, I'm only selectively importing components (themes and langauges) that I need.

```tsx
/* eslint-disable react/no-children-prop */
import { FC } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/prism-async-light';
import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript';
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';
import dracula from 'react-syntax-highlighter/dist/esm/styles/prism/dracula';

SyntaxHighlighter.registerLanguage('typescript', typescript);
SyntaxHighlighter.registerLanguage('javascript', javascript);

const CodeBlock: FC<{ className?; inline?; children? }> = ({ className, inline, children }) => {
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
```

Lets rerun the build and see the impact on the bundle size:

```shell
WARNING in asset size limit: The following asset(s) exceed the recommended size limit (244 KiB).
This can impact web performance.
Assets:
  js/bundle.d09e9baeecc9cb712fc1.min.js (380 KiB)
```

_Incredible, the bundle size has reduced dramatically, and the warning on the min.js.gz file has disappeared_

Inspecting the js bundle shows that the largest js file is only 118KB (minified + gzip) which is a massive improvement from the initial non gzip size of nearly 2MB and gzip size of 500Kb.

If you are interested to see this working in action, please checkout the source code at [my github repo](https://github.com/eamsdev/MiniBlog).

## Resources

---

- [Webpack's CompressionPlugin](https://webpack.js.org/plugins/compression-webpack-plugin/)
- [Webpack's BundleAnalyzerPlugin](https://github.com/webpack-contrib/webpack-bundle-analyzer)
- [Webpack's MiniCssExtractPlugin](https://webpack.js.org/plugins/mini-css-extract-plugin/)
- [Webpack's CssMinimizerPlugin](https://webpack.js.org/plugins/css-minimizer-webpack-plugin/)
- [React Lazy: Code Splitting](https://reactjs.org/docs/code-splitting.html)
