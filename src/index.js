import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';

import menuReducers from './store/reducers/menuReducers'
import productReducer from './store/reducers/productReducer'
import FooterReducer from './store/reducers/footerReducer'
import discountProductReducer from './store/reducers/discountProductReducer'
import sidemenuReducer from './store/reducers/sidemenuReducer'
import BigSaleSRCReducer from './store/reducers/bigsaleReducer'
import CarouselPhotoReducer from './store/reducers/CarouselPhotoReducer'
import ProductImagelistReducer from './store/reducers/ProductImage'
import currentUserReducer from './store/reducers/currentUserReducer'
import filterReducer from './store/reducers/filterReducer'
import MegaMenuReducers from './store/reducers/megaMenu'
import WishListReducer from './store/reducers/wishListReducer'
import "react-alice-carousel/lib/alice-carousel.css";
import DataTableReducer from './store/reducers/dataTableReducer'
import ShoppingCartReducer from './store/reducers/shoppingCart'
import ComparateurReducer from './store/reducers/comparateurReducer'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';

import * as serviceWorker from './serviceWorker';
import 'react-bootstrap';

const rootReducer = combineReducers({
    menuReducers,
    productReducer,
    FooterReducer,
    discountProductReducer,
    sidemenuReducer,
    BigSaleSRCReducer,
    CarouselPhotoReducer,
    ProductImagelistReducer,
    currentUserReducer,
    MegaMenuReducers,
    DataTableReducer,
    ShoppingCartReducer,
    filterReducer,
    WishListReducer,
    ComparateurReducer
})
const logger = store => {
    return next => {
        return action => {
            console.log('[Middleware] Dispatching', action);
            const result = next(action);
            console.log('[Middleware] next state', store.getState());
            return result;
        }
    }
};
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger, thunk)));
ReactDOM.render(
                <Provider store={store}>
                    <App />
                </Provider>,
                document.getElementById('root')
            );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
