//import logo from './logo.svg';
import React,{Component} from 'react'
import './App.css';
import axios from 'axios'
//import {DB_CONFIG} from '.firebase/functions/db_config';
import {Button} from 'antd'
import 'antd/dist/antd.css';

//import 'firebase/database';

import UploadFile from './components/UploadFile'
import Header from './components/header'
import Flashcard from './components/Flashcard'
import NextCard from './components/NextCard'

import {app} from './base'

// const BASE_URL = "https://us-central1-define-me-308905.cloudfunctions.net"

// For firebase emulator testing
const BASE_URL = "http://localhost:5001/define-me-308905/us-central1"

const handleClick = () => {
  axios.post('http://localhost:5001/define-me-308905/us-central1/ocr', {file: 'testfile.pdf'}).then(response => {
    console.log(response);
  }).then(() => {
    const storageRef = app.storage().ref()
    const fileRef = storageRef.child("/results/output-1-to-1.json")
    fileRef.getDownloadURL().then(url => {
      axios.get(url).then(response => {
        console.log(response.data.responses[0].fullTextAnnotation.text)
      }).catch(e => console.log(e))
    })
  });
}

class App extends Component{
  constructor(props){
    super(props);

    //this.app = firebase.initializeApp(DB_CONFIG);
    //this.database = this.app.database().ref().child('data');
    this.updateCard = this.updateCard.bind(this);
    this.state = {
      cards: [{id: 1, term: "Hello", def: "World"},
      {id: 2, term:"Goodbye", def:"World"}],
      currentCard: {} 
    }
  }
  

  componentWillMount(){
    //console.log(this.app.database().ref().child('data'))
    const currentCards = this.state.cards;
    /*this.database.on('child_added', snap => {
      currentCards.push({
        id: snap.key,
        term: snap.val().term,
        def: snap.val().def,
      })*/

      this.setState({
        cards: currentCards,
        currentCard: this.getRandomCard(currentCards)
      })

    //})
  }

  getRandomCard(currentCards){
    var card = currentCards[Math.floor(Math.random() * currentCards.length)];
    /*var card = currentCards[randomIndex];
    if(card === this.state.currentCard){
      this.getRandomCard(currentCards)
    }*/

    return(card);
  }

  updateCard(){
    const currentCards = this.state.cards;
    this.setState({
      //cards: currentCards,
      currentCard: this.getRandomCard(currentCards)
    })
  }

  
  render(){
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
      <header className="App-header">
        <Button onClick={handleClick}>Test firebase</Button>
        <Header/> 
        <Flashcard term={this.state.currentCard.term} 
        def={this.state.currentCard.def}/>

        <NextCard drawCard={this.updateCard}/>
        
        <UploadFile/>
      </header> 
    </div>
  );
  }
}

export default App;
