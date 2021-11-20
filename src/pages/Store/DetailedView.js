import React from 'react'
import ReactDOM from 'react-dom'
import { ToastProvider, useToasts } from 'react-toast-notifications'
import NotificationSystem from 'react-notification-system'
import Header from '../../components/Header'
import SideBar from '../../components/SideBar'
import Tag from '../Containers/Tag'
import Slider from '../Containers/Slider'
import OfferTab from '../Containers/OfferTab'
import ItemCardView from '../Containers/ItemCardView'
import ItemFullView from '../Containers/ItemFullView'

import { connect } from 'react-redux'
import { fetchStoreItems } from '../../services/store/action'
import { addToCart, setCart } from '../../services/cart/actions'
import ROUTE from '../../config/route'
import FooterBar from '../Containers/FooterBar'
import Category from '../Containers/Category'
import domain from '../../config/api/domain'
import Customization from '../Containers/Customization'
import PriceRender from '../Containers/PriceRender'
import { NavLink, Route, BrowserRouter } from 'react-router-dom'
import ItemHeader from '../../components/item-header'
let storeId = null
var style = {
  NotificationItem: {
    // Override the notification item
    DefaultStyle: {
      // Applied to every notification, regardless of the notification level
      margin: '10px 5px 2px 1px',
      background: '#fff',
    },
    success: {
      color: 'black',
    },
  },
}
class DetailedView extends React.Component {
  state = {
    product: {},
    product_url_id: null,
  }
  notificationSystem = React.createRef()

  componentWillMount() {
    storeId = this.props.match.params.store_id
    localStorage.setItem('storeId', storeId)
    let cartData = JSON.parse(localStorage.getItem('cartData'))
    let data = {
      view_id: storeId,
    }
    this.props.fetchStoreItems(data)
  }
  componentDidUpdate(prevProps) {
    if (
      this.props.match.params.product_id !== prevProps.match.params.product_id
    ) {
      let data = {
        view_id: storeId,
      }
      this.props.fetchStoreItems(data)
    }
  }

  componentWillReceiveProps(nextProps) {
    this.updateParam(nextProps)
    if (nextProps.cart !== this.props.cart) {
      //    localStorage.setItem("cartData",JSON.stringify(nextProps.cart))
    }
  }
  updateParam = (nextProps) => {
    let DetailedItem = nextProps.products.filter(
      (data) => data.id === this.props.match.params.product_id
    )
    this.setState({ product: DetailedItem })
  }
  addToCart = (id, isCustomizable, index) => {
    if (!isCustomizable) this.AddToCart(id)
    else {
      document.getElementById(`#customization-${id}-${index}`).click()
    }
  }
  AddToCart = (id, addon = null, extra = null) => {
    let { translation } = this.props
    const notification = this.notificationSystem.current
    notification.addNotification({
      message: translation?.item_add_to_cart || 'Item Added To Cart',
      level: 'success',
    })
    let data = {
      _id: Date.now(),
      storeId: storeId,
      itemId: id,
      count: 1,
      addon: addon,
      extra: extra,
    }
    this.props.addToCart(data)
  }

  render() {
    let {
      store_name,
      description,
      sliders,
      recommendedItems,
      account_info,
      categories,
      products,
      translation,
    } = this.props
    let currency = account_info ? account_info.currency_symbol : '₹'
    return (
      <div>
        <ItemHeader
          onClick={() => window.history.back(-1)}
          title={translation?.back_to_menu || 'Back'}
        />

        <div className='card1'>
          <div className='header'>
            {/* <SideBar active="Home" store_id={storeId}/>*/}
            <NotificationSystem ref={this.notificationSystem} style={style} />

            <img
              src={`${domain.url}/${
                this.state?.product[0]?.image_url != null
                  ? this.state?.product[0]?.image_url
                  : 'themes/default/images/all-img/empty.png'
              }`}
              alt='Responsive image'
              width='100%'
              style={{ marginBottom: '00px' }}
            />
          </div>
        </div>

        <div className='fixed-bottom-padding'>
          <div className='px-3 pb-3 descdeatils'>
            <div className='px-3 pt-3'>
              <div
                style={{
                  display: 'flex',
                  alignContent: 'flex-start',
                }}
              >
                <h2 className='font-weight-bold'>
                  {this.state?.product[0]?.name[translation?.language_name]}
                </h2>
              </div>
              <p className='font-weight-light text-dark m-0 d-flex align-items-center'>
                {this.state?.product[0]?.addon_items &&
                this.state?.product[0]?.addon_items.length ? (
                  <span className='badge badge-danger'>
                    {' '}
                    {translation?.customization || 'CUSTOMIZABLE'}{' '}
                  </span>
                ) : null}

                <span className='badge badge-danger ml-2'>
                  {this.state?.product[0]?.is_active
                    ? translation?.available || 'AVAILABLE'
                    : translation?.not_available || 'NOT AVAILABLE'}
                </span>
                {this.state?.product[0]?.is_recommended === 1 ? (
                  <span className='badge badge-success ml-2'>
                    {' '}
                    {translation?.recommended || 'RECOMMENDED'}
                  </span>
                ) : null}
              </p>
              <a href='#'>
                <div className='rating-wrap d-flex align-items-center mt-2'></div>
              </a>
              <p
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                <div>{translation?.menu_mrp || 'MRP'} : &nbsp;</div>
                <div>
                  <b className='font-weight-bold'>
                    {this.state?.product[0]?.addon_items[0]?.categories[0]
                      ?.type === 'SNG' ? (
                      <PriceRender
                        currency={currency ? currency : '₹'}
                        price={
                          this.state?.product[0]?.addon_items[0]?.categories[0]
                            .addons[0].price
                        }
                      />
                    ) : (
                      <PriceRender
                        currency={currency ? currency : '₹'}
                        price={this.state?.product[0]?.price}
                      />
                    )}
                  </b>
                </div>
              </p>
            </div>
            <div className='px-3 pb-3'>
              <div className='row'>
                {this.state?.product[0]?.cooking_time !== 0 ? (
                  <div className='col-6'>
                    <p
                      style={{ display: 'flex' }}
                      className='font-weight-bold m-0'
                    >
                      {' '}
                      {translation?.cooking_time || 'Cooking Time'}
                    </p>
                    <p style={{ display: 'flex' }} className='text-muted m-0'>
                      {this.state?.product[0]?.cooking_time}{' '}
                      {translation?.cooking_time_unit || 'Minute'}{' '}
                    </p>
                  </div>
                ) : null}
              </div>
            </div>

            <div className=''>
              <div className='p-3'>
                <p
                  className='font-weight-bold mb-2'
                  style={{ textAlign: 'center' }}
                >
                  {' '}
                  {translation?.menu_product_details || 'Product Details'}
                </p>
                <p
                  style={{
                    textAlign: 'center',
                    wordWrap: 'break-word',
                  }}
                  className='text-muted small'
                >
                  {this.state?.product[0]?.description}
                </p>
              </div>
            </div>
          </div>

          <div className='osahan-product'>
            <div className='product-details'>
              {this.props.is_accept_order ? (
                <div className='fixed-bottom pd-f bg-white d-flex align-items-center border-top'>
                  <NavLink
                    to={`${ROUTE.STORE.INDEX.PAGES.CART.PATH}/${storeId}`}
                    className='btn-dark py-3 px-5 h4 m-0'
                  >
                    <i className='icofont-cart'></i>
                  </NavLink>
                  <a
                    onClick={() =>
                      this.addToCart(
                        this.state?.product[0]?.id,
                        this.state?.product[0]?.addon_items &&
                          this.state?.product[0]?.addon_items.length,
                        'DL'
                      )
                    }
                    className='btn btn-danger text-white btn-block'
                  >
                    {translation?.menu_add_to_cart || 'Add To Cart'}
                  </a>
                </div>
              ) : null}
            </div>
          </div>
          <div>
            <div className='title d-flex align-items-center mb-3 mt-3 px-3'>
              <h6 className='m-0'>
                {translation?.menu_maybe_you_likethis || 'Maybe You Like this.'}
              </h6>
            </div>
            <div className='pick_today px-3'>
              <div className='row pt-3'>
                {recommendedItems
                  ? recommendedItems.map((data, index) => (
                      <ItemFullView
                        key={index}
                        index={index}
                        addon={data?.addon_items}
                        more={`${ROUTE.STORE.INDEX.PAGES.DETAILED.PATH}/${storeId}/product/details/${data.id}`}
                        name={data.name[translation?.language_name]}
                        IsRecommended={data.is_recommended}
                        IsAddToEnable={this.props.is_accept_order}
                        AddToCart={this.AddToCart}
                        currency={currency}
                        price={data.price}
                        photo={data.image_url}
                        id={data.id}
                        description={data.description}
                        translation={translation}
                      />
                    ))
                  : null}
              </div>
            </div>
          </div>
        </div>
        <Customization
          index={'DL'}
          translation={translation}
          currency={currency ? currency : '₹'}
          SaveAddon={this.AddToCart}
          addon={this.state?.product[0]?.addon_items}
        />
      </div>
    )
  }
}

const mapSateToProps = (state) => ({
  store_name: state.store.store_name,
  description: state.store.description,
  sliders: state.store.sliders,
  recommendedItems: state.store.recommendedItems,
  account_info: state.store.account_info,
  categories: state.store.categories,
  products: state.store.products,
  cart: state.cart.Items,
  is_accept_order: state.store.is_accept_order,
  translation: state.translation?.active?.data,
})
export default connect(mapSateToProps, { fetchStoreItems, addToCart, setCart })(
  DetailedView
)
