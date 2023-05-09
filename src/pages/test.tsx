import { useState } from 'react';
import { Pagination } from '@chakra-ui/react';

function MyPagination() {
    const [currentPage, setCurrentPage] = useState(1);

    // Function to handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        // Do something else, like fetching data for a new page
    };

    return (
        <Pagination
            size="md"
            currentPage={currentPage}
            onPageChange={handlePageChange}
            total={50} // Total number of pages
        />
    );
}
