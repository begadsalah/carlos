import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { addToCart } from '../../services/cart/actions'
import domain from '../../config/api/domain'
import Customization from './Customization'
import PriceRender from './PriceRender'
import { NavLink, Route } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import AddCircleIcon from '@mui/icons-material/AddCircle'
const ItemFullView = (props) => {
  let {
    name,
    price,
    photo,
    id,
    description,
    currency,
    category_id,
    addon,
    translation,
  } = props
  let addToCart = (id, isCustomizable, index) => {
    if (!isCustomizable) props.AddToCart(id)
    else {
      document.getElementById(`#customization-${id}-` + `${index}`).click()
    }
  }
  const SaveAddon = (product_id, addon_id, extra) =>
    props.AddToCart(product_id, addon_id, extra)
  return (
    <div
      className='col-6 col-xs-6 col-sm-6 col-md-4 col-lg-4 col-xl-3'
      id={`category-${category_id}`}
    >
      <Card className='addItem_card'>
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>
            <p className='total_price tot_price font-weight-bold m-0'>
              {addon &&
              addon.length &&
              addon[0]?.categories[0]?.type === 'SNG' ? (
                <div className='item-price m-0 text-dark'>
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
            <div className='item_state'>
              <div
                style={{
                  paddingRight: '5px',
                  paddingLeft: '5px',
                }}
              >
                {props.IsRecommended === 1 ? (
                  <span className='mb-2 item-badge-v2'>
                    {translation?.menu_rec || 'REC'}
                  </span>
                ) : null}
              </div>
              <NavLink to={props.more} className='text-dark'>
                {addon && addon.length ? (
                  <span className='item-badge2-v2 margin-left-v2 '>
                    {translation?.menu_custom || 'CUSTOM'}
                  </span>
                ) : (
                  <div className='item-price item_price m-0 text-light'></div>
                )}
              </NavLink>
            </div>

            <div></div>
          </Card.Text>
          <NavLink to={props.more}>
            <Card.Img
              variant='top'
              /*src={`${domain.url}/${
                photo != null ? photo : 'themes/default/images/all-img/empty.png'
                }`}*/
              src='https://images.unsplash.com/photo-1543573852-1a71a6ce19bc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
              alt={name}
            />
          </NavLink>
          <div>
            {props.IsAddToEnable === 1 ? (
              <div className='ml-auto addToCart_div'>
                <a
                  onClick={() =>
                    addToCart(id, addon && addon.length, props.index)
                  }
                  className='btn btn-new-v2'
                >
                  <AddCircleIcon className='addToCart_icon' />
                </a>
              </div>
            ) : null}
          </div>
        </Card.Body>
      </Card>
      {/*<div
        style={{
          flex: 1,
          display: 'flex',
        }}
        className='cart-items  position-relative border-bottom search'
      >
        <div className='d-flex align-items-center mb-2 ' style={{ flex: 1 }}>
          <NavLink to={props.more}>
            <img
              /*src={`${domain.url}/${
                photo != null
                  ? photo
                  : 'themes/default/images/all-img/empty.png'
              }`}
              src='https://images.unsplash.com/photo-1543573852-1a71a6ce19bc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
              className='list-card-image-v2'
              alt={name}
            />
          </NavLink>
        </div>
        <div
          style={{
            flex: 4,
            paddingRight: '10px',
            paddingLeft: '10px',
            alignItems: 'flex-start',
            display: 'flex',
          }}
        >
          <a className='ml-3 text-light text-decoration-none w-100'>
            <div
              className='item-name'
              style={{
                display: 'flex',
                alignSelf: 'flex-start',
              }}
            >
              {name}
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
              }}
            >
              <div
                style={{
                  paddingRight: '5px',
                  paddingLeft: '5px',
                }}
              >
                {props.IsRecommended === 1 ? (
                  <span className='mb-2 item-badge-v2'>
                    {translation?.menu_rec || 'REC'}
                  </span>
                ) : null}
              </div>
              <div>
                <NavLink to={props.more} className='text-light'>
                  {addon && addon.length ? (
                    <span className='item-badge2-v2 margin-left-v2 '>
                      {translation?.menu_custom || 'CUSTOM'}
                    </span>
                  ) : (
                    <div className='item-price m-0 text-light'></div>
                  )}
                </NavLink>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
              className='d-flex align-items-center'
            >
              <div>
                <p className='total_price font-weight-bold m-0'>
                  {addon &&
                  addon.length &&
                  addon[0]?.categories[0]?.type === 'SNG' ? (
                    <div className='item-price m-0 text-light'>
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
              </div>
              <div>
                {props.IsAddToEnable === 1 ? (
                  <div className='ml-auto'>
                    <a
                      onClick={() =>
                        addToCart(id, addon && addon.length, props.index)
                      }
                      className='btn btn-new-v2'
                    >
                      +
                    </a>
                  </div>
                ) : null}
              </div>
            </div>
          </a>
        </div>
      </div>*/}
      {addon && addon !== undefined ? (
        <Customization
          index={props.index}
          currency={currency ? currency : '₹'}
          SaveAddon={SaveAddon}
          addon={addon}
        />
      ) : null}
    </div>
  )
}

export default ItemFullView
