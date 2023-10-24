import Index from '@/pages/Index';
import Root from '@/pages';
import { createBrowserRouter, type RouteObject } from 'react-router-dom';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <Index />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
