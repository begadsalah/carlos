import React from 'react'
import ReactDOM from 'react-dom'
import { NavLink, Route } from 'react-router-dom'
import ROUTE from '../../config/route'
class FooterBar extends React.Component {
  state = {
    isSideBarOpen: false,
    store_id: null,
  }
  componentWillMount() {
    this.setState({ store_id: localStorage.getItem('storeId') })
  }
  closeSideBar = (value) => {
    this.setState({ isSideBarOpen: !value })
    document.body.classList.add('sidemenu-open')
  }
  render() {
    let { store_name, description, active, cart, translation } = this.props
    let { store_id } = this.state
    return (
      //     <div class="content pt-10 py-5 font-size-xs clearfix footer-fixed">

      //     <a
      //     href={`${ROUTE.STORE.INDEX.PAGES.VIEW.PATH}/${store_id}`}
      //     className="col footer-links px-2 py-1"><i
      //         class="si si-home fa-2x"></i> <br/><span
      //         className={active==="home"?"active-footer-tab":""}
      //         >Home</span></a>

      //     <a href={`${ROUTE.ACCOUNT.ORDERS.PAGES.VIEW.PATH}`} className="col footer-links px-2 py-1"><i className="si si-printer fa-2x"></i> <br/><span
      //          className={active==="orders"?"active-footer-tab":""}>View Order</span></a>
      //     <a href={`${ROUTE.STORE.INDEX.PAGES.CART.PATH}/${store_id}/`}className="col footer-links px-2 py-1" ><i className="si si-handbag fa-2x"></i>
      //         <br/><span
      //           className={active==="cart"?"active-footer-tab":""}
      //         >Cart</span></a>
      // </div>

      <div className='osahan-menu-fotter fixed-bottom bg-white text-center border-top new-menu-fotter shadow'>
        <div className='row m-0'>
          <NavLink
            to={`${ROUTE.STORE.INDEX.PAGES.VIEW.PATH}/${store_id}`}
            className={
              active === 'home'
                ? 'text-dark small col font-weight-bold text-decoration-none p-2 selected'
                : 'text-dark small col font-weight-bold text-decoration-none p-2'
            }
          >
            <p className='h5 m-0'>
              <i className='icofont-spoon-and-fork'></i>
            </p>
            {translation?.menu || 'Menu'}
          </NavLink>
          <NavLink
            to={`${ROUTE.STORE.INDEX.PAGES.CART.PATH}/${store_id}`}
            className={
              active === 'cart'
                ? 'text-dark small col font-weight-bold text-decoration-none p-2 selected'
                : 'text-dark small col font-weight-bold text-decoration-none p-2'
            }
          >
            <p className='h5 m-0'>
              <i className='icofont-cart'></i>
            </p>
            {translation?.cart || 'Cart'}
          </NavLink>

          <NavLink
            to={`${ROUTE.ACCOUNT.ORDERS.PAGES.VIEW.PATH}`}
            className={
              active === 'orders'
                ? 'text-dark small col font-weight-bold text-decoration-none p-2 selected'
                : 'text-dark small col font-weight-bold text-decoration-none p-2'
            }
          >
            <p className='h5 m-0'>
              <i className='icofont-paper'></i>
            </p>
            {translation?.my_order || 'My Order'}
          </NavLink>

          {/* <a href="my_account.html" class="text-muted small col text-decoration-none p-2">
            <p class="h5 m-0"><i class="icofont-user"></i></p>
            Account
        </a> */}
        </div>
      </div>
    )
  }
}

export default FooterBar
