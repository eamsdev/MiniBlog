import { createRoot } from 'react-dom/client';
import App from './components/App';
import './assets/scss/site.scss';
import { RouterProvider } from 'react-router5';
import { configureRouter } from './config/routes';
import ReactGA from 'react-ga';

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  ReactGA.initialize('UA-252635806-1');
  ReactGA.pageview(window.location.pathname + window.location.search);
}

const router = configureRouter();
router.start(() => {
  createRoot(document.getElementById('root')).render(
    <RouterProvider router={router}>
      <App />
    </RouterProvider>,
  );
});
