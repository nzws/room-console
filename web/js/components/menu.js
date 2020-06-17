import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

const MenuComponent = () => {
  const logout = () => {
    if (!confirm('よろしいですか？')) return;
    localStorage.removeItem('api_token');
    location.reload();
  };

  return (
    <Menu>
      <Menu.Item>
        <Link to="/settings/devices">デバイスを追加</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/settings/hooks">フックの管理</Link>
      </Menu.Item>
      <Menu.Item danger onClick={logout}>
        ログアウト
      </Menu.Item>
    </Menu>
  );
};

export default MenuComponent;
