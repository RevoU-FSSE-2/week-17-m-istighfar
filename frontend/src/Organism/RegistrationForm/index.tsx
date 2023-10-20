import { FormField } from '../../Moleluces';
import { Button } from '../../Atoms';
import { useFormik } from 'formik';
import { initialValues, validationSchema } from './registerFormSchema';
import { Link } from 'react-router-dom';

interface RegistrationFormProps {
    username: string;
    email: string;
    password: string;
    role: string;
}

interface Props {
    onSubmit: (values: RegistrationFormProps) => void;
}

const RegistrationForm = ({ onSubmit }: Props) => {
    const handleSubmit = (values: RegistrationFormProps) => {
        onSubmit(values);
    };

    const formMik = useFormik({
        initialValues: initialValues,
        onSubmit: handleSubmit,
        validationSchema: validationSchema,
    });

    return (
        <form className='space-y-4 md:space-y-6' onSubmit={formMik.handleSubmit}>
            <div>
                <FormField
                    type='text'
                    name='username'
                    id='username'
                    placeholder='Your username'
                    label='Username'
                    value={formMik.values.username}
                    onChange={formMik.handleChange('username')}
                    status={formMik.errors.username && 'error'}
                />
                {formMik.errors.username && <p>{formMik.errors.username}</p>}
            </div>
            <div>
                <FormField
                    type='email'
                    name='email'
                    id='email'
                    placeholder='name@company.com'
                    label='Your email'
                    value={formMik.values.email}
                    onChange={formMik.handleChange('email')}
                    status={formMik.errors.email && 'error'}
                />
                {formMik.errors.email && <p>{formMik.errors.email}</p>}
            </div>
            <div>
                <FormField
                    type='password'
                    name='password'
                    id='password'
                    placeholder='••••••••'
                    label='Password'
                    value={formMik.values.password}
                    onChange={formMik.handleChange('password')}
                    status={formMik.errors.password && 'error'}
                />
                {formMik.errors.password && <p>{formMik.errors.password}</p>}
            </div>
            <div className='relative'>
                <label htmlFor='role' className='block text-sm font-medium text-gray-700'>
                    Role
                </label>
                <select
                    id='role'
                    name='role'
                    value={formMik.values.role}
                    onChange={formMik.handleChange('role')}
                    className='mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md'
                >
                    <option value='author'>Author</option>
                    <option value='admin'>Admin</option>
                    <option value='student'>Student</option>
                </select>
                {formMik.errors.role && (
                    <p className='text-red-500 text-xs mt-2'>{formMik.errors.role}</p>
                )}
            </div>

            <Button
                type={'submit'}
                className='w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
            >
                Register
            </Button>
            <p className='text-sm font-light'>
                Already have an account?{' '}
                <Link to='/login' className='font-medium text-primary-600 hover:underline'>
                    Sign In
                </Link>
            </p>
        </form>
    );
};

export default RegistrationForm;
