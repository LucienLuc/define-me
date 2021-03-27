import React, {Component} from 'react';
import {Button} from 'antd';
class NextCard extends Component{
    constructor(props){
        super(props);
        this.drawCard = this.drawCard.bind(this);
    }
    drawCard(){
        this.props.drawCard();
    }
    render(props){
        return(
            <Button type="primary" onClick={this.drawCard}>Next Card</Button>
        )
    }
}
export default NextCard