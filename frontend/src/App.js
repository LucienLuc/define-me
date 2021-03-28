import React,{Component} from 'react'
import './App.css';

import 'antd/dist/antd.css';
import 'firebase/database';

import UploadFile from './components/UploadFile'
import Header from './components/header'
import Flashcard from './components/Flashcard'
import NextCard from './components/NextCard'

import {app} from './base'

const BASE_URL = "https://us-central1-define-me-308905.cloudfunctions.net"

// For firebase emulator testing
// const BASE_URL = "http://localhost:5001/define-me-308905/us-central1"

class App extends Component{
  constructor(props){
    super(props);
    this.updateCard = this.updateCard.bind(this);
    this.state = {
      cards: [{id: 1, term: "Your terms will appear here!", def: "Your definitions will appear here!"}],
      currentCard: {}
    }
  }
  
  changeCards = (newCards) => {
    console.log("Changing state")
    console.log(newCards)
    this.setState({cards : newCards})
    this.updateCard()
  }

  componentWillMount(){
    const currentCards = this.state.cards;
      this.setState({
        currentCard: this.getRandomCard(currentCards)
      })
  }

  getRandomCard(currentCards){
    var randomIndex = Math.floor(Math.random() * currentCards.length);
    var card = currentCards[randomIndex];
    if(card === this.state.currentCard){
      this.getRandomCard(currentCards)
    }

    return(card);
  }

  updateCard(){
    const currentCards = this.state.cards;
    this.setState({
      cards: currentCards,
      currentCard: this.getRandomCard(currentCards)
    })
  }

  
  render(){
  return (
    <div className="App">
      <header className="App-header">
        <Header/> 
        <UploadFile callback={this.changeCards}/>
        <Flashcard term={this.state.currentCard.term} 
        def={this.state.currentCard.def}/>

        <NextCard drawCard={this.updateCard}/>
      </header> 
    </div>
  );
  }
}

export default App;
