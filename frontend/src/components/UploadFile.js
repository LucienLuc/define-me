import React from 'react'
import axios from 'axios'
import './UploadFile.css'
import {app} from '../base'

import {Upload, Button, message} from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { Redirect } from 'react-router';

// const BASE_URL = "https://us-central1-define-me-308905.cloudfunctions.net"

// For firebase emulator testing
const BASE_URL = "http://localhost:5001/define-me-308905/us-central1"

class UploadFile extends React.Component{
  constructor(props){
    super(props);
    this.state = {uploading: false};
}
  handleUpload = (e) => {
    this.setState({
      uploading:true
    })
    const file = e.target.files[0];
    const storageRef = app.storage().ref()
    const fileRef = storageRef.child(file.name)
    fileRef.put(file).then((res) => {
      console.log(res)
      axios.post(BASE_URL + "/ocr", {file: file.name}).then(response => {
        //delete pdf file
        fileRef.delete().then(() => {
        }).catch((error) => {
          console.log(error);
        })
        //make definitions and terms
        console.log(response)
      })
    }).catch(e => console.log(e))
    // /*this.setState({
    //   uploading:false
    // })*/
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
              <div>
              {this.state.uploading && <div class="progress"></div>}
              <div class="file-input">
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
              </div>
      )
  }
}

export default UploadFile