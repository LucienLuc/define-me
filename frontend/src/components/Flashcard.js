import React,{Component} from 'react'
import {Card} from 'antd'
const Flashcard = (props) =>(
    <Card title={props.term} extra={<a href="#">More</a>} style={{ width: 300 }}>
      <p>{props.def}</p>
      
      
    </Card>
)
export default Flashcard