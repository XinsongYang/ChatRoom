import React from 'react';
import { Layout, Row, Col, Menu, Dropdown, Icon } from 'antd';
import { Link, withRouter } from 'react-router-dom';
const {  Header } = Layout;

function CommonHeader(props) {
    
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

    return (
        <Header style={{background: "#ffffff"}}>
            <Row type="flex" justify="space-between" className="container">
                <Col xs={8} sm={12} md={12} lg={12} xl={12}>
                    <div className="logo">
                        <Link to="/">
                            {/*<img src="/images/logo.png" alt="logo"/>*/}
                            Home
                        </Link>
                    </div>
                    {/*<Menu
                        theme="dark"
                        mode="horizontal"
                        style={{ lineHeight: '64px' }}
                    >
                        <Menu.Item key="1"><a href="/">Home</a></Menu.Item>
                    </Menu>*/}
                </Col>
                <Col xs={16} sm={12} md={12} lg={12} xl={12}>
                    <div style={{float: "right"}}>
                        {props.user ? (
                            <div>
                                <Dropdown overlay={userMenu}>
                                    <a className="ant-dropdown-link" href="#">
                                      {props.user.username} <Icon type="down" />
                                    </a>
                                </Dropdown>
                            </div>
                        ) : (
                            <div>
                                <Link to="/login" style={{margin: "0 6px"}}>Log in</Link>
                                <Link to="/signup" style={{margin: "0 6px"}}>Sign up</Link>
                            </div>        
                        )}
                    </div>
                </Col> 
            </Row>
        </Header>
    )
}


export default withRouter(CommonHeader)