import React from 'react';
import { Layout } from 'antd';
const { Content } = Layout;
import CommonHeader from './CommonHeader';
import CommonFooter from './CommonFooter';
// import Banner from './Banner';

class HomeLayout extends React.Component {
    render() {
        return (
            <Layout>
{/*                <Banner />*/}
                <Content>
                    {this.props.children}
                </Content>
                <CommonFooter />
            </Layout>
        );
    }
}

export default HomeLayout;