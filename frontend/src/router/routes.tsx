import { ROUTES } from '@/constants/RouteConst';

import type { TypeRoutes } from '@/types/Components';
import { lazy } from 'react';

const Index = lazy(() => import('../pages/Index'));
const Login = lazy(() => import('@/pages/auth/login/Login'));

const DashboardIndex = lazy(() => import('@/pages/dashboard/DashboardIndex'));

const privateRoutes = [
    {
        path: '/',
        element: <Index />,
        layout: 'default',
    },

    {
        path: ROUTES.DASHBOARD,
        element: <DashboardIndex />,
        layout: 'default',
    },
];

const publicRoutes: TypeRoutes[] = [
    {
        path: ROUTES.LOGIN,
        element: <Login />,
        layout: 'blank',
    },
];

const routes: TypeRoutes[] = privateRoutes.concat(publicRoutes);

export { routes };
