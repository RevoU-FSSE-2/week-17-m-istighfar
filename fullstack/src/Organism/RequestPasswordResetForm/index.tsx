import { useState } from 'react';

interface RequestPasswordResetProps {
    onSubmit: (email: string) => void;
}

const RequestPasswordResetForm: React.FC<RequestPasswordResetProps> = ({ onSubmit }) => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(email);
    };

    return (
        <form className='space-y-4 md:space-y-6' onSubmit={handleSubmit}>
            <div>
                <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
                    Your Email
                </label>
                <input
                    id='email'
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='name@company.com'
                    required
                    className='mt-1 w-full p-2 border rounded-md focus:outline-none focus:ring-2'
                />
            </div>
            <button
                type='submit'
                className='w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
            >
                Request Password Reset
            </button>
        </form>
    );
};

export default RequestPasswordResetForm;
