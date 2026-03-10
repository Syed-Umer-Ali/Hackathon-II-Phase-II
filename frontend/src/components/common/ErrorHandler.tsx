// frontend/src/components/common/ErrorHandler.tsx
import React from 'react';

interface ErrorHandlerProps {
  error: Error | null;
}

const ErrorHandler: React.FC<ErrorHandlerProps> = ({ error }) => {
  if (!error) {
    return null;
  }

  // Basic error categorization
  let errorMessage = 'An unexpected error occurred. Please try again later.';
  if (error.message.includes('Network')) {
    errorMessage = 'A network error occurred. Please check your connection.';
  } else if (error.message.includes('Invalid input')) {
    errorMessage = `Invalid input: ${error.message.replace('Invalid input for ', '')}`;
  } else if (error.message.includes('401') || error.message.includes('403')) {
    errorMessage = 'You are not authorized to perform this action.';
  } else if (error.message.includes('404')) {
    errorMessage = 'The requested resource was not found.';
  }

  return (
    <div
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
      role="alert"
    >
      <strong className="font-bold">Error: </strong>
      <span className="block sm:inline">{errorMessage}</span>
    </div>
  );
};

export default ErrorHandler;