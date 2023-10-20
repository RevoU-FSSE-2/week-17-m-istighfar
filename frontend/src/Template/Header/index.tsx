import { Menu } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { useState } from 'react';

export default function Header() {
    const userLogin = localStorage.getItem('id');
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        ['userRole', 'accessToken', 'refreshToken'].forEach((item) =>
            localStorage.removeItem(item),
        );
        navigate('/login');
    };

    return (
        <div className='bg-white h-16 px-2 md:px-6 flex justify-between items-center border-b border-gray-200 '>
            <div className='flex items-center mx-5'>
                <span className='font-bold text-xl cursor-pointer mr-4'>BrandName</span>
                {userLogin && <span className='text-gray-800 md:hidden'>Hi! {userLogin}</span>}
            </div>

            {/* Mobile Menu Button */}
            <button
                className='md:hidden p-2 rounded-md'
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
                ☰
            </button>

            {/* Desktop Menu */}
            <div className='hidden md:flex items-center gap-4 mr-2'>
                {/* Notification Bell (If you have notifications) */}
                <div className='relative'>
                    <button className='focus:outline-none'>🛎️</button>
                    {/* This is a notification count (you would replace 3 with the actual count) */}
                    <span className='absolute top-0 right-0 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center'>
                        3
                    </span>
                </div>

                <Menu as='div' className='relative'>
                    <div>
                        <Menu.Button className='ml-2 bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-neutral-400'>
                            <span className='sr-only'>Open user menu</span>
                            <div
                                className='h-10 w-10 rounded-full bg-sky-500 bg-cover bg-no-repeat bg-center'
                                style={{
                                    backgroundImage:
                                        'url("https://source.unsplash.com/80x80?face")',
                                }}
                            />
                        </Menu.Button>
                    </div>

                    <Menu.Items className='origin-top-right z-10 absolute right-0 mt-2 w-48 rounded-sm shadow-md p-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
                        <Menu.Item>
                            {({ active }) => (
                                <div
                                    onClick={() => navigate('/profile')}
                                    className={classNames(
                                        active && 'bg-gray-100',
                                        'active:bg-gray-200 rounded-sm px-4 py-2 text-gray-700 cursor-pointer focus:bg-gray-200',
                                    )}
                                >
                                    Your Profile
                                </div>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <div
                                    onClick={() => navigate('/settings')}
                                    className={classNames(
                                        active && 'bg-gray-100',
                                        'active:bg-gray-200 rounded-sm px-4 py-2 text-gray-700 cursor-pointer focus:bg-gray-200',
                                    )}
                                >
                                    Settings
                                </div>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <div
                                    className={classNames(
                                        active && 'bg-gray-100',
                                        'active:bg-gray-200 rounded-sm px-4 py-2 text-gray-700 cursor-pointer focus:bg-gray-200',
                                    )}
                                    onClick={handleLogout}
                                >
                                    Sign out
                                </div>
                            )}
                        </Menu.Item>
                    </Menu.Items>
                </Menu>
            </div>

            {isMobileMenuOpen && (
                <div className='absolute top-16 left-0 w-full h-screen bg-white z-50 flex flex-col p-4'>
                    <span className='text-gray-800 mb-4'>Hi! {userLogin}</span>
                    {/* Profile, Settings, and Sign out options similar to the desktop version */}
                    <button onClick={() => navigate('/profile')} className='py-2'>
                        Your Profile
                    </button>
                    <button onClick={() => navigate('/settings')} className='py-2'>
                        Settings
                    </button>
                    <button onClick={handleLogout} className='py-2'>
                        Sign out
                    </button>
                </div>
            )}
        </div>
    );
}
