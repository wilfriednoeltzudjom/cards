import axios from 'axios';

const httpClient = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
});

const jsonContentTypeHeader = { 'Content-Type': 'application/json' };

export { httpClient, jsonContentTypeHeader };
