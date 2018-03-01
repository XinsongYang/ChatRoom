import React, { Component } from "react";
import { Button, Icon, Modal, Upload } from 'antd';

class PhotosModal extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            urls: [],
            fileList: []
        };

        this.onSend = this.onSend.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onUploaded = this.onUploaded.bind(this);
    }
    
    onSend() {
        this.state.fileList.forEach((file) => {
            if (file.response) {
                this.props.sendMessage("image", file.response.url);
            }
        });
        this.onCancel();
    }

    onCancel() {
        this.setState({
            fileList: []
        });
        this.props.closeModal();
    }

    onUploaded(info) {
        this.setState({
            fileList: info.fileList
        });
    }

    render() {
        const uploadProps = {
            accept: "image/*",
            action: 'api/upload',
            listType: 'picture',
            onChange: this.onUploaded,
            fileList: this.state.fileList
        };
        return (
            <Modal
              title="Photos Uploader"
              visible={this.props.visible}
              onOk={this.onSend}
              onCancel={this.onCancel}
              okText="Send"
            >
                <Upload {...uploadProps}>
                    <Button>
                        <Icon type="upload" /> upload
                    </Button>
                </Upload>
            </Modal>
        );
    }
}

export default PhotosModal;