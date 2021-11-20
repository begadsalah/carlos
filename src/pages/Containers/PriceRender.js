import React from 'react'
import ReactDOM from 'react-dom'
import ROUTE from '../../config/route'
import domain from '../../config/api/domain'
import { connect } from 'react-redux'
const PriceRender = (props) => {
  let { currency_location } = props
  let price = Number(props.price).toFixed(2)
  if (currency_location === 'right') {
    return (
      <price>
        {price} {props.currency}
      </price>
    )
  } else {
    return (
      <price>
        {props.currency} {price}
      </price>
    )
  }
}

const mapSateToProps = (state) => ({
  account_info: state.store.account_info,
  currency_location: state.store?.account_info?.currency_symbol_location,
  currency: state.store?.account_info?.currency_symbol,
})

export default connect(mapSateToProps, {})(PriceRender)
