import React from 'react'
import { Layout } from 'antd'
const {  Footer } = Layout

function CommonFooter(props) {
    return (
        <Footer style={{ textAlign: 'center' }}>
            Instant Chat Room by <a href="#">Xinsong</a> 
        </Footer>
    )
}


export default CommonFooter