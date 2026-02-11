import axios from 'axios';
import { CONST } from '@/utils/const';

const axiosInstance = axios.create({
  baseURL: CONST.BASEURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'x-hasura-admin-secret': CONST.BASEKEY,
  },
});

export default axiosInstance;
