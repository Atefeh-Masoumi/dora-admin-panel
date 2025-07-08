import { toast } from "react-toastify";

interface ApiErrorResponse {
  type?: string;
  title?: string;
  status?: number;
  errors?: Record<string, string[]>;
  errorMessage?: string;
}

/**
 * Extracts and displays all validation error messages from API error response
 * @param error - The error object from API response
 * @param defaultMessage - Default message to show if no specific errors found
 */
export const handleApiError = (error: ApiErrorResponse, defaultMessage: string = "خطایی پیش آمده است") => {
  // If there are validation errors in the errors object
  if (error.errors && typeof error.errors === 'object') {
    const errorMessages: string[] = [];
    
    // Extract all error messages from the errors object
    Object.values(error.errors).forEach((errorArray) => {
      if (Array.isArray(errorArray)) {
        errorMessages.push(...errorArray);
      }
    });
    
    // Show all error messages
    if (errorMessages.length > 0) {
      errorMessages.forEach(message => {
        toast.error(message);
      });
      return;
    }
  }
  
  // If there's a direct error message
  if (error.errorMessage) {
    toast.error(error.errorMessage);
    return;
  }
  
  // If there's a title
  if (error.title) {
    toast.error(error.title);
    return;
  }
  
  // Fallback to default message
  toast.error(defaultMessage);
};

/**
 * Extracts all validation error messages as an array
 * @param error - The error object from API response
 * @returns Array of error messages
 */
export const extractErrorMessages = (error: ApiErrorResponse): string[] => {
  const errorMessages: string[] = [];
  
  if (error.errors && typeof error.errors === 'object') {
    Object.values(error.errors).forEach((errorArray) => {
      if (Array.isArray(errorArray)) {
        errorMessages.push(...errorArray);
      }
    });
  }
  
  if (error.errorMessage) {
    errorMessages.push(error.errorMessage);
  }
  
  if (error.title) {
    errorMessages.push(error.title);
  }
  
  return errorMessages;
};

/**
 * Shows a single error message (first one found)
 * @param error - The error object from API response
 * @param defaultMessage - Default message to show if no specific errors found
 */
export const showFirstError = (error: ApiErrorResponse, defaultMessage: string = "خطایی پیش آمده است") => {
  const messages = extractErrorMessages(error);
  
  if (messages.length > 0) {
    toast.error(messages[0]);
  } else {
    toast.error(defaultMessage);
  }
}; 