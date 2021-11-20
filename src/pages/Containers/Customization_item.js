import React, { useState } from 'react'
import useDynamicRefs from 'use-dynamic-refs'
import PriceRender from './PriceRender'

export const CustomizationItem = (props) => {
  const {
    item,
    translation,
    currency,
    extraAddon,
    setExtraAddon,
    setMainAddon,
    mainAddon,
  } = props
  // const [extraAddon, setExtraAddon] = useState([]);
  const [Addon, setAddon] = useState(null)
  const [getRef, setRef] = useDynamicRefs()
  let updateAddon = (id, type, index, product_id) => {
    let count = 0
    let calculationcount = 0
    switch (type) {
      case 'ADD':
        count =
          Number(
            document.getElementById(`addon-${id}-${index}-${product_id}`).value
          ) + 1
        calculationcount =
          Number(
            document.getElementById(`addon-${id}-${index}-${product_id}`).value
          ) + 1
        break
      case 'SUB':
        count =
          Number(
            document.getElementById(`addon-${id}-${index}-${product_id}`).value
          ) - 1
        calculationcount =
          Number(
            document.getElementById(`addon-${id}-${index}-${product_id}`).value
          ) - 1
        break
    }
    if (count >= 0) {
      document.getElementById(`addon-${id}-${index}-${product_id}`).value =
        count
      let extra = {
        addon_id: id,
        count: Number(
          document.getElementById(`addon-${id}-${index}-${product_id}`).value
        ),
        calculationcount: Number(
          document.getElementById(`addon-${id}-${index}-${product_id}`).value
        ),
      }
      addExtraAddon(extra)
    }
  }

  const addExtraAddon = (extra) => {
    let find = extraAddon.find((data) => data.addon_id === extra.addon_id)
    let newData = []
    if (find) {
      let newData = extraAddon.filter((item) => item.addon_id !== find.addon_id)
      setExtraAddon([...newData, extra])
    } else setExtraAddon([...extraAddon, extra])
  }

  const rtlSttle = {
    display: 'flex',
    alignItems: 'flex-start',
  }
  // return null;

  const option = (event) => {
    let item = JSON.parse(event.target.value)
    let extra = { addon_id: item.id, count: 1, calculationcount: 1 }
    let find = extraAddon.find((data) => data.addon_id === extra.addon_id)
    let newData = []
    if (find) {
      let newData = extraAddon.filter((item) => item.addon_id !== find.addon_id)
      setExtraAddon([...newData, extra])
    } else setExtraAddon([...extraAddon, extra])
  }
  return (
    <>
      {item.categories.map((data, index) => (
        <div key={index} className='form-row'>
          <div className='mb-0 col-md-12 form-group'>
            <label
              style={{
                alignContent: 'flex-start',
                display: 'flex',
              }}
              className='form-label'
            >
              {data.name[translation?.language_name]}
            </label>

            {data.type === 'SNG' ? (
              <div>
                <div className='schedule'>
                  <div
                    className='tab-content filter bg-white'
                    id='myTabContent'
                  >
                    <div>
                      {data.addons?.map((value, index) => (
                        <div
                          key={index}
                          className='custom-control border-bottom px-0 custom-radio'
                          onClick={() => props.setMainAddon(value.id, 'SNG')}
                        >
                          <input
                            className='custom-control-input'
                            type='radio'
                            name={`option-${item.product_id}-${props.index}`}
                            defaultChecked={index === 0}
                            checked={mainAddon === value.id ? 'checked' : null}
                            id={`${value.id}`}
                          />
                          <label className='custom-control-label py-3 w-100 px-3'>
                            <i className='icofont-addons mr-2'></i>{' '}
                            <b>
                              {value.addon_name[translation?.language_name]}
                            </b>{' '}
                            -{' '}
                            <PriceRender
                              currency={currency}
                              price={value.price}
                            />
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : data.type === 'EXT' ? (
              <div>
                {data.addons?.map((value, index) => (
                  <div
                    key={index}
                    className='cart-items bg-white position-relative'
                  >
                    <div className='d-flex  align-items-center p-3 custom1-new'>
                      <a href='#'></a>
                      <a className='ml-3 text-dark text-decoration-none w-100'>
                        <h5
                          style={{
                            textAlign: 'start',
                          }}
                          className='mb-1'
                        >
                          {value.addon_name[translation?.language_name]}
                        </h5>
                        <div className='d-flex align-items-center md-3'>
                          <p className='total_price md-3 font-weight-bold m-0'>
                            <PriceRender
                              currency={currency}
                              price={value.price}
                            />
                          </p>
                          <div className='md-3 col-auto'>
                            <div className='input-group input-spinner float-right-new-v2 cart-items-number'>
                              <div className='input-group-append '>
                                <button
                                  className='btn btn-success btn-sm'
                                  type='button'
                                  id='button-minus'
                                  onClick={() =>
                                    updateAddon(
                                      value.id,
                                      'SUB',
                                      props.index,
                                      item.product_id
                                    )
                                  }
                                >
                                  {' '}
                                  −{' '}
                                </button>
                              </div>
                              <input
                                type='text'
                                className='form-control'
                                defaultValue={0}
                                ref={setRef(`addon-${value.id}-${props.index}`)}
                                id={`addon-${value.id}-${props.index}-${item.product_id}`}
                                name={`extra-${props.index}`}
                              />
                              <div className='input-group-prepend'>
                                <button
                                  className='btn btn-success btn-sm'
                                  onClick={() =>
                                    updateAddon(
                                      value.id,
                                      'ADD',
                                      props.index,
                                      item.product_id
                                    )
                                  }
                                  type='button'
                                  id='button-plus'
                                >
                                  {' '}
                                  +{' '}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <div className='form-group'>
                  <label
                    className='rtl-label'
                    style={rtlSttle}
                    htmlFor='exampleInputNEWPassword1'
                  >
                    {translation?.order_type || 'Order Type'} *
                  </label>
                  <select
                    // style={hasErrors("order_type")}
                    type='text'
                    className='form-control'
                    name='order_type'
                    placeholder='Enter Your Table No'
                    // value={this.state.order_type}
                    onChange={option}
                  >
                    <option value=''>
                      {translation?.order_type || 'Order Type'}
                    </option>
                    {data.addons.map((ad, index) => (
                      <option value={JSON.stringify(ad)}>
                        {ad.addon_name[translation?.language_name]} , {ad.price}
                        :{currency}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  )
}
