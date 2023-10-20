import LoginPage from './Pages/LoginPage';
import RegistrationPage from './Pages/RegistrationPage';
import HomePage from './Pages/HomePage';
import ErrorPage from './Pages/ErrorPage';
import DashboardAdminPage from './Pages/DashboardAdminPage';
import DashboardAuthorPage from './Pages/DashboardAuthorPage';
import DashboardStudentPage from './Pages/DashboardStudentPage';
import UserPage from './Pages/UserPage';
import VerifyEmail from './Pages/VerifyPage';
import EmailVerification from './Pages/EmailVerification';

import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { PublicLayout } from './Template';
import ThemeProvider from './context/ThemeProvider';

function App() {
    const userRole = localStorage.getItem('userRole');

    const router = createBrowserRouter([
        {
            path: '/',
            element: <HomePage />,
        },
        {
            element: <PublicLayout />,
            children: [
                {
                    path: '/dashboard',
                    element:
                        userRole === 'admin' ? <DashboardAdminPage /> : <Navigate to='/login' />,
                },
                {
                    path: '/dashboard2',
                    element:
                        userRole === 'author' ? <DashboardAuthorPage /> : <Navigate to='/login' />,
                },
                {
                    path: '/dashboard3',
                    element:
                        userRole === 'student' ? (
                            <DashboardStudentPage />
                        ) : (
                            <Navigate to='/login' />
                        ),
                },
            ],
        },
        {
            path: '/login',
            element: <LoginPage />,
        },
        {
            path: '/register',
            element: <RegistrationPage />,
        },
        {
            path: '/verify',
            element: <VerifyEmail />,
        },
        {
            path: '/verify-email/:token',
            element: <EmailVerification />,
        },

        {
            path: '*',
            element: <ErrorPage />,
        },
        {
            path: '/userpage',
            element: <UserPage />,
        },
    ]);

    return (
        <ThemeProvider>
            <RouterProvider router={router} />
        </ThemeProvider>
    );
}

export default App;
