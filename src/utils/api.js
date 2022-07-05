import axios from 'axios';

const APIURL = import.meta.env.VITE_CONTRIES_URL;

const headers = {
  'Access-Control-Allow-Origin': true,
  'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  Accept: '*',
};

export default {
  handleCountries: async () => {
    try {
      const options = {
        method: 'GET',
        url: `${APIURL}//all`,
        headers: headers,
      };

      const result = await axios.request(options);

      return result;
    } catch (err) {
      console.error(err);
    }
  },
};

// https://www.querythreads.com/vite-js-react-build-not-redirecting-on-netlify-and-vercel/
