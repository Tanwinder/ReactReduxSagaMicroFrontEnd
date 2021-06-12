import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import Image from '../../../public/img/p_logo.png'
import './loadingScreen.scss'

class LoadingScreen extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
            <div className="loadingScreen">
               {/* <img src={Image} alt=" image " /> */}
               <div className="loadingBar"></div>
               <div className="loadingContent">Inventory Management Suite</div>
            </div>
        )
    }
}

LoadingScreen.propTypes = {

}

export default LoadingScreen