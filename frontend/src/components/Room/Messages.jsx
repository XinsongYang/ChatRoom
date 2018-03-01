import React from 'react';
import { List, Avatar, Icon } from 'antd';

function Messages(props) {
    const messageItems = props.messages.map((message) => {
        let content = null;
        if (message.type === "text") {
            content = message.data;
        } else if (message.type === "image") {
            content = <a href={message.data} target="_blank"><img style={{height: "100px"}} src={message.data} alt="photo"/></a>
        }
        return (
            <li key={message.id}>
                <div style={{display: "flex", padding: "6px 0"}}>
                    <Avatar size="large" shape="square" icon="user" style={{marginRight: "16px"}}/> 
                    <div>
                        <div>
                            <span style={{fontSize: "15px", fontWeight: 900}}>{message.user.username}</span>
                            <span style={{fontSize: "12px", color: "#717274", marginLeft: "5px"}}>{new Date(message.time).toLocaleString()}</span>
                        </div>
                        <div>{content}</div>
                    </div>  
                </div> 
            </li>
        );
    });

    return (
        /*<List
            itemLayout="horizontal"
            dataSource={props.messages}
            renderItem={message => (
                <List.Item>
                    <List.Item.Meta
                        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                        title={<span style={{fontSize: "14px"}}>{message.user.username}</span>}
                        description={message.data}
                    />
                </List.Item>
            )}
        />*/
        <ul>{messageItems}</ul>
    )
}


export default Messages