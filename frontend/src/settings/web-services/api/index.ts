import axios from 'axios';
import { Environment } from 'types/common';

const getDevelopmentApiLink = () => 'http://localhost:3000';
const getProductionApiLink = () => process.env.REACT_APP_API_ENDPOINT;

export const apiServer = axios.create({
  baseURL: process.env.NODE_ENV === Environment.Prod ? getProductionApiLink() : getDevelopmentApiLink(),
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
