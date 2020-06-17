import { useState } from 'react';
import { createContainer } from 'unstated-next';
import api from '../utils/api';

const Container = () => {
  const devices = useState([]);

  const updateDevices = async () => {
    const { result } = await api('/auth-api/devices');

    devices[1](result);
  };

  return {
    devices,
    updateDevices
  };
};

export default createContainer(Container);
