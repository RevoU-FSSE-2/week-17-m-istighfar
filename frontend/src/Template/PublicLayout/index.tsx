import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { Sidebar, Header } from '..';
import { useMemo } from 'react';

type UserRole = 'admin' | 'author' | 'student';

export default function PublicLayout() {
    const userRole = localStorage.getItem('userRole') as UserRole | null;

    const token = localStorage.getItem('accessToken');
    const location = useLocation();
    const allowedRoutes = {
        admin: ['/dashboard'],
        author: ['/dashboard2'],
        student: ['/dashboard3'],
    };

    const isAuth = useMemo(() => {
        if (location.pathname) {
            return !!token;
        }
    }, [location.pathname, token]);

    if (userRole && !allowedRoutes[userRole].includes(location.pathname) && isAuth) {
        return <Navigate to='/403' />;
    }

    if (isAuth) {
        return (
            <div className='bg-neutral-100 h-screen w-screen overflow-hidden flex flex-row'>
                <Sidebar />
                <div className='flex flex-col flex-1'>
                    <Header />
                    <div className='flex-1 p-4 min-h-0 overflow-auto'>
                        <Outlet />
                    </div>
                </div>
            </div>
        );
    }

    return <Navigate to='/login' />;
}
