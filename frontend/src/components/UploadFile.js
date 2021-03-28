import React from 'react'
import axios from 'axios'
import './UploadFile.css'
import {app} from '../base'

import {Upload, Button, message} from 'antd';
import { InboxOutlined  } from '@ant-design/icons';

const { Dragger } = Upload;

// const BASE_URL = "https://us-central1-define-me-308905.cloudfunctions.net"

// For firebase emulator testing
const BASE_URL = "http://localhost:5001/define-me-308905/us-central1"

class UploadFile extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      fileList: [],
      uploading: false
    };
}
  handleUpload = (e) => {
    const { fileList } = this.state;
    const formData = new FormData();
    fileList.forEach(file => {
      formData.append('files[]', file);
    });

    this.setState({
      uploading: true,
    });

    const file = this.state.fileList[0];
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
    }).catch(e => {
      console.log(e)
      this.setState({
        uploading: false
      })
    })
  }
  render() {
    const { uploading, fileList } = this.state;
    const props = {
      onRemove: file => {
        this.setState(state => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: file => {
        this.setState(state => ({
          fileList: [...state.fileList, file],
        }));
        return false;
      },
      fileList,
    };

    return (
            <div>
            {this.state.uploading && <div class="progress"></div>}
              <div class="file-input"> 
                <Dragger {...props}>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">Click or drag file to this area to upload</p>
                </Dragger>
                <Button
                  type="primary"
                  onClick={this.handleUpload}
                  disabled={fileList.length === 0}
                  loading={uploading}
                  style={{marginTop: 16}}>
                  {uploading ? 'Uploading' : 'Start Upload'}
                </Button>
              </div>
            </div>
    )
  }
}

export default UploadFile