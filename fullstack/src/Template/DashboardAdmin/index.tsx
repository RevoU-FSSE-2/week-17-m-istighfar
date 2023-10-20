import { useState, useEffect } from 'react';

const VITE_API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

interface User {
    _id: string;
    username: string;
    email: string;
    role: string;
}

interface Course {
    _id: string;
    title: string;
    description: string;
    thumbnail: string;
    authorId: string;
    creationDate: Date;
    ratingAverage: number;
}

interface Enrollment {
    _id: string;
    courseId: Course;
    studentId: User;
}

interface DashboardData {
    totalUsers: number;
    totalCourses: number;
    totalEnrollments: number;
    latestUsers: User[];
    latestCourses: Course[];
    latestEnrollments: Enrollment[];
}

const authToken = localStorage.getItem('accessToken');

function DashboardAdmin() {
    const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);

    useEffect(() => {
        fetch(`${VITE_API_ENDPOINT}/admin/dashboard`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authToken}`,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => setDashboardData(data))
            .catch((error) => {
                if (error.message.includes('401')) {
                    console.error('Unauthorized. Please check your authentication credentials.');
                } else {
                    console.error('There was a problem with the fetch operation:', error.message);
                }
            });
    }, []);

    if (!dashboardData) return <div>Loading...</div>;

    return (
        <div className='p-4 sm:p-6 md:p-8 max-w-screen-xl mx-auto bg-gray-100'>
            <h2 className='text-2xl sm:text-3xl font-bold mb-4'>Admin Dashboard</h2>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6'>
                <div className='bg-blue-200 p-4 sm:p-6 rounded-lg shadow-md'>
                    <h3 className='text-xl sm:text-2xl font-semibold mb-2'>Total Users</h3>
                    <p className='text-lg'>{dashboardData.totalUsers}</p>
                </div>
                <div className='bg-green-200 p-4 sm:p-6 rounded-lg shadow-md'>
                    <h3 className='text-xl sm:text-2xl font-semibold mb-2'>Total Courses</h3>
                    <p className='text-lg'>{dashboardData.totalCourses}</p>
                </div>
                <div className='bg-yellow-200 p-4 sm:p-6 rounded-lg shadow-md'>
                    <h3 className='text-xl sm:text-2xl font-semibold mb-2'>Total Enrollments</h3>
                    <p className='text-lg'>{dashboardData.totalEnrollments}</p>
                </div>
            </div>

            <div className='mb-6 overflow-x-auto'>
                <h3 className='text-xl sm:text-2xl font-semibold mb-3'>Latest Users</h3>
                <table className='min-w-full divide-y divide-gray-300 shadow-lg rounded-lg overflow-hidden'>
                    <thead className='bg-gray-50'>
                        <tr>
                            <th
                                scope='col'
                                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                            >
                                Username
                            </th>
                            <th
                                scope='col'
                                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                            >
                                Email
                            </th>
                            <th
                                scope='col'
                                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                            >
                                Role
                            </th>
                        </tr>
                    </thead>
                    <tbody className='bg-white divide-y divide-gray-200'>
                        {dashboardData.latestUsers.map((user) => (
                            <tr key={user._id}>
                                <td className='px-6 py-4 whitespace-nowrap'>{user.username}</td>
                                <td className='px-6 py-4 whitespace-nowrap'>{user.email}</td>
                                <td className='px-6 py-4 whitespace-nowrap'>{user.role}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className='mb-6 overflow-x-auto'>
                <h3 className='text-xl sm:text-2xl font-semibold mb-3'>Latest Users</h3>
                <table className='min-w-full divide-y divide-gray-300 shadow-lg rounded-lg overflow-hidden'>
                    <thead className='bg-gray-50'>
                        <tr>
                            <th
                                scope='col'
                                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                            >
                                Thumbnail
                            </th>
                            <th
                                scope='col'
                                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                            >
                                Title
                            </th>
                            <th
                                scope='col'
                                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                            >
                                Rating
                            </th>
                        </tr>
                    </thead>
                    <tbody className='bg-white divide-y divide-gray-200'>
                        {dashboardData.latestCourses.map((course) => (
                            <tr key={course._id}>
                                <td className='px-6 py-4 whitespace-nowrap'>
                                    <img
                                        src={course.thumbnail}
                                        alt={course.title}
                                        className='w-24 h-24 rounded'
                                    />
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap'>{course.title}</td>
                                <td className='px-6 py-4 whitespace-nowrap'>
                                    {course.ratingAverage}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className='overflow-x-auto'>
                <h3 className='text-xl sm:text-2xl font-semibold mb-3'>Latest Enrollments</h3>
                <table className='min-w-full divide-y divide-gray-300 shadow-lg rounded-lg overflow-hidden'>
                    <thead className='bg-gray-50'>
                        <tr>
                            <th
                                scope='col'
                                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                            >
                                Course
                            </th>
                            <th
                                scope='col'
                                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                            >
                                Student
                            </th>
                        </tr>
                    </thead>
                    <tbody className='bg-white divide-y divide-gray-300'>
                        {dashboardData.latestEnrollments.map((enrollment) => (
                            <tr key={enrollment._id}>
                                <td className='px-6 py-4 whitespace-nowrap'>
                                    {enrollment.courseId.title}
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap'>
                                    {enrollment.studentId.username}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default DashboardAdmin;
