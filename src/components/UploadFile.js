import React from 'react'
import './UploadFile.css'

class UploadFile extends React.Component{
    render() {
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