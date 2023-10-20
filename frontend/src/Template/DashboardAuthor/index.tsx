import { useState, useEffect } from 'react';

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

interface AuthorDashboardData {
    authorId: string;
    totalOwnedCourses: number;
    totalEnrollments: number;
    ownedCourses: Course[];
    latestEnrollments: Enrollment[];
}

const authToken = localStorage.getItem('accessToken');
const VITE_API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

function DashboardAuthor() {
    const [dashboardData, setDashboardData] = useState<AuthorDashboardData | null>(null);

    useEffect(() => {
        fetch(`${VITE_API_ENDPOINT}/author/dashboard`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authToken}`,
            },
        })
            .then((response) => response.json())
            .then((data) => setDashboardData(data))
            .catch((error) => console.error(error.message));
    }, []);

    if (!dashboardData) return <div>Loading...</div>;

    return (
        <div className='p-4 sm:p-6 md:p-8 max-w-screen-xl mx-auto bg-gray-100'>
            <h2 className='text-2xl sm:text-3xl font-bold mb-4'>Author Dashboard</h2>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6'>
                <div className='bg-green-200 p-4 sm:p-6 rounded-lg shadow-md'>
                    <h3 className='text-xl sm:text-2xl font-semibold mb-2'>Total Courses</h3>
                    <p className='text-lg'>{dashboardData.totalOwnedCourses}</p>
                </div>
                <div className='bg-yellow-200 p-4 sm:p-6 rounded-lg shadow-md'>
                    <h3 className='text-xl sm:text-2xl font-semibold mb-2'>Total Enrollments</h3>
                    <p className='text-lg'>{dashboardData.totalEnrollments}</p>
                </div>
            </div>

            <div className='mb-6 overflow-x-auto'>
                <h3 className='text-xl sm:text-2xl font-semibold mb-3'>Your Courses</h3>
                <table className='min-w-full divide-y divide-gray-300 shadow-lg rounded-lg overflow-hidden'>
                    <thead className='bg-gray-50'>
                        <tr>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>
                                Thumbnail
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>
                                Title
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>
                                Rating
                            </th>
                        </tr>
                    </thead>
                    <tbody className='bg-white divide-y divide-gray-200'>
                        {dashboardData.ownedCourses.map((course) => (
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
                <h3 className='text-xl sm:text-2xl font-semibold mb-3'>
                    Latest Enrollments in your courses
                </h3>
                <table className='min-w-full divide-y divide-gray-300 shadow-lg rounded-lg overflow-hidden'>
                    <thead className='bg-gray-50'>
                        <tr>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>
                                Course
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>
                                Student
                            </th>
                        </tr>
                    </thead>
                    <tbody className='bg-white divide-y divide-gray-200'>
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

export default DashboardAuthor;
