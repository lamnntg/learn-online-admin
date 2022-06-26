// import { useState } from "react";
import { Menu } from 'antd';
import { NavLink, useLocation } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import {
  VideoCameraOutlined,
  UserOutlined,
  DashboardOutlined,
  BookOutlined,
} from '@ant-design/icons';

function Sidenav({ color }) {
  const { pathname } = useLocation();
  const page = pathname.replace('/', '');

  return (
    <>
      <div className="brand">
        <img src={logo} alt="" />
        <span style={{ paddingLeft: '10px' }}>Learn Online Admin</span>
      </div>
      <hr />
      <Menu theme="light" mode="inline">
        <Menu.Item key="db" style={{ marginBottom: '10px' }}>
          <NavLink to="/dashboard">
            <span
              className="icon"
              style={{
                background: page === 'dashboard' ? color : ''
              }}>
              {<DashboardOutlined />}
            </span>
            <span className="label">Trang chủ</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item className="menu-item-header" key="5" style={{ marginBottom: '10px' }}>
          Quản lý
        </Menu.Item>
        <Menu.Item key="users" style={{ marginBottom: '10px' }}>
          <NavLink to="/users">
            <span
              className="icon"
              style={{
                background: page === 'profile' ? color : ''
              }}>
              {<UserOutlined />}
            </span>
            <span className="label">Nguời dùng</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="classroom" style={{ marginBottom: '10px' }}>
          <NavLink to="/classroom">
            <span
              className="icon"
              style={{
                background: page === 'classroom' ? color : ''
              }}>
              {<BookOutlined />}
            </span>
            <span className="label">Lớp học</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="courses" style={{ marginBottom: '10px' }}>
          <NavLink to="/courses">
            <span
              className="icon"
              style={{
                background: page === 'courses' ? color : ''
              }}>
              {<UserOutlined />}
            </span>
            <span className="label">Khóa học</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item className="menu-item-header" key="5" style={{ marginBottom: '10px' }}>
          Khác
        </Menu.Item>
        <Menu.Item key="meeting1" style={{ marginBottom: '10px' }}>
          <NavLink to="/meeting">
            <span className="icon">{<VideoCameraOutlined />}</span>
            <span className="label">Khác</span>
          </NavLink>
        </Menu.Item>
        {/* <Menu.Item className="menu-item-header" key="8">
          Classrooms
        </Menu.Item>
        <Menu.Item key="meeting2">
          <NavLink to="/meeting">
            <span className="icon">C1</span>
            <span className="label">Lớp học 1</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="meeting3">
          <NavLink to="/meeting">
            <span className="icon">C2</span>
            <span className="label">Lớp học 2</span>
          </NavLink>
        </Menu.Item> */}
        {/*<Menu.Item key="8">
          <NavLink to="/sign-up">
            <span className="icon">{signup}</span>
            <span className="label">Sign Up</span>
          </NavLink>
        </Menu.Item> */}
      </Menu>
      {/* <div className="aside-footer">
        <div
          className="footer-box"
          style={{
            background: color,
          }}
        >
          <span className="icon" style={{ color }}>
            {dashboard}
          </span>
          <h6>Need Help?</h6>
          <p>Please check our docs</p>
          <Button type="primary" className="ant-btn-sm ant-btn-block">
            DOCUMENTATION
          </Button>
        </div>
      </div> */}
    </>
  );
}

export default Sidenav;

