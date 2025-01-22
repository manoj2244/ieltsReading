import React from "react";
import { Menu } from "antd";

const Header = () => {
  return (
    <Menu mode="horizontal" theme="dark">
      <Menu.Item key="1">Passage 1</Menu.Item>
      <Menu.Item key="2">Passage 2</Menu.Item>
      <Menu.Item key="3">Passage 3</Menu.Item>
    </Menu>
  );
};

export default Header;