import React from 'react'
import ReactDOM from 'react-dom'
import Loader from './components/Loader/Index'
import pages from './pages'
import { Page } from './route'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { addToCart, setCart } from './services/cart/actions'
import { connect } from 'react-redux'
import store from './services/store'
import domain from './config/api/domain'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore, persistReducer } from 'redux-persist'
import { saveToLocalStorage, loadFromStorage } from './helpers/localStorage'
import rtlCSSJS from 'rtl-css-js'
import './assets/vendor/slick/slick.min.css'
import './assets/vendor/slick/slick-theme.min.css'
import './assets/vendor/icons/icofont.min.css'
import './assets/vendor/bootstrap/css/bootstrap.min.css'
import './assets/css/custom_style.css'
// import "./config/css/rlt.css";
import './assets/vendor/sidebar/demo.css'
const persistedStore = persistStore(store)

class Root extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLogin: false,
      gateLifted: false,
    }
  }
  onBeforeLift = () => {
    setTimeout(() => {
      this.setState({ gateLifted: true })
      saveToLocalStorage('first_load', true)
    }, 1000)
  }
  FirstLoad = () => {
    return !loadFromStorage('first_load')
  }
  render() {
    return (
      <Provider store={store}>
        <PersistGate
          persistor={persistedStore}
          onBeforeLift={this.onBeforeLift}
        >
          {!this.state.gateLifted && this.FirstLoad() ? <Loader /> : <Page />}
        </PersistGate>
      </Provider>
    )
  }
}
const mapSateToProps = (state) => ({
  cart: state.cart.Items,
})
export default Root

if (document.getElementById('root')) {
  ReactDOM.render(<Root />, document.getElementById('root'))
}
