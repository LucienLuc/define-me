import React from 'react';
import {Card} from 'antd'
const Flashcard = (props) =>(
    <Card title="Terms" extra={<a href="#">More</a>} style={{ width: 300 }}>
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </Card>
)
export default Flashcard