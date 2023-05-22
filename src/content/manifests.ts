type Manifest = {
  id: string;
  title: string;
  description: string;
  date: string;
  author: string;
  readTime: string;
  tags: string[];
  meta: string;
  content: () => Promise<{
    body: string;
  }>;
};

const manifests: Manifest[] = [
  {
    id: 'require-context',
    title: 'Load files dynamically with Webpack',
    description:
      "Learn how to use Webpack's require.context to dynamically load markdown files for a static blog",
    date: '23-11-2022',
    author: 'Pete Eamsuwan',
    readTime: '5 min',
    tags: ['Typescript', 'Webpack'],
    meta: "Learn how to use Webpack's require.context function to dynamically load markdown files and make it easier to add new content to your site. With this technique, you can simply drop in new markdown files and rebuild your site without having to manually update any configuration files.",
    content: () => import('../assets/posts/0_20221223_Require_Context.md'),
  },
  {
    id: 'bundle-size',
    title: 'Your bundle size matters',
    description: 'Reduce your JS bundle size to improve user experience',
    date: '28-12-2022',
    author: 'Pete Eamsuwan',
    readTime: '15 min',
    tags: ['React', 'Webpack'],
    meta: 'Learn how to reduce your JS bundle size to improve user experience by extracting css, compress JS files using GZip, using react.lazy to break down JS bundles into chunks.',
    content: () => import('../assets/posts/1_20221229_Bundle_Size.md'),
  },
  {
    id: 'aws-pipeline',
    title: 'Setting up a CICD Pipeline for your github projects',
    description:
      'Set up CICD Pipeline for your github projects using AWS Pipeline, to deploy your static content automatically.',
    date: '29-12-2022',
    author: 'Pete Eamsuwan',
    readTime: '6 min',
    tags: ['AWS', 'CICD'],
    meta: 'Learn how to set up CICD Pipeline for your github projects using AWS Pipeline, to deploy your static content automatically.',
    content: () => import('../assets/posts/2_20221229_AWS_Pipeline.md'),
  },
  {
    id: 'lazy-loading',
    title: 'Lazy Loading React Components',
    description:
      'Use React.lazy() and import() to dynamically load content on demand instead of up-front.',
    date: '31-01-2023',
    author: 'Pete Eamsuwan',
    readTime: '3 min',
    tags: ['React', 'Typescript', 'Webpack'],
    meta: 'Learn how to use React.lazy and Webpacks dynamic import to dynamically load content on demand instead of up-front.',
    content: () => import('../assets/posts/3_20230129_Lazy_Loading.md'),
  },
  {
    id: 'event-sourcing',
    title: 'Event Sourcing micro-framework with EventStore DB',
    description:
      'Create an Event Sourcing micro-framework with Entity Framework Core and EventStore DB',
    date: '12-03-2023',
    author: 'Pete Eamsuwan',
    readTime: '12 min',
    tags: ['.Net', 'Event Sourcing', 'CSharp'],
    meta: 'Learn how to use create a event sourcing micro framework with Entity Framework Core and EventStore DB',
    content: () => import('../assets/posts/4_20230312_Event_Sourcing.md'),
  },
  {
    id: 'oauth2-github',
    title: 'Dissecting OAuth2, with Github',
    description:
      'Learn more about OAuth2 and how to use it to access protected resources on github.',
    date: '03-04-2023',
    author: 'Pete Eamsuwan',
    readTime: '14 min',
    tags: ['OAuth', 'Security'],
    meta: 'Learn more about OAuth2 and how to use it to access protected resources on github.',
    content: () => import('../assets/posts/5_20230330_Dissecting_OAuth2_With_Github.md'),
  },
  {
    id: 'oauth-react-dotnet',
    title: 'OAuth with .Net 6 and React',
    description:
      'Learn how to authenticate users using OAuth for a .Net application with React frontend.',
    date: '03-05-2023',
    author: 'Pete Eamsuwan',
    readTime: '7 min',
    tags: ['OAuth', '.Net', 'CSharp', 'React'],
    meta: 'Learn how to authenticate users using OAuth for a .Net application with React frontend.',
    content: () => import('../assets/posts/6_20230503_OAuth_DotNet_React.md'),
  },
];

export { manifests, Manifest };
