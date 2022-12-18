import createRouter from 'router5';
import browserPlugin from 'router5-plugin-browser';

const routes = [
  { name: 'blogs', path: '/blogs/page/:page' },
  { name: 'articles', path: '/articles?tag&date' },
  { name: 'article', path: '/article/:id' },
  { name: 'about', path: '/about' },
];

const configureRouter = () => {
  const router = createRouter(routes, {
    defaultRoute: 'blogs',
    defaultParams: { page: 0 },
    queryParamsMode: 'loose',
  });
  router.usePlugin(
    browserPlugin({
      useHash: false, // Hash routing is evil
    }),
  );
  return router;
};

export { configureRouter };
