import createRouter from 'router5';
import loggerPlugin from 'router5-plugin-logger';
import browserPlugin from 'router5-plugin-browser';
import routes from './routes.js';

export default function configureRouter() {
  const router = createRouter(routes, {
    defaultRoute: 'schedules'
  });

  router.usePlugin(loggerPlugin);
  router.usePlugin(
    browserPlugin({
      useHash: true
    })
  );

  return router;
}