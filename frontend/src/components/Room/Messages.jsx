import React from 'react';
import { Card, Content } from 'reactbulma';
import { List, Avatar, Input } from 'antd';
const Search = Input.Search;

function Messages(props) {
    const messages = props.messages.map(function(message) {
        return <div>{message.data}</div>
    });

    return (
        <Card className="room-card">
            <Card.Header>
                <Card.Header.Title>
                    Messages
                </Card.Header.Title>
            </Card.Header>
            <Card.Content>
                <Content>
                    {/*{messages}*/}
                    <div className="message-list">
                        <List
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
                        />
                    </div>
                    <Search enterButton="Send" onSearch={text => props.onSend(text)} />
                </Content>
            </Card.Content>
        </Card>
    )
}


export default Messages