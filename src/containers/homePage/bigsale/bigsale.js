import React, { Component } from 'react'
import './bigsale.css'
import { Container, Row, Col } from 'react-bootstrap';

class BigSale extends Component {
    render() {
        const BigSaleView=()=>{
            if(window.screen.width >= 1000){
                return(
                    <Container>
                    {this.props.data.map(element => {
                        return (
                            <Row>
                                {element.map(el => {
                                    return (
                                        <Col xs={12 / element.length}>
                                            <a href={el.link}>
                                                <img className="bigSaleImg" src={el.src} />
                                            </a>
                                        </Col>
                                    )
                                })}
                            </Row>
                        )
                    })}
                </Container>
                )
            }
            else{
                return(
                    <Container>
                    {this.props.data.map(element => {
                        return (
                            <Row>
                                {element.map(el => {
                                    return (
                                        <Row xs={12 / element.length}>
                                            <a href={el.link}>
                                                <img className="bigSaleImg" src={el.src} />
                                            </a>
                                        </Row>
                                    )
                                })}
                            </Row>
                        )
                    })}
                </Container>
                )
            }
            
        }
        return (
            BigSaleView()
        )
    }
}
export default BigSale