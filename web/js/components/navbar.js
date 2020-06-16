import React from 'react';
import { PageHeader } from 'antd';
import { HomeOutlined } from '@ant-design/icons';

const NavComponent = () => {
  return (
    <PageHeader
      title={
        <>
          <HomeOutlined /> My Room
        </>
      }
    />
  );
};

export default NavComponent;
