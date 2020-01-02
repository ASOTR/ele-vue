import { get, post } from './http';


const apiSeller = (params) => get('mock/seller', params);


export default {
  apiSeller,
};
