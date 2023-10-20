import { useState } from 'react';

interface ResetPasswordProps {
    onSubmit: (newPassword: string) => void;
}

const ResetPasswordForm: React.FC<ResetPasswordProps> = ({ onSubmit }) => {
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(password);
    };

    return (
        <form onSubmit={handleSubmit} className='space-y-4 md:space-y-6'>
            <div>
                <input
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Enter your new password'
                    required
                    className='w-full p-2 border rounded-md focus:outline-none focus:ring-2'
                />
            </div>
            <div>
                <button
                    type='submit'
                    className='w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
                >
                    Reset Password
                </button>
            </div>
        </form>
    );
};

export default ResetPasswordForm;
