import React, { Component } from 'react';
import { Layout, Input, Row, Col, Alert, Modal, notification } from 'antd';
const { Sider, Content, Footer } = Layout;
const Search = Input.Search;
import axios from 'axios';
import RoomSider from './RoomSider';
import Messages from './Messages';
import InputBox from './InputBox';
import PhotosModal from './PhotosModal';
import './room.css';

class Room extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            ws: null,
            messages: [],
            users: [],
            error: null,
            modal: null
        }

        this.addMessage = this.addMessage.bind(this);
        this.onMessage = this.onMessage.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onError = this.onError.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
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
            if (message.user.username !== this.props.user.username) {
                notification.open({
                    message: message.data
                });
            }
            // this.addMessage(message);
        } else if (message.type === 'left') {
            let users = this.state.users.slice();
            users = users.filter(user => user.username !== message.user.username);
            this.setState({ users });
            if (message.user.username !== this.props.user.username) {
                notification.open({
                    message: message.data
                });
            }
            // this.addMessage(message);
        } else {
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

    sendMessage(type, data) {
        const message = JSON.stringify({ type, data});
        this.state.ws.send(message);
    }

    render() {
        return (
            <div>
                { this.state.error && <Alert message={ this.state.error } type="error" showIcon /> }
                <PhotosModal 
                    visible={this.state.modal === "photos"} 
                    closeModal={() => this.setState({modal: null})}
                    sendMessage={this.sendMessage}
                />
                <Layout>     
                    <RoomSider user={this.props.user} onLogout={this.props.onLogout} users={this.state.users} />
                    <Content>
                        <div className="room-container">
                            <div className="message-list">
                                <Messages messages={this.state.messages} />
                            </div>
                            <div className="room-footer">
                                <InputBox 
                                    setModal={(key) => {this.setState({modal: key})}}
                                    sendMessage={this.sendMessage} 
                                />
                                {/*<Search enterButton="Send" onSearch={text => this.state.ws.send(text)}/>*/}
                            </div>   
                        </div>        
                    </Content>
                </Layout>
            </div>
        );
    }
}

export default Room;