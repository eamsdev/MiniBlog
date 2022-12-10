import { createRoot } from 'react-dom/client';
import App from './components/App';
import './assets/scss/site.scss';
import { RouterProvider } from 'react-router5';
import { configureRouter } from './config/routes';

const container = document.getElementById('root');
const root = createRoot(container);

const router = configureRouter();
router.start(() => {
  root.render(
    <RouterProvider router={router}>
      <App />
    </RouterProvider>,
  );
});
