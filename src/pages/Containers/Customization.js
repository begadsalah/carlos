import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import domain from '../../config/api/domain'
import { connect } from 'react-redux'
import useDynamicRefs from 'use-dynamic-refs'
import PriceRender from './PriceRender'
import { CustomizationItem } from './Customization_item'
import $ from 'jquery'
const Customization = (props) => {
  let { addon, translation } = props
  const [extraAddon, setExtraAddon] = useState([])
  const [Addon, setAddon] = useState(null)
  const [getRef, setRef] = useDynamicRefs()
  let saveAddon = (product_id, type) => {
    if (type === 'SNG' && Addon === null) {
      let extra = extraAddon.filter((data) => data.count !== 0)
      props.SaveAddon(product_id, addon[0]?.categories[0]?.addons[0]?.id, extra)
      setExtraAddon([])
    } else {
      let extra = extraAddon.filter((data) => data.count !== 0)
      props.SaveAddon(product_id, Addon, extra)
      setExtraAddon([])
    }
    $(document).ready(function () {
      $('form').each(function () {
        this.reset()
      })
    })
    setAddon(null)
  }
  //

  if (addon) {
    return (
      <div
        className='modal fade'
        id={`customization-${addon[0]?.product_id}-${props.index}`}
        tabIndex='-1'
        role='dialog'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
      >
        <form id={`customization-form-${addon[0]?.product_id}-${props.index}`}>
          <div className='modal-dialog '>
            <div className='modal-content'>
              <div className='modal-header'>
                <div>
                  <h5 className='modal-title' id='exampleModalLabel'>
                    {translation?.menu_customizations_text || 'Customization'}{' '}
                  </h5>
                </div>
                <div>
                  <button
                    type='button'
                    className='close'
                    data-dismiss='modal'
                    aria-label='Close'
                  >
                    <span aria-hidden='true'>×</span>
                  </button>
                </div>
              </div>
              <div className='modal-body'>
                {/* {addon.map((e, i) => (
                                    <Customize item={e} key={i} />
                                ))} */}
                {addon.map((e, i) => (
                  <CustomizationItem
                    item={e}
                    key={i}
                    translation={translation}
                    currency={props.currency}
                    extraAddon={extraAddon}
                    mainAddon={Addon}
                    setMainAddon={setAddon}
                    setExtraAddon={setExtraAddon}
                  />
                ))}
              </div>

              <div className='modal-footer p-0 border-0 fixed-bottom'>
                <div className='col-6 m-0 p-0'>
                  <button
                    type='button'
                    className='btn btn-dark btn-lg btn-block'
                    data-dismiss='modal'
                  >
                    {translation?.menu_close || 'Close'}{' '}
                  </button>
                </div>
                <div className='col-6 m-0 p-0'>
                  <button
                    type='button'
                    data-dismiss='modal'
                    onClick={() =>
                      saveAddon(
                        addon[0]?.product_id,
                        addon[0]?.categories[0].type
                      )
                    }
                    className='btn btn-danger btn-lg btn-block'
                  >
                    {translation?.menu_save_changes || 'Save changes'}{' '}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <button
            style={{ visibility: 'hidden' }}
            type='button'
            id={`#customization-${addon[0]?.product_id}-${props.index}`}
            className='btn btn-outline-success btn-sm ml-auto'
            data-toggle='modal'
            data-target={`#customization-${addon[0]?.product_id}-${props.index}`}
          >
            Add
          </button>
        </form>
      </div>
    )
  } else return null
}
const mapSateToProps = (state) => ({
  cart: state.cart.Items,
  products: state.store.products,
  translation: state.translation?.active?.data,
})

export default connect(mapSateToProps, {})(Customization)
