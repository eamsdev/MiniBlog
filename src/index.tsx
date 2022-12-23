import { createRoot } from 'react-dom/client';
import App from './components/App';
import './assets/scss/site.scss';
import { RouterProvider } from 'react-router5';
import { configureRouter } from './config/routes';
import ReactGA from 'react-ga';

const container = document.getElementById('root');
const root = createRoot(container);

ReactGA.initialize('UA-252635806-1');
ReactGA.pageview(window.location.pathname + window.location.search);
const router = configureRouter();

router.start(() => {
  root.render(
    <RouterProvider router={router}>
      <App />
    </RouterProvider>,
  );
});
