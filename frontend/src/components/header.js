import React from 'react'
import logo from '../define-meLogo.png'

class Header extends React.Component{
    render() {
        return (
            <div id="header">
                <img src={logo} id='logo'/>
            </div>
        );
    }
}

export default Header