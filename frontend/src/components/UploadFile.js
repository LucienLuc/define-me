import React from 'react'
import './UploadFile.css'

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
                <div className="file-input">
                <div>
                <label for="avatar">Select a pdf:</label>
                </div>
                    <input type="file"
                    id="avatar" name="avatar" 
                    accept="image/png, image/jpeg, .pdf"
                    src="#">
                    </input>
                </div>
        )
    }
}

export default UploadFile