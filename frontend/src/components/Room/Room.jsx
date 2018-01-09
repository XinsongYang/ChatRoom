import React, { Component } from 'react';
import { Row, Col, Alert } from 'antd';
import axios from 'axios';
import Messages from './Messages';
import Users from './Users';
import './room.css';

class Room extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            ws: null,
            messages: [],
            users: [],
            error: null
        }

        this.addMessage = this.addMessage.bind(this);
        this.onMessage = this.onMessage.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onError = this.onError.bind(this);
    }

    componentDidMount() {
        const ws = new WebSocket(`ws://${location.host}/ws/chat`);
        ws.onmessage = this.onMessage;
        ws.onclose = this.onClose;
        ws.onerror = this.onError;
        this.setState({ws});
    }

    componentWillUnmount() {
        this.state.ws.close();
    }
    
    addMessage(message) {
        let messages = this.state.messages.concat([message]);
        this.setState({ messages });
    }

    onMessage(event) {
        const message = JSON.parse(event.data);
        if (message.type === 'list') {
            this.setState({
                users: message.data
            });
        } else if (message.type === 'join') {
            let users = this.state.users.concat([message.user]);
            this.setState({ users });
            this.addMessage(message);
        } else if (message.type === 'left') {
            let users = this.state.users.slice();
            users = users.filter(user => user.username !== message.user.username);
            this.setState({ users });
            this.addMessage(message);
        } else if (message.type === 'chat') {
            this.addMessage(message);
        }
    }

    onClose(event) {
        this.setState({
            error: '[DISCONNECTED] ' + event.code
        });
    }

    onError(code, message) {
        this.setState({
            error: '[ERROR] ' + code + ': ' + message
        });
    }

    render() {
        return (
            <div className="container" style={{ margin: "30px auto" }}>
                { this.state.error && <Alert message={ this.state.error } type="error" showIcon style={{ margin: "10px 0" }}/> } 
                <Row type="flex" justify="space-between">
                    <Col xs={24} sm={16} md={16} lg={16} xl={16}>
                        <Messages messages={this.state.messages} onSend={(text) => this.state.ws.send(text)}/>
                    </Col>
                    <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                        <Users users={this.state.users}/>
                    </Col> 
                </Row>
            </div>
        );
    }
}

export default Room;