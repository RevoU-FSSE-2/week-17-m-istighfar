import ResetPasswordForm from '../Organism/ResetPasswordForm';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

const VITE_API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

const ResetPasswordPage: React.FC = () => {
    const [message, setMessage] = useState<string | null>(null);
    const { resetToken } = useParams<{ resetToken: string }>();

    const handleResetPassword = async (newPassword: string) => {
        try {
            const response = await fetch(`${VITE_API_ENDPOINT}/auth/reset-password/${resetToken}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ newPassword }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message);
            } else {
                setMessage(data.error);
            }
        } catch (error) {
            setMessage('An error occurred. Please try again.');
        }
    };
    return (
        <section className='bg-gray-50 dark:bg-gray-900'>
            <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
                <h1 className='mb-6 text-2xl font-semibold text-gray-900 dark:text-white'>
                    Reset Password
                </h1>
                <div className='w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
                    <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
                        <ResetPasswordForm onSubmit={handleResetPassword} />
                        {message && (
                            <div className='bg-red-200 text-red-800 p-2 rounded-md'>{message}</div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ResetPasswordPage;
