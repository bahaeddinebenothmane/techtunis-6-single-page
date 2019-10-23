import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Badge } from "react-bootstrap"
import ShoppingCart from "../../tunnel/shopping cart/shoppingCart"
import './fixedDownBar.css'
import ListCard from '../../productListe/productListViewer/grid/cards/listCard'
import DetailLight from '../../common/detailLight/index'
import { removeItemWishList } from '../../../store/actions/wishList'
import { removeItemComparateur } from '../../../store/actions/comparateur'

class FDBmobile extends Component {
    state = {
        show: false
    }
    render() {
        const { products, items, Comparateurproducts } = this.props
        return (
            <div className="FixedDownBarMobile"  >
                <div  >
                    <div className="FixedDownBarProductswishListe FixedDownBarList" style={{ position: "relatif", display: this.state.show === "wishListe" ? "" : "none" }}>
                        <Badge style={{ position: "absolute", top: "0px", right: "0px", zIndex: "2" }}
                            variant="danger" onClick={() => { this.setState({ show: "" }) }}>
                            X
                    </Badge>
                        {products.map((el, i) => {
                            return (
                                <DetailLight cardIndex={i} handleRemove={this.props.removeItemWishList} data={el} cardType="wishList" />
                            )
                        })}
                    </div>
                    <div className="FixedDownBarProductspanier FixedDownBarList" style={{ position: "relatif", display: this.state.show === "panier" ? "" : "none" }}>
                        <Badge style={{ position: "absolute", top: "0", right: "0", zIndex: "2" }} variant="danger" onClick={() => { this.setState({ show: "" }) }}>X</Badge>
                        {items.map((el, i) => {
                            return (
                                <DetailLight data={el} cardIndex={i} cardType="shoppingPannier" />
                            )
                        })}
                    </div>
                    <div className="FixedDownBarProductsComparateur FixedDownBarList" style={{ position: "relatif", display: this.state.show === "comparateur" ? "" : "none" }}>
                        <Badge style={{ position: "absolute", top: "0", right: "0", zIndex: "2" }} variant="danger" onClick={() => { this.setState({ show: "" }) }}>X</Badge>
                        {Comparateurproducts.map((el, i) => {
                            return (
                                <DetailLight handleRemove={this.props.removeItemComparateur} data={el} cardIndex={i} cardType="wishList" />
                            )
                        })}
                    </div>
                    <div className="FixedDownBarButtonsMobile " >
                        <table style={{textAlign:"center",width:"100%"}}>
                            <tbody>
                                <tr>
                                    <td>
                                        <div style={{ position: "relative" }} onClick={() => { this.setState({ show: this.state.show === "Derniers" ? "" : "Derniers" }) }}>
                                            <span style={{ fontSize: "14px" }}>
                                                Derniers produits vus
                                                <Badge variant="danger">{0}</Badge>
                                            </span>
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{ position: "relative" }}
                                            onClick={() => { this.setState({ show: this.state.show === "wishListe" ? "" : "wishListe" }) }}>
                                            <span style={{ fontSize: "14px" }}>
                                                Ma liste d'envies
                            <Badge variant="danger">{this.props.wishListItemsNumber}</Badge>
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div style={{ position: "relative" }} onClick={() => { this.setState({ show: this.state.show === "comparateur" ? "" : "comparateur" }) }}>
                                            <span style={{ fontSize: "14px" }}>
                                                comparateur
                            <Badge variant="danger">{this.props.comparateurItemsNumber}</Badge>
                                            </span>
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{ position: "relative" }} onClick={() => { this.setState({ show: this.state.show === "panier" ? "" : "panier" }) }}>
                                            <span style={{ fontSize: "14px" }}>
                                                panier
                            <Badge variant="danger">{this.props.totalitems}</Badge>
                                            </span>
                                        </div>
                                    </td>

                                </tr>

                            </tbody>
                        </table>




                    </div>
                </div>


            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        products: state.WishListReducer.products,
        wishListItemsNumber: state.WishListReducer.wishListItemsNumber,
        totalitems: state.ShoppingCartReducer.totalitems,
        items: state.ShoppingCartReducer.items,
        Comparateurproducts: state.ComparateurReducer.Comparateurproducts,
        comparateurItemsNumber: state.ComparateurReducer.comparateurItemsNumber,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        removeItemWishList: (index) => dispatch(removeItemWishList(index)),
        removeItemComparateur: (index) => dispatch(removeItemComparateur(index)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FDBmobile)