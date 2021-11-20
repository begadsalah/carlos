import React from 'react'
/*import ReactDOM from 'react-dom'*/
/*import { ToastProvider, useToasts } from 'react-toast-notifications'*/
import NotificationSystem from 'react-notification-system'
import Header from '../../components/Header'
/*import SideBar from '../../components/SideBar'*/
import Tag from '../Containers/Tag'
import Slider from '../Containers/Slider'
/*import OfferTab from '../Containers/OfferTab'*/
import ItemCardView from '../Containers/ItemCardView'
import ItemFullView from '../Containers/ItemFullView'

import { connect } from 'react-redux'
import {
  fetchStoreItems,
  initial_configuration,
} from '../../services/store/action'
import {
  fetchTranslation,
  fetchAllTranslation,
} from '../../services/languages/actions'
import { addToCart, setCart } from '../../services/cart/actions'
import ROUTE from '../../config/route'
import FooterBar from '../Containers/FooterBar'
import Category from '../Containers/Category'
/*import Customization from '../Containers/Customization'*/
import CallTheWaiter from '../Containers/CallTheWaiter'
import LanguageSwitcher from '../Containers/LanguageSwitcher'
/*import domain from '../../config/api/domain'*/
import Text from '../Containers/Text'
/*import isRtl from '../../bootstrap'*/
import './Store.css'
import Button from 'react-bootstrap/Button'
import SearchIcon from '@mui/icons-material/Search'
let storeId = null

var style = {
  NotificationItem: {
    DefaultStyle: {
      margin: '10px 5px 2px 1px',
      background: '#fff',
    },
    success: {
      color: 'black',
    },
  },
}

class Store extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showCall: false,
    }
  }
  notificationSystem = React.createRef()
  async fetch() {
    storeId = this.props.match.params.id
    localStorage.setItem('storeId', storeId)
    /*let cartData = JSON.parse(localStorage.getItem('cartData'))*/
    let data = {
      view_id: storeId,
    }

    this.props.initial_configuration(this.props)
    this.props.fetchStoreItems(data)
  }
  componentWillMount() {
    this.fetch()
    if (this.props.translation && this.props.translation?.is_rlt_enable) {
    } else {
      document.getElementsByTagName('html')[0].setAttribute('dir', 'rtl')
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

  onCallBack = () =>
    this.setState((state) => ({
      showCall: !state.showCall,
    }))
  render() {
    let {
      store_name,
      description,
      sliders,
      recommendedItems,
      account_info,
      categories,
      /*products,*/
      translation,
      all_Translation,
      active_language_id,
      address,
      logo,
      store_phone,
      /*is_search_enable,*/
      is_call_waiter_enable,
      store_theme,
      /*cities,*/
      is_rlt_enable,
    } = this.props
    let currency = account_info ? account_info.currency_symbol : '₹'
    /*let storecolor = 'red'*/
    let background = store_theme.appcolor ? store_theme.appcolor : ''

    return (
      <div
        style={{
          backgroundColor: background,
        }}
        className='fixed-bottom-padding'
      >
        <div className=''>
          <Header
            translation={translation}
            logo={logo}
            address={address}
            store_phone={store_phone}
            store_name={store_name}
            description={description}
            is_call_waiter_enable={is_call_waiter_enable}
            show={this.state.showCall}
          />
          {/* <SideBar active="Home" store_id={storeId}/>*/}
          <NotificationSystem ref={this.notificationSystem} style={style} />
          {this.props.is_language_enable === 1 ? (
            <div
              className='address'
              style={{
                display: 'flex',
                flexDirection: 'row-reverse',
                justifyContent: 'space-between',
                alignContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgb(250, 100, 0)',
              }}
            >
              <div>
                <span className='m-0 text-dark d-flex align-items-center'>
                  <span className='small ml-auto'>
                    <a
                      href='#'
                      className='font-weight-bold text-decoration-none text-success'
                    >
                      <LanguageSwitcher
                        isRtl={is_rlt_enable}
                        all_translation={all_Translation}
                        active={active_language_id}
                        selectedlanguage={this.props.translation?.language_name}
                        storeId={storeId}
                      />
                    </a>
                  </span>
                </span>
              </div>
              <div>
                <span className='m-0 text-dark d-flex align-items-center'>
                  {/* <Text Key={'select_language'} />*/}
                </span>
              </div>
            </div>
          ) : null}
        </div>
        <Slider translation={translation} sliders={sliders} />
        <div className='osahan-body'>
          {this.props.is_search_enable === 1 ? (
            <div className='col-12 search-col '>
              <div className='search-mock d-flex'>
                <input
                  type='text'
                  id='Search'
                  onKeyUp={() => window.myFunction()}
                  placeholder={
                    translation?.search_products || 'Search for Products..'
                  }
                />
                <Button className='search-mock_button'>
                  <SearchIcon />
                </Button>
                <i
                  style={!is_rlt_enable ? { right: '45px' } : { left: '45px' }}
                  /*className='icofont-search-2'*/
                ></i>
              </div>
            </div>
          ) : null}
          {/*<span className="mb-2 capital"> {translation?.menu_categories||"Categories"}</span>*/}
          <div className='slider-wrapper secondary-slider-wrapper my-20'>
            <Category storeId={storeId} data={this.props?.categories} />
          </div>
          <div className='title d-flex align-items-center   rec_for_you_text'>
            <span className='m-0 capital'>
              {' '}
              {translation?.menu_recommend || 'Recommend for You'}
            </span>
          </div>
          <div className='product-slider'>
            {recommendedItems
              ? recommendedItems.map((data, index) => (
                  <ItemCardView
                    key={index}
                    index={index}
                    translation={translation}
                    addon={data.addon_items}
                    category_id={data.category_id}
                    more={`${ROUTE.STORE.INDEX.PAGES.DETAILED.PATH}/${storeId}/product/details/${data.id}`}
                    name={data.name[translation?.language_name]}
                    IsAddToEnable={this.props.is_accept_order}
                    AddToCart={this.AddToCart}
                    currency={currency}
                    price={data.price}
                    photo={data.image_url}
                    id={data.id}
                    description={data.description}
                  />
                ))
              : null}
          </div>
        </div>

        <div
          style={{
            backgroundColor: background,
          }}
          className='card item-full-bottom-v2'
        >
          {categories
            ? categories.map((category, index) =>
                categories && category?.product_info?.length ? (
                  <div key={index}>
                    <div className='ti  tle d-flex align-items-center mt-3 px-3 search'>
                      <h6 className='m-0 category-name-top-4'>
                        {/*{category.name[translation?.language_name]}*/}
                        Add to your Cart
                      </h6>
                    </div>
                    <div className='pick_today'>
                      <div className=''>
                        {category?.product_info.map((data, index) => (
                          <ItemFullView
                            key={index}
                            index={index}
                            translation={translation}
                            addon={data.addon_items}
                            category_id={data.category_id}
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
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ) : null
              )
            : null}
        </div>
        {/* <button onClick={()=>document.getElementById('#customization').click()}>TEST</button> */}
        <CallTheWaiter
          translation={translation}
          tables={this.props.tables}
          store_id={storeId}
          onCallBack={this.onCallBack}
        />

        {this.props.is_accept_order ? (
          <FooterBar translation={translation} active='home' />
        ) : null}
      </div>
    )
  }
}

const mapSateToProps = (state) => ({
  store_name: state.store.store_name,
  address: state.store.address,
  store_phone: state.store?.store_phone,
  logo: state.store?.logo,
  description: state.store.description,
  sliders: state.store.sliders,
  account_info: state.store.account_info,
  recommendedItems: state.store.recommendedItems,
  categories: state.store.categories,
  products: state.store.products,
  cart: state.cart.Items,
  is_accept_order: state.store.is_accept_order,
  is_table_enable: state.store.is_table_enable,
  is_search_enable: state.store.is_search_enable,
  is_language_enable: state.store.is_language_enable,
  is_whatsappbutton_enable: state.store.is_whatsappbutton_enable,
  store_theme: state.store.store_theme,
  is_call_waiter_enable: state.store?.is_call_waiter_enable,
  tables: state.store.tables,
  is_rlt_enable: state.translation?.active?.is_rlt,
  test_trans: state.translation?.active?.is_rlt,
  translation: state.translation?.active?.data,
  all_Translation: state.translation?.languages,
  active_language_id: state.translation?.active?.id,
  cities: state.store.cities,
})
export default connect(mapSateToProps, {
  initial_configuration,
  fetchStoreItems,
  addToCart,
  setCart,
  fetchTranslation,
  fetchAllTranslation,
})(Store)
