import React from 'react';
import { PaginationProps } from '../../types';

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className='flex justify-center items-center space-x-2 mt-8'>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className='px-4 py-2 bg-gray-800 text-yellow-300 rounded disabled:opacity-50'
      >
        Previous
      </button>
      <span className='text-yellow-300'>
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className='px-4 py-2 bg-gray-800 text-yellow-300 rounded disabled:opacity-50'
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
