import React,{Component} from 'react'
import './Flashcard.css'
import {Card} from 'antd'
const Flashcard = (props) =>(
    
    <Card title={props.term} extra={<a href="#">More</a>} style={{ width: 400 }} className="card">
      <p>{props.def}</p>
    </Card>
   
)
export default Flashcard