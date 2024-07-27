// Pagination.js
import React from 'react';
import { Button, ButtonGroup, Stack } from '@chakra-ui/react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <Stack spacing={4} direction="row" align="center" justify="center">
      <Button
        onClick={() => handlePageChange(currentPage - 1)}
        isDisabled={currentPage === 1}
      >
        Previous
      </Button>

      <ButtonGroup variant="outline" spacing="4">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <Button
            key={page}
            onClick={() => handlePageChange(page)}
            isActive={page === currentPage}
          >
            {page}
          </Button>
        ))}
      </ButtonGroup>

      <Button
        onClick={() => handlePageChange(currentPage + 1)}
        isDisabled={currentPage === totalPages}
      >
        Next
      </Button>
    </Stack>
  );
};

export default Pagination;
