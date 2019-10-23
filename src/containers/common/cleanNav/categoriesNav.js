import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import './categoriesNav.css'
class CategoriesNav extends Component {
    state = {
        show: null
    }
    render() {
        const handleShow = (i) => {
            this.setState({ show: i })
        }
        const handleHide = () => {
            this.setState({ show: null })
        }
        const mobileView = () => {
            return (
                <div className="CategoriesNav" style={{display:"flex",flexDirection:"column"}}>
                    {this.props.data.map((element, i) => {
                        return (
                            <div className="CategoriesNavColumn"   onMouseOver={() => { handleShow(i) }} onMouseOut={handleHide}>
                                <div className="btnCategories" onClick={() => { handleShow(i) }} >
                                    {element.name}
                                </div>
                                <div  className="CategoriesLists" style={{ display: this.state.show === i ? "" : "none" ,height:"auto",width:"100%",flexWrap:"nowrap"}}>
                                    {element.category.map((el) => {

                                        return (
                                            <div className="CategoriesColumn" >
                                                <h5>{el.name}</h5>
                                                {el.list.map(elem => {
                                                    return (<a onClick={handleHide} href={elem.liink}>{elem.name}</a>)
                                                })}
                                            </div>
                                        )
                                    })
                                    }
                                </div>
                            </div>
                        )
                    })}
                </div>
            )
        }
        const regularView = () => {
            return (
                <div className="CategoriesNav">
                    {this.props.data.map((element, i) => {
                        return (
                            <div className="CategoriesNavColumn" onMouseOver={() => { handleShow(i) }} onMouseOut={handleHide}>
                                <div className="btnCategories" onClick={() => { handleShow(i) }} >
                                    {element.name}
                                </div>
                                <div className="CategoriesLists" style={{ display: this.state.show === i ? "" : "none" }}>
                                    {element.category.map((el) => {

                                        return (
                                            <div className="CategoriesColumn" >
                                                <h3>{el.name}</h3>
                                                {el.list.map(elem => {
                                                    return (<a href={elem.liink}>{elem.name}</a>)
                                                })}
                                            </div>
                                        )
                                    })
                                    }
                                </div>
                            </div>
                        )
                    })}
                </div>
            )
        }
        const testView=()=>{
            if(window.screen.width >= 1000){
                return regularView()
            }else{
                return mobileView()
            }
            
        }
        return (
            testView()
        )
    }
}
export default CategoriesNav