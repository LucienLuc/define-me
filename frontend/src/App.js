//import logo from './logo.svg';
import './App.css';
import axios from 'axios'

import {Button} from 'antd'
import 'antd/dist/antd.css';

import UploadFile from './components/UploadFile'
import app_header from './components/header'

function App() {

  const handleClick = () => {
    axios.get('https://us-central1-define-me-308905.cloudfunctions.net/helloWorld').then(response => {
      console.log(response)
    })
  }

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <Button onClick={handleClick}>Test firebase</Button>
      <app_header/>
      <UploadFile/>
      
    </div>
  );
}

export default App;
