import { Label, Checkbox, Button } from '../../Atoms';
import { FormField } from '../../Moleluces';
import { useFormik } from 'formik';
import { initialValues, validationSchema } from './loginFormSchema';
import { Link } from 'react-router-dom';

interface LoginFormProps {
    username: string;
    password: string;
}

interface Props {
    onSubmit: (values: LoginFormProps) => void;
}

// const BASE_URL = process.env.BASE_URL;

const LoginForm = ({ onSubmit }: Props) => {
    const handleSubmit = (values: LoginFormProps) => {
        onSubmit(values);
    };

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: handleSubmit,
        validationSchema: validationSchema,
    });

    return (
        <form className='space-y-4 md:space-y-6' onSubmit={formik.handleSubmit}>
            <div>
                <FormField
                    type='text'
                    name='username'
                    id='username'
                    placeholder='Username'
                    label='Your Username'
                    value={formik.values.username}
                    onChange={formik.handleChange('username')}
                    status={formik.errors.username && 'error'}
                />
                {formik.errors.username && <p>{formik.errors.username}</p>}
            </div>
            <div>
                <FormField
                    type='password'
                    name='password'
                    id='password'
                    placeholder='••••••••'
                    label='Password'
                    value={formik.values.password}
                    onChange={formik.handleChange('password')}
                    status={formik.errors.password && 'error'}
                />
                {formik.errors.password && <p>{formik.errors.password}</p>}
            </div>
            <div className='flex items-center justify-between'>
                <div className='flex items-start'>
                    <div className='flex items-center h-5'>
                        <Checkbox
                            id='remember'
                            required
                            className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800'
                        />
                    </div>
                    <div className='ml-3 text-sm'>
                        <Label htmlFor='remember' className='text-gray-500 dark:text-gray-300'>
                            Remember me
                        </Label>
                    </div>
                </div>
                <Link
                    to='/request-password-reset'
                    className={`text-sm font-medium text-primary-600 hover:underline`}
                >
                    Forgot password?
                </Link>
            </div>
            <Button
                type={'submit'}
                className={`w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
            >
                Sign in
            </Button>
            <Button
                type='button'
                className={`w-full mt-3 text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
                // onClick={() => (window.location.href = `${BASE_URL}/auth/google`)}
            >
                Sign in with Google
            </Button>
            <p className={`text-sm font-light text-gray-500`}>
                Don’t have an account yet?{' '}
                <Link to='/register' className={`font-medium text-primary-600 hover:underline`}>
                    Register
                </Link>
            </p>
        </form>
    );
};

export default LoginForm;
