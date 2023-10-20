import React, { useState, useEffect } from 'react';

type User = {
    _id: string;
    username: string;
    email: string;
    password?: string;
    role: string;
};

const VITE_API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

const UserPage: React.FC = () => {
    const [users, setUsers] = useState<User[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [role, setRole] = useState<string>('');

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`${VITE_API_ENDPOINT}/admin/listusers`);
                const data: User[] = await response.json();
                if (Array.isArray(data)) {
                    setUsers(data);
                } else {
                    setError('Received data is not a valid user list.');
                }
            } catch (error) {
                console.error('Error fetching users:', error);
                setError('Failed to fetch users.');
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await fetch(`${VITE_API_ENDPOINT}/admin/createUser`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password, role }),
            });
            const newUser: User = await response.json();
            if (users) {
                setUsers([...users, newUser]);
            }
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className='p-4'>
            <h1 className='text-xl mb-4'>Create User</h1>
            <form onSubmit={handleSubmit} className='mb-4'>
                <input
                    type='text'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className='p-2 border mb-2 w-full'
                />
                <input
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='p-2 border mb-2 w-full'
                />
                <input
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='p-2 border mb-2 w-full'
                />
                <input
                    type='text'
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className='p-2 border mb-2 w-full'
                />
                <button type='submit' className='p-2 bg-blue-500 text-white'>
                    Create
                </button>
            </form>
            <div>
                <h1 className='text-xl mb-4'>Users List</h1>
                <ul>
                    {users &&
                        users.map((user) => (
                            <li key={user._id} className='mb-2'>
                                {user.username} ({user.email}) Role: {user.role}
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    );
};

export default UserPage;
