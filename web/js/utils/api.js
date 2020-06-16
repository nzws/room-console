import ky from 'ky';
import { toast } from 'react-toastify';

const api = async (path, json = {}) => {
  const token = localStorage.getItem('api_token');

  try {
    const data = await ky
      .post(path, {
        json,
        headers: {
          authorization: token || ''
        }
      })
      .json();

    return data;
  } catch (e) {
    console.error(e);
    e?.response?.json().then(e => {
      toast.error(e.error);
      if (e.error.indexOf('require_renew_auth') !== -1) {
        localStorage.removeItem('api_token');
      }
    });
    throw e;
  }
};

export default api;
