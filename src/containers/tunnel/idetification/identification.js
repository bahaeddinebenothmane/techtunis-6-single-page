import React, { Component } from 'react'
import { Button } from 'react-bootstrap'

class Identification extends Component {
    render() {
        return (
            <div>
                are you you
                <a href="/tunnel/Shipping">
                    <Button onClick={() => { this.props.changeSate("Shipping") }}>
                        Shipping
                    </Button>
                </a>

            </div>
        )
    }
}
export default Identification