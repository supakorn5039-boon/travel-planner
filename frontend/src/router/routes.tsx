import { ROLES } from '@/constants/RoleConst';
import { ROUTES } from '@/constants/RouteConst';
import MyTripIndex from '@/pages/profile/MyTripIndex';

import type { TypeRoutes } from '@/types/Components';
import { lazy } from 'react';

const Login = lazy(() => import('@/pages/auth/login/Login'));
const Register = lazy(() => import('@/pages/auth/register/Register'));

const HomeIndex = lazy(() => import('@/pages/home/HomeIndex'));
const ProfileIndex = lazy(() => import('@/pages/profile/ProfileIndex'));
const DestinationIndex = lazy(() => import('@/pages/destination/DestinationIndex'));

const AboutIndex = lazy(() => import('@/pages/about/AboutIndex'));

const BookingDestination = lazy(() => import('@/pages/destination/BookingDestination'));

const privateRoutes: TypeRoutes[] = [
    {
        path: ROUTES.HOME,
        element: <HomeIndex />,
        layout: 'default',
        allowedRoles: [ROLES.USER, ROLES.ADMIN],
    },
    {
        path: ROUTES.DESTINATION,
        element: <DestinationIndex />,
        layout: 'default',
        allowedRoles: [ROLES.USER, ROLES.ADMIN],
    },
    {
        path: `${ROUTES.DESTINATION}/:id`,
        element: <BookingDestination />,
        layout: 'default',
        allowedRoles: [ROLES.USER, ROLES.ADMIN],
    },
    {
        path: ROUTES.PROFILE,
        element: <ProfileIndex />,
        layout: 'default',
        allowedRoles: [ROLES.USER, ROLES.ADMIN],
    },

    {
        path: ROUTES.ABOUT,
        element: <AboutIndex />,
        layout: 'default',
        allowedRoles: [ROLES.USER, ROLES.ADMIN],
    },

    {
        path: ROUTES.MYTRIP,
        element: <MyTripIndex />,
        layout: 'default',
        allowedRoles: [ROLES.USER, ROLES.ADMIN],
    },
];

const publicRoutes: TypeRoutes[] = [
    {
        path: ROUTES.LOGIN,
        element: <Login />,
        layout: 'blank',
    },
    {
        path: ROUTES.REGISTER,
        element: <Register />,
        layout: 'blank',
    },
];

const routes: TypeRoutes[] = privateRoutes.concat(publicRoutes);

export { routes };
