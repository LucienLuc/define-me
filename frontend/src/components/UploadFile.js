import React from 'react'
import axios from 'axios'
import './UploadFile.css'
import {app} from '../base'
import { Progress } from 'antd';

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
      uploading: false,
      progress: 0,
      text: "Uploading",
      fileList: [],
    };
    this.handleUpload = this.handleUpload.bind(this)
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
    fileRef.put(file)
    .then((res) => {
      this.setState({
        uploading: true,
        progress: 33,
        text: "Converting"
      })
      console.log("uploaded file to firebase");
      axios
        .post(BASE_URL + "/ocr", {file: file.name})
        .then(response => {
          this.setState({
            uploading: true,
            progress: 66,
            text: "Scanning"
          })
          console.log("ocr begin");
          //delete pdf file
          fileRef
            .delete()
            .then(() => {
              storageRef.child("/results").listAll().then(res => {
                res.items.forEach((itemRef) => {
                  if(itemRef.name.startsWith(file.name)) {
                    console.log(itemRef.name)
                    itemRef.getDownloadURL().then(url => {
                      axios.get(url).then(response => {
                        const rawText = response.data.responses[0].fullTextAnnotation.text

                        //get definitions and terms
                        axios.get(BASE_URL + '/getTerms', {text: rawText}).then(response => {
                          console.log(response)
                          this.setState({
                            progress: 100,
                            uploading: false,
                            text: "Done"
                          })
                        })
                      })
                    })
                  }
                });
              })
              this.setState({
                uploading: false
              })
              console.log("deleted file");
            })
            .catch((error) => {
              console.log(error); 
            })
      })
    }).catch(e => {
      console.log(e)
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
            {this.state.uploading && <Progress percent={this.state.progress} showInfo={false} strokeColor={{from: '#108ee9', to: '#87d068'}} status="active"/>}

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