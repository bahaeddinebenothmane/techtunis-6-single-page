import React, { Component } from 'react';
import Searchbar from './searchbar/searchbar'
import GenericForme from '../../dataTable/genericForm/genericform'
import { Modal, DropdownButton, Dropdown, Badge, Navbar, Form, Button, Nav, NavDropdown, OverlayTrigger, Overlay } from 'react-bootstrap';
import { connect } from 'react-redux'
import './navbar.css'
import { userLogin } from '../../../store/actions/login'
import { userSignup } from '../../../store/actions/signup'
import SidebarMobile from '../../productDetailsPage/sidebar/sidebarMobileEX'
let signupData = [
  {
    type: "input",
    inputType: "email",
    label: "email"
  },
  {
    type: "input",
    inputType: "password",
    label: "password"
  },
  {
    type: "input",
    inputType: "password",
    label: "conform password"
  }
]
let loginData = [
  {
    type: "input",
    inputType: "email",
    label: "email"
  },
  {
    type: "input",
    inputType: "password",
    password: "password"
  }
]
class NavBar extends Component {
  state = {
    showSignUP: false,
    showLogIn: false,
  }


  render() {

    const { showLogIn, showSignUP } = this.state;
    const LoginPopover = (
      <Modal show={showLogIn} onHide={() => { this.setState({ showLogIn: false }) }}>
        <GenericForme modifiefunction={(data) => { this.props.userLogin(data); this.setState({ showLogIn: false }) }} data={loginData} />
        <Modal.Footer>
          <Button onClick={() => { this.setState({ showLogIn: false }) }} variant="danger">Close</Button>
        </Modal.Footer>
      </Modal>
    )
    const signupPopover = (
      <Modal show={showSignUP} onHide={() => { this.setState({ showSignUP: false }) }}>
        <GenericForme modifiefunction={(data) => { this.props.userSignup(data); this.setState({ showSignUP: false }) }} data={signupData} />
        <Modal.Footer>
          <Button onClick={() => { this.setState({ showSignUP: false }) }} variant="danger">Close</Button>
        </Modal.Footer>
      </Modal>
    )
    const WhenConnected = (
      <Form inline style={{ display: !this.props.isConnected ? "" : "none" }} >
        <Button
          variant="danger"
          className="signUpButton"
          size="sm"
          variant="outline-primary"
          onClick={() => this.setState({ showSignUP: true })}
        >
          Sign up
        </Button>
        {signupPopover}

        <Button
          variant="outline-success"
          size="sm"
          onClick={() => this.setState({ showLogIn: true })}
        >
          Log in
        </Button>
        {LoginPopover}

      </Form>
    )
    const WhenDisconnected = (
      <Form inline style={{ display: this.props.isConnected ? "" : "none" }}>
        <a className="ShoppingCartIcon" href="ShoppingCart">
          <i class='fas fa-shopping-cart'></i>
          <Badge className="ShoppingCarBadge" variant="danger">{this.props.totalitems}</Badge>
        </a>
        <a href={""} className="identificationIcon">
          <i class='far fa-address-card'></i>
        </a>
      </Form>
    )
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse  >
          <Nav >
            {this.props.data.map(el => {
              switch (el.type) {
                case "link":
                  return (
                    <Nav.Link>
                      <a style={{ textDecoration: "none" }} href={el.adresee}>
                        {el.name}
                      </a>
                    </Nav.Link>
                  )
                case "dropdown":
                  return (
                    <NavDropdown title={el.name} id="basic-nav-dropdown">
                      {el.childrens.map(element => {
                        return <NavDropdown.Item href={element.adresee}>{element.name}</NavDropdown.Item>
                      })}
                    </NavDropdown>
                  )
                case "logo":
                  return (
                    <Navbar.Brand  >
                      <a href="/">
                        <img alt={el.name} src={el.src} width="50" />
                      </a>
                    </Navbar.Brand>
                  )
                case "icon":
                  return (
                    <div>
                      <img src={el.src} width="20" />
                      <h6>
                        <Badge variant="secondary">
                          {el.name}
                        </Badge>
                      </h6>
                    </div>)
                default:
                // code block
              }
            })}
          </Nav>
          <Searchbar />
          <div className="navbarButtons" style={{ position: window.screen.width < 1000 ? "relative" : "absolute" }}>
            {WhenConnected}
            {WhenDisconnected}
          </div>
          {window.screen.width < 1000 ? <SidebarMobile data={this.props.CategorieTab} /> : <span />}
        </Navbar.Collapse>
      </Navbar>

    )

  }
}
const mapStateToProps = (state) => {
  return {
    isConnected: state.currentUserReducer.isConnected,
    totalitems: state.ShoppingCartReducer.totalitems,
    CategorieTab: state.MegaMenuReducers.CategorieTab

  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    userLogin: (user) => dispatch(userLogin(user)),
    userSignup: (newuser) => dispatch(userSignup(newuser))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(NavBar);