import React from 'react'

import {Upload, Button, message} from 'antd';
import { InboxOutlined } from '@ant-design/icons';

class UploadFile extends React.Component{

    render() {

        let props = {
            name: 'file',
            multiple: true,
            action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
            onChange(info) {
              const { status } = info.file;
              if (status !== 'uploading') {
                console.log(info.file, info.fileList);
              }
              if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
              } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
              }
            },
        };

        return (
            <div>
                <Button>Hello</Button>
                <div style ={{
                    outline: '5px solid black',
                    width: '50 px'
                    }}>
                <Upload {...props}>
                    <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                    band files
                    </p>
                </Upload>
                </div>
            </div>
        )
    }
}

export default UploadFile