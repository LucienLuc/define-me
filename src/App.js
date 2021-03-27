import logo from './logo.svg';
import './App.css';

import 'antd/dist/antd.css';

import UploadFile from './components/UploadFile'
import app_header from './components/header'

function App() {
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
      <app_header/>
      <UploadFile/>
      
    </div>
  );
}

export default App;
