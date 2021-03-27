import React from 'react'
import axios from 'axios'
import './UploadFile.css'
import {app} from '../base'

import {Upload, Button, message} from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const BASE_URL = "https://us-central1-define-me-308905.cloudfunctions.net"

class UploadFile extends React.Component{
  handleUpload = (e) => {
    const file = e.target.files[0];
    const storageRef = app.storage().ref()
    const fileRef = storageRef.child(file.name)
    fileRef.put(file).then(() => {
      axios
        .post(BASE_URL + "/ocr", {file: file.name})
        .then(response => {
          //delete pdf file
          fileRef.delete().then(() => {
          }).catch((error) => {
            console.log(error);
          })
          //make definitions and terms
        })
    })
  }
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
                  onChange={this.handleUpload}
                  src="#">
                  </input>
              </div>
      )
  }
}

export default UploadFile