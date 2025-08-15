import { ROUTES } from '@/constants/RouteConst';
import { ProfileService } from '@/services/ProfileService';
import { useQuery } from '@tanstack/react-query';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    children: JSX.Element;
    allowedRoles: string | string[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
    const { data } = useQuery({
        queryKey: [ProfileService.QUERY_KEY],
        queryFn: () => ProfileService.getprofile(),
    });

    if (!data) {
        return null;
    }

    if (!data.role) {
        return <Navigate to={ROUTES.LOGIN} replace />;
    }

    const allowedRolesArray = typeof allowedRoles === 'string' ? [allowedRoles] : allowedRoles;
    if (!allowedRolesArray.includes(data?.role!)) {
        return <Navigate to={ROUTES.HOME} replace />;
    }

    return children;
};

export default ProtectedRoute;
