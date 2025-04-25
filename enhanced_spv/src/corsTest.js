// Simple utility to test CORS settings
import config from './config';

/**
 * Test the CORS settings with the backend
 * @returns {Promise<Object>} The test results
 */
export const testCORS = async () => {
  try {
    console.log('Testing CORS with backend at:', config.API_BASE_URL);
    
    // First try a fetch to the cors-test endpoint
    const response1 = await fetch(`${config.API_BASE_URL}/cors-test`);
    const corsTestResult = await response1.json();
    console.log('CORS test result:', corsTestResult);
    
    // Then try a simple OPTIONS request
    const optionsResponse = await fetch(`${config.API_BASE_URL}/lightclient/completedTransactions`, {
      method: 'OPTIONS',
      headers: {
        'Origin': window.location.origin,
        'Access-Control-Request-Method': 'POST',
        'Access-Control-Request-Headers': 'Content-Type'
      }
    });
    
    console.log('OPTIONS response status:', optionsResponse.status);
    console.log('OPTIONS response headers:', {
      'access-control-allow-origin': optionsResponse.headers.get('access-control-allow-origin'),
      'access-control-allow-methods': optionsResponse.headers.get('access-control-allow-methods'),
      'access-control-allow-headers': optionsResponse.headers.get('access-control-allow-headers')
    });
    
    return {
      corsTestResult,
      optionsStatus: optionsResponse.status,
      optionsHeaders: {
        'access-control-allow-origin': optionsResponse.headers.get('access-control-allow-origin'),
        'access-control-allow-methods': optionsResponse.headers.get('access-control-allow-methods'),
        'access-control-allow-headers': optionsResponse.headers.get('access-control-allow-headers')
      }
    };
    
  } catch (error) {
    console.error('CORS test failed:', error);
    return { error: error.message };
  }
};

// Export a simple function to run the test
export default testCORS; 