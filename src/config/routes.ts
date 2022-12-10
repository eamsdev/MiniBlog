import createRouter from 'router5';
import browserPlugin from 'router5-plugin-browser';

const routes = [
  { name: 'blogs', path: '/blogs' },
  { name: 'blogs.article', path: '/:id' },
  { name: 'about', path: '/about' },
];

const configureRouter = () => {
  const router = createRouter(routes, { defaultRoute: 'blogs' });
  router.usePlugin(
    browserPlugin({
      useHash: true,
    }),
  );
  return router;
};

export { configureRouter };
