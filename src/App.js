import React, { Component } from 'react';
import './App.css';

import { Route, BrowserRouter, Switch } from "react-router-dom";
import { Container } from 'react-bootstrap';

import Homepage from './containers/homePage'
import Common from './containers/common'
import Tunnel from './containers/tunnel'
import Productdetail from './containers/productDetailsPage'
import ProductListe from './containers/productListe'
import DataTable from './containers/dataTable'

class App extends Component {
  render() {
    return (
      <Container>
        <Homepage />
        {/* <DataTable /> */}
        {/* <ProductListe /> */}
        {/* <Productdetail /> */}
        {/* <Tunnel /> */}
      </Container>
    )
  }
}


export default App;
