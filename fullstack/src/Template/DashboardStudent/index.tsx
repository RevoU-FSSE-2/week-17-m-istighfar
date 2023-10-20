import { useState, useEffect } from 'react';

interface Course {
    _id: string;
    title: string;
    thumbnail: string;
    description: string;
    authorId: string;
    creationDate: Date;
    ratingAverage: number;
}

interface Progress {
    _id: string;
    courseId: Course;
    studentId: string;
    completion: number;
    updatedAt?: Date;
}

interface StudentDashboardData {
    studentId: string;
    totalEnrolledCourses: number;
    enrolledCourses: {
        courseId: Course;
    }[]; // Nested object based on the backend structure provided
    latestProgress: Progress[];
}

// Create a helper function to retrieve authToken

// Use the helper function to get the token
const authToken = localStorage.getItem('accessToken');
const VITE_API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

function DashboardStudent() {
    const [dashboardData, setDashboardData] = useState<StudentDashboardData | null>(null);

    useEffect(() => {
        // Fetch the student dashboard data when the component mounts
        fetch(`${VITE_API_ENDPOINT}/student/dashboard`, {
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
            <h2 className='text-2xl sm:text-3xl font-bold mb-4'>Student Dashboard</h2>

            {/* Display Total Enrolled Courses */}
            <div className='bg-blue-200 p-4 sm:p-6 rounded-lg shadow-md mb-6'>
                <h3 className='text-xl sm:text-2xl font-semibold mb-2'>Enrolled Courses</h3>
                <p className='text-lg'>{dashboardData.totalEnrolledCourses}</p>
            </div>

            {/* Enrolled Courses */}
            <div className='mb-6 overflow-x-auto'>
                <h3 className='text-xl sm:text-2xl font-semibold mb-3'>Your Courses</h3>
                <table className='min-w-full divide-y divide-gray-300 shadow-lg rounded-lg overflow-hidden'>
                    {/* Table headers */}
                    <thead className='bg-gray-50'>
                        <tr>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                Thumbnail
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                Title
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                Rating
                            </th>
                        </tr>
                    </thead>
                    {/* Table body */}
                    <tbody className='bg-white divide-y divide-gray-200'>
                        {dashboardData.enrolledCourses.map(({ courseId }) => (
                            <tr key={courseId._id}>
                                <td className='px-6 py-4 whitespace-nowrap'>
                                    <img
                                        src={courseId.thumbnail}
                                        alt={courseId.title}
                                        className='w-24 h-24 rounded'
                                    />
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap'>{courseId.title}</td>
                                <td className='px-6 py-4 whitespace-nowrap'>
                                    {courseId.ratingAverage}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Latest Progress */}
            <div className='mb-6 overflow-x-auto'>
                <h3 className='text-xl sm:text-2xl font-semibold mb-3'>Latest Progress</h3>
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
                                Course Title
                            </th>
                            <th
                                scope='col'
                                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                            >
                                Completion
                            </th>
                        </tr>
                    </thead>
                    <tbody className='bg-white divide-y divide-gray-200'>
                        {dashboardData?.latestProgress.map((progress) => (
                            <tr key={progress._id}>
                                <td className='px-6 py-4 whitespace-nowrap'>
                                    <img
                                        src={progress.courseId.thumbnail}
                                        alt={progress.courseId.title}
                                        className='w-24 h-24 rounded'
                                    />
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap'>
                                    {progress.courseId.title}
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap'>
                                    {progress.completion}%
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default DashboardStudent;
