import React, { Component } from "react";
import { Col, Input, Icon, Menu, Dropdown, Button } from 'antd';
const InputGroup = Input.Group;
import { Picker } from 'emoji-mart';
import './emoji-mart.css'

class InputBox extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            text: ""
        };
        this.onSend = this.onSend.bind(this);
    }

    onSend() {
        this.props.sendMessage("text", this.state.text);
        this.setState({text: ""});
    }

    render() {
        const addMenu = (
          <Menu onClick={({key}) => this.props.setModal(key)}>
            <Menu.Item key="location">Location</Menu.Item>
            <Menu.Item key="file">File</Menu.Item>
            <Menu.Item key="photos">Photos</Menu.Item>
          </Menu>
        );
        
        return (
            <InputGroup compact>    
                <Dropdown overlay={addMenu} placement="topLeft" trigger={['click']} >
                    <Button><Icon type="plus" /></Button>
                </Dropdown>
                <Input 
                    style={{ width: "80%" }} 
                    value ={this.state.text} 
                    onChange={e => this.setState({text: e.target.value})} 
                    onPressEnter={this.onSend}
                />
                <Button>@</Button>
                <Dropdown 
                    overlay={<Picker onClick={(emoji) => this.setState({text: this.state.text + emoji.native})}/>} 
                    placement="topRight" 
                    trigger={['click']} 
                >
                    <Button><Icon type="smile-o" /></Button>
                </Dropdown>   
            </InputGroup>
        );
    }
}

export default InputBox;