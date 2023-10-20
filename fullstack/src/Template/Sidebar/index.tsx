import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { FcBullish } from 'react-icons/fc';
import { DASHBOARD_SIDEBAR_LINKS, DASHBOARD_SIDEBAR_BOTTOM_LINKS } from '../Sidebar/SidebarLink';
import React from 'react';

interface SidebarLinkProps {
    link: {
        key: string;
        path: string;
        icon: React.ReactNode;
        label: string;
    };
}

const linkClass =
    'flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base';

export default function Sidebar() {
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
    return (
        <div>
            {/* Mobile view */}
            <div className='flex md:hidden items-center justify-between'>
                <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>🍔</button>
            </div>

            {isSidebarOpen && (
                <div
                    className='fixed inset-0 z-10 bg-black opacity-40'
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            {/* Sidebar content */}
            <div
                className={`bg-slate-900 w-60 p-3 flex flex-col transform md:transform-none transition-transform duration-300 ${
                    !isSidebarOpen ? '-translate-x-full md:translate-x-0' : 'translate-x-0'
                } fixed md:static z-20 h-full`}
            >
                <div className='flex items-center gap-2 px-1 py-3'>
                    <FcBullish fontSize={24} />
                    <span className='text-neutral-200 text-lg'>Y</span>
                </div>
                <div className='py-8 flex flex-1 flex-col gap-0.5'>
                    {DASHBOARD_SIDEBAR_LINKS.map((link) => (
                        <SidebarLink key={link.key} link={link} />
                    ))}
                </div>
                <div className='flex flex-col gap-0.5 pt-2 border-t border-neutral-700'>
                    {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((link) => (
                        <SidebarLink key={link.key} link={link} />
                    ))}
                </div>
            </div>
        </div>
    );
}

function SidebarLink({ link }: SidebarLinkProps) {
    const { pathname } = useLocation();

    return (
        <Link
            to={link.path}
            className={classNames(
                pathname === link.path ? 'bg-neutral-700 text-white' : 'text-neutral-400',
                linkClass,
            )}
        >
            <span className='text-xl'>{link.icon}</span>
            {link.label}
        </Link>
    );
}
