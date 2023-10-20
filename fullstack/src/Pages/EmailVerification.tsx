import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const VITE_API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

const EmailVerification: React.FC = () => {
    const { token } = useParams();
    console.log('API Endpoint:', VITE_API_ENDPOINT);
    console.log('Token extracted from URL:', token);

    const [verificationStatus, setVerificationStatus] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const verifyEmailToken = async () => {
            try {
                console.log(`Making request to: ${VITE_API_ENDPOINT}/auth/verify-email/${token}`);
                const response = await fetch(`${VITE_API_ENDPOINT}/auth/verify-email/${token}`);
                if (!response.ok) {
                    throw new Error('Network response was not okay');
                }
                const data = await response.json();
                console.log('Server response:', data);

                if (data.error) {
                    setVerificationStatus(data.error);
                    console.log('Error:', data.error);
                } else {
                    setVerificationStatus(data.message);
                    console.log('Success:', data.message);

                    setTimeout(() => {
                        navigate('/login');
                    }, 5000);
                }
            } catch (error) {
                setVerificationStatus('An error occurred during verification.');
            }
        };
        verifyEmailToken();
    }, [token]);

    return (
        <div className='flex flex-col items-center justify-center h-screen bg-gray-50 dark:bg-gray-900'>
            <div className='w-full max-w-md p-8 bg-white rounded-lg shadow-md dark:bg-gray-800'>
                <h2 className='text-2xl font-bold mb-6 text-gray-900 dark:text-white'>
                    Email Verification
                </h2>
                <p className='text-gray-600 dark:text-gray-400'>{verificationStatus}</p>
            </div>
        </div>
    );
};

export default EmailVerification;
