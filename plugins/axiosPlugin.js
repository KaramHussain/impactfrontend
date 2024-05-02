// plugins/axiosPlugin.js

import Vue from 'vue';
import axios from 'axios';

Vue.prototype.$apiResponseWithTimeTaken = async function (apiConfigs) {
    const startTime = performance.now();

    try {
        const response = await axios(apiConfigs);
        console.log(response.data);

        const endTime = performance.now();
        const timeTaken = `${parseInt((endTime - startTime) / 1000)}s`;

        return {
            success: true,
            response: response.data,
            timeTaken: timeTaken,
        };
    } catch (error) {
        console.error(error);

        const endTime = performance.now();
        const timeTaken = `${parseInt((endTime - startTime) / 1000)}s`;

        return {
            success: false,
            error: error.message,
            timeTaken: timeTaken,
        };
    }
};


/*
Structure for config:-
const axiosConfig = {
  method: 'post', // HTTP method (e.g., 'get', 'post', 'put', 'delete')
  url: apiEndpoint, // API endpoint URL
  data: requestData, // Request data (for 'post' or 'put' requests)]\
  headers: {
    'Content-Type': 'application/json', // Content type
    'Authorization': 'Bearer your_access_token' // Authorization header (if needed)
  },
  timeout: 5000,
};
*/