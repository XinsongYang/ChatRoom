import React from 'react';
import { List, Avatar, Icon, Button, notification } from 'antd';

function Messages(props) {
    
    function parseAt(str) {
        let content = [];
        let subStr = "";
        for (let i = 0; i < str.length; i++) {
            if (str.charAt(i) === '@') {
                if (subStr) {
                    content.push(subStr);
                    subStr = "";
                }                
                let username = "";
                while (i < str.length && str.charAt(i) !== ' ' && str.charAt(i) !== '\n') {
                    username += str.charAt(i);
                    i++;
                }
                content.push(<a>{username + ' '}</a>);
            } else {
                subStr += str.charAt(i);
            }
        }
        if (subStr) {
            content.push(subStr);
            subStr = "";
        }
        return content;
    }

    const messageItems = props.messages.map((message) => {
        let content = null;
        if (message.type === "text") {
            content = parseAt(message.data);
        } else if (message.type === "image") {
            content = <a href={message.data} target="_blank"><img style={{height: "100px"}} src={message.data} alt="photo"/></a>
        }
        return (
            <li key={message.id}>
                <div className="message-item" style={{display: "flex", padding: "8px 20px"}}>
                    <Avatar size="large" shape="square" icon="user" style={{marginRight: "16px"}}/> 
                    <div style={{flex: "1"}}>
                        <div>
                            <span style={{fontSize: "15px", fontWeight: 900}}>{message.user.username}</span>
                            <span style={{fontSize: "12px", color: "#717274", marginLeft: "5px"}}>{new Date(message.time).toLocaleString()}</span>
                        </div>
                        <div>{content}</div>
                    </div>
                    {message.user.username === props.user.username && 
                        <div>
                            <Button onClick={() => props.sendMessage("delete", message.id)}><Icon type="delete"/></Button>
                        </div>
                    }  
                </div> 
            </li>
        );
    });

    return (
        <ul>{messageItems}</ul>
    )
}


export default Messages