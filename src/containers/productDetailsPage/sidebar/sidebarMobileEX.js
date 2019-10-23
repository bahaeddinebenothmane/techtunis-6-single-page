
import React, { Component } from 'react';

import './sidebar.css';



class SidebarMobile extends Component {
    state = {
        menuWidth: "0px",
        parent: 0,
        child: 0,
        grandchild: 0
    }
    render() {

        const handleOpen = () => {
            this.setState({ menuWidth: "250px" })
        }
        const handleClose = () => {
            this.setState({ menuWidth: "0px" })
        }

        const showMenu = () => {
            if (this.state.parent === 0) {
                return this.props.data.map((element, index) => {
                    return element.category.length ? <div><a href="#" onClick={() => { this.setState({ parent: 1, child: index }) }}>{element.name}</a></div> : <div><a href={element.liink}>{element.name}</a> </div>
                })
            }
            else if (this.state.parent === 1) {
                return this.props.data[this.state.child].category.map((element, index) => {
                    return element.list.length ? <div><a href="#" onClick={() => { this.setState({ parent: 2, grandchild: index }) }}>{element.name}</a></div> : <div><a href={element.liink}>{element.name}</a></div>
                })
            }
            else {
                return this.props.data[this.state.child].category[this.state.grandchild].list.map(element => {
                    return <div><a href={element.liink}>{element.name}</a></div>
                })
            }
        }
        const hnndleBack = () => {
            let t = this.state.parent
            if (this.state.parent !== 0) {
                this.setState({ parent: t - 1 })
            }
        }
        return (
            <div >
                <button onClick={hnndleBack}>back</button>
                {showMenu()}
            </div>



        )
    }
}

export default SidebarMobile