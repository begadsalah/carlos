import React from 'react'
import ReactDOM from 'react-dom'
import domain from '../../config/api/domain'
import Customization from './Customization'
import PriceRender from './PriceRender'
import { NavLink, Route } from 'react-router-dom'
const ItemCardView = (props) => {
  let {
    name,
    price,
    photo,
    id,
    description,
    currency,
    AddToCart,
    category_id,
    addon,
    translation,
  } = props

  let addToCart = (id, isCustomizable) => {
    if (!isCustomizable) props.AddToCart(id)
    else {
      document.getElementById(`#customization-${id}`).click()
    }
  }
  const SaveAddon = (product_id, addon_id, extra) => {
    props.AddToCart(product_id, addon_id, extra)
  }
  return (
    <div className='product-slider-item'>
      <div className='block1 border-radius-275 recommended-item-shadow search'>
        <div className='block-content1 recommended-item-content rec-v2-1'>
          <NavLink to={props.more}>
            <img
              /*src={`${domain.url}/${
                photo != null
                  ? photo
                  : 'themes/default/images/all-img/empty.png'
              }`}*/
              alt={name}
              className='recommended-item-image'
              src='https://images.unsplash.com/photo-1588315028878-92dbfa910f6a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80'
            />
          </NavLink>
          <div className='my-2 recommended-item-meta'>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <div className='d-flex align-items-center'>
                <span className='m-0 product-title-v2'>{name}</span>
              </div>
            </div>
            <div className='d-flex align-items-center recc_product_state'>
              <p className='total_price font-weight-bold m-0'>
                {addon &&
                addon.length &&
                addon[0]?.categories[0]?.type === 'SNG' ? (
                  <div className='item-price m-0 text-darker'>
                    <PriceRender
                      currency={currency ? currency : '₹'}
                      price={addon[0]?.categories[0]?.addons[0]?.price}
                    />
                  </div>
                ) : (
                  <div className='item-price m-0 text-darker'>
                    <PriceRender
                      currency={currency ? currency : '₹'}
                      price={price}
                    />
                  </div>
                )}
              </p>
              <div className='d-flex align-items-center'>
                {addon && addon.length ? (
                  <span className='item-badge2-v2 margin-left-v2 ml-auto'>
                    {translation?.menu_custom || 'CUSTOMIZABLE'}{' '}
                  </span>
                ) : (
                  <span></span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Customization currency={currency ? currency : "₹"} SaveAddon={SaveAddon} addon={addon} /> */}
    </div>
  )
}
export default ItemCardView
