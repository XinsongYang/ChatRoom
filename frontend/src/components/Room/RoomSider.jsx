import React from 'react';
import { Layout, Menu, Dropdown, Icon } from 'antd';
const { Sider } = Layout;

function RoomSider(props) {
    
    const userMenu = (
        <Menu>
            {/*<Menu.Item>
                <a href="#">Profile</a>
            </Menu.Item>*/}
            <Menu.Item>
                <a href="#" onClick={props.onLogout}>Logout</a>
            </Menu.Item>
        </Menu>
    );

    const usernames = props.users.map((user) =>
        <li key={user.username}>
            <Icon type="user" /> {user.username}
        </li>
    );

    return (
        <Sider style={{ overflow: 'auto', height: '100vh', background: "#4c3a4a" }}>
            <div className="sider-item">
                <Dropdown overlay={userMenu}>
                    <a className="ant-dropdown-link" href="#" style={{ fontSize: "18px", fontWeight: "900", color: "#fff" }}>
                      {props.user.username} <Icon type="down" />
                    </a>
                </Dropdown>
            </div>
            <div className="sider-item" style={{ color: "#fff" }}>
                <div style={{ fontSize: "16px", fontWeight: "900", color: "#fff" }} > Online Users</div>
                <ul>{usernames}</ul>
            </div>
        </Sider>
    )
}


export default RoomSider;