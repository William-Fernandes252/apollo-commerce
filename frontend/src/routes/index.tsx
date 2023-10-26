import IndexPage from '@/pages/IndexPage';
import ProductsPage from '@/pages/ProductsPage';
import Root from '@/pages';
import { createBrowserRouter, type RouteObject } from 'react-router-dom';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <IndexPage />,
      },
      {
        path: 'products',
        element: <ProductsPage />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
