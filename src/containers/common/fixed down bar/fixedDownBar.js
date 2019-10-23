import React, { Component } from 'react'
import FDBregular from "./FDBregular"
import FDBmobile from './FDBmobile'
class FixedDownBar extends Component {
    
    render() {
        const test=()=>{
            if(window.screen.width >= 1000){
                return <FDBregular/> 
            }else{
                return <FDBmobile/>
            }
            
        }
        return(
            test()
        )
    }
}


export default FixedDownBar