import { useNavigate } from 'react-router-dom';
import { RegistrationForm } from '../../Organism';
import { useState } from 'react';

interface RegistrationFormProps {
    username: string;
    email: string;
    password: string;
    role: string;
}

interface RegistrationData {
    username: string;
    email: string;
    password: string;
    role: string;
    verified: boolean;
    verificationToken: string;
    _id: string;
    __v: number;
}

interface RegistrationResponse {
    message: string;
    data: RegistrationData;
    error?: string;
}

const VITE_API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

const RegistrationTemplate: React.FC = () => {
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    // const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const onSubmit = async (data: RegistrationFormProps) => {
        try {
            const fetching = await fetch(`${VITE_API_ENDPOINT}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            const response: RegistrationResponse = await fetching.json();
            console.log(response);
            if (response.error) {
                if (response.error === 'User already exists') {
                    setError('Email or Username is already in use. Please use a different one.');
                } else {
                    setError('Registration failed. Please check your information.');
                }
            } else if (response.data) {
                console.log('Setting success message to:', response.message);

                console.log(response.data);
                // setSuccessMessage(response.message);
                navigate('/verify');
            }
        } catch (error) {
            setError('An error occurred during registration.');
        }
    };

    return (
        <>
            <section className='bg-gray-50 dark:bg-gray-900'>
                <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
                    <a
                        href='#'
                        className='flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white'
                    >
                        <img
                            className='w-8 h-8 mr-2'
                            src='https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg'
                            alt='logo'
                        />
                        Flowbite
                    </a>
                    <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
                        <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
                            <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
                                Create your account
                            </h1>

                            {error && (
                                <div className='bg-red-200 text-red-800 p-2 rounded-md'>
                                    {error}
                                </div>
                            )}
                            <RegistrationForm onSubmit={onSubmit} />
                        </div>
                    </div>
                </div>
            </section>
            {/* {successMessage && (
                <div className='bg-green-200 text-green-800 p-2 rounded-md'>{successMessage}</div>
            )} */}
        </>
    );
};

export default RegistrationTemplate;
