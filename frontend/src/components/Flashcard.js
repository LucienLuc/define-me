import React,{Component} from 'react'
import './Flashcard.css'
const Flashcard = (props) =>(
    <div className="card-container">
        <div className="card">
            <div className="front">
                <div className="term">{props.term}</div>
            </div>
            <div className="front back">
                <div className="def">{props.def}</div>
            </div>
        </div>
    </div>
)
export default Flashcard