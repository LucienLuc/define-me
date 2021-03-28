import React from 'react'
import axios from 'axios'
import './UploadFile.css'
import {app} from '../base'

import {Upload, Button, message} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Redirect } from 'react-router';

// const BASE_URL = "https://us-central1-define-me-308905.cloudfunctions.net"

// For firebase emulator testing
const BASE_URL = "http://localhost:5001/define-me-308905/us-central1"

class UploadFile extends React.Component{
  constructor(props){
    super(props);
    this.state = {uploading: false};
    this.handleUpload = this.handleUpload.bind(this)
}
  handleUpload = (e) => {
    this.setState({
      uploading:true
    })
    const file = e.file;
    const storageRef = app.storage().ref()
    const fileRef = storageRef.child(file.name)
    fileRef.put(file).then((res) => {
      console.log(res) // FILE UPLOADED
      axios.post(BASE_URL + "/ocr", {file: file.name}).then(response => {
        // OCR COMPLETE
        //delete pdf file 
        fileRef.delete().then(() => {
          // Get output of ocr
          storageRef.child('/results').listAll().then(res => {
            res.items.forEach((itemRef) => {
              if (itemRef.name.startsWith(file.name)){
                // console.log(itemRef.name)
                // Get raw text data from ocr
                itemRef.getDownloadURL().then(url => {
                  axios.get(url).then(response => {
                    // pass into machine learning model
                    console.log(response.data.responses[0].fullTextAnnotation.text)
                  }).catch(err => console.log(err))
                })
              }
            });
          }).catch(err => console.log(err))

        }).catch((error) => {
          console.log(error);
        })
        //make definitions and terms
      })
    }).catch(e => console.log(e))
  }
  render() {
    return (
            <div>
            {this.state.uploading && <div class="progress"></div>}
              <div class="file-input"> 
                <Upload name="file"
                onChange={this.handleUpload}>
                  <Button icon={<UploadOutlined />}>Select a pdf:</Button>
                </Upload>
              </div>
            </div>
    )
  }
}

export default UploadFile