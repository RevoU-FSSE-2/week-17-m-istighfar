import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import React from 'react';

interface Category {
    id: number;
    name: string;
    is_active: boolean;
}

interface CategoryTableProps {
    data: Category[];
    loading: boolean;
    handleEdit: (record: Category) => void;
    handleDelete: (id: number) => void;
}

const CategoryCards: React.FC<CategoryTableProps> = ({
    data,
    loading,
    handleEdit,
    handleDelete,
}) => {
    return (
        <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${
                loading ? 'opacity-50' : ''
            }`}
        >
            {data.map((record) => (
                <div key={record.id} className='border rounded-lg p-4 shadow-sm bg-white'>
                    <h2 className='text-xl font-semibold mb-2'>{record.name}</h2>
                    <p>
                        <strong>ID:</strong> {record.id}
                    </p>
                    <p>
                        <strong>Status:</strong> {record.is_active ? 'Active' : 'Deactive'}
                    </p>
                    <div className='mt-4 flex justify-end'>
                        <button
                            aria-label={`Edit ${record.name}`}
                            onClick={() => handleEdit(record)}
                            className='text-blue-600 hover:text-blue-900 mr-4'
                        >
                            <PencilIcon className='h-5 w-5' />
                        </button>
                        <button
                            onClick={() => handleDelete(record.id)}
                            className='text-red-600 hover:text-red-900'
                            aria-label={`Delete ${record.name}`}
                        >
                            <TrashIcon className='h-5 w-5' />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CategoryCards;
