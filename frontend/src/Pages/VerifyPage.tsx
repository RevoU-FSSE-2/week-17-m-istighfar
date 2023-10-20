const VerifyEmail: React.FC = () => {
    return (
        <div className='flex flex-col items-center justify-center h-screen bg-gray-50 dark:bg-gray-900'>
            <div className='w-full max-w-md p-8 bg-white rounded-lg shadow-md dark:bg-gray-800'>
                <h2 className='text-2xl font-bold mb-6 text-gray-900 dark:text-white'>
                    Verification Required
                </h2>
                <p className='text-gray-600 dark:text-gray-400'>
                    Thank you for registering! A verification link has been sent to your email.
                    Please check your inbox and follow the instructions to verify your account.
                </p>
            </div>
        </div>
    );
};

export default VerifyEmail;
