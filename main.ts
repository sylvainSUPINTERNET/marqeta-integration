// https://community.marqeta.com/t5/developer-blogs/getting-started-in-node-js-the-marqeta-core-api-for-javascript/ba-p/570

import dotenv from 'dotenv'
import axios from "axios";
dotenv.config();

const { APPLICATION_TOKEN, ADMIN_ACCESS_TOKEN, URL_API } = process.env as any;


const authString = Buffer.
  from(`${APPLICATION_TOKEN}:${ADMIN_ACCESS_TOKEN}`).
  toString('base64');

axios.defaults.headers.common['Authorization'] = `Basic ${authString}`;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';
axios.defaults.baseURL = 'https://sandbox-api.marqeta.com/v3';


const send = async (args:any = {}) => {
    const method = args.method || 'GET';
    try {
      const options:any = {
        method,
        url: args.endpoint
      }
      if (args.data) {
        options.data = args.data
      }
      const result = await axios(options);
      return result.data;
    } catch (e) {
      console.log(e);
    }
};

( async () => {
    try {
        const response = await axios.get(`${URL_API}/users`);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
})();