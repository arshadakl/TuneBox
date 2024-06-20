export const handleError = (error) => {
    if (error.response) {
      
        // console.log('Response error data:', error.response.data);
        // console.log('Response error status:', error.response.status);
        // console.log('Response error headers:', error.response.headers);

        const errorMessage = error.response.data.message || 'An unknown error occurred';
        return errorMessage;

    } else if (error.request) {
        // console.log('Request error data:', error.request);
        return 'No response received from the server. Please try again later.';
    } else {
        // console.log('Error message:', error.message);
        return 'Error: ' + error.message;
    }
};
