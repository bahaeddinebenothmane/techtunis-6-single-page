import React, { Component } from 'react'
import { Button } from 'react-bootstrap'

class Payment extends Component {
    render() {
        return (
            <div>
                moneeeeeeeeeeeeeeeeeeeey
                <a href="/tunnel/Conformation">
                    <Button onClick={() => { this.props.changeSate("Conformation") }}>
                        Conformation
                    </Button>
                </a>

            </div>
        )
    }
}
export default Payment