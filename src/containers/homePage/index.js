import React, { Component } from 'react'
import BigSale from './bigsale/bigsale'
import CarousalProduct from './Carousel/CarausalProduct'
import CarouselPhoto from './Carousel/carousalPhoto'
import NavBar from '../common/navbar/navbar'
import Footer from '../common/footer/footer'
import CategoriesNav from '../common/cleanNav/categoriesNav'
import { connect } from 'react-redux'
import { Container } from 'react-bootstrap';
import FixedDownBar from '../common/fixed down bar/fixedDownBar'
import Sidebar from './../productDetailsPage/sidebar/sidebar'
class Homepage extends Component {
  render() {
    const { discountProduct, BigSaleSRC, CarouselPhotos, CategorieTab, menu, footer } = this.props
    return (
      <div>
        <NavBar data={menu} />
        {window.screen.width >= 1000?<CategoriesNav data={CategorieTab} />:<Sidebar menu={menu} data={CategorieTab} />}
        <BigSale data={BigSaleSRC} />
        <CarousalProduct data={discountProduct} />
        <CarouselPhoto data={CarouselPhotos} />
        <FixedDownBar />
        <Footer data={footer} />
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    discountProduct: state.discountProductReducer.discountProduct,
    BigSaleSRC: state.BigSaleSRCReducer.BigSaleSRC,
    CarouselPhotos: state.CarouselPhotoReducer.CarouselPhoto,
    menu: state.menuReducers.menu,
    footer: state.FooterReducer.footer,
    CategorieTab: state.MegaMenuReducers.CategorieTab
  }
}
export default connect(mapStateToProps)(Homepage)