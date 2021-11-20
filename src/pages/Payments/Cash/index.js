import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
// import ROUTE from "../../config/route";
// import domain from '../../config/api/domain';
import { connect } from 'react-redux'

import * as CONSTANTS from '../../../config/constants/statusCodes'
import Text from '../../Containers/Text'

const Cash = (props) => {
  const [isChecked, SetCheck] = useState(false)

  const triggerCheckBox = () => {
    SetCheck(!isChecked)

    if (isChecked === true) {
      props.onClick(CONSTANTS.CASH)
    }
  }
  const Continue = () => {
    props.setLoading(true)
    props.SuccessAction(CONSTANTS.CASH, 1)
    // SetCheck(!isChecked)
  }
  return (
    <div className='osahan-card rounded shadow-sm bg-white mb-3'>
      <div className='osahan-card-header' id='headingThree'>
        <h2 className='mb-0'>
          <button
            className='d-flex p-3 align-items-center btn text-decoration-none text-success w-100'
            type='button'
            data-toggle='collapse'
            data-target='#collapseThree'
            aria-expanded='false'
            aria-controls='collapseThree'
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                flex: 1,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  alignContent: 'flex-start',
                }}
              >
                <i className='icofont-cash-on-delivery mr-3'></i>
                <Text Key={'cash_on_delivery'} />
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  alignContent: 'flex-start',
                }}
              >
                <i className='icofont-rounded-down '></i>
              </div>
            </div>
          </button>
        </h2>
      </div>
      <div
        id='collapseThree'
        className='collapse'
        aria-labelledby='headingThree'
        data-parent='#accordionExample'
      >
        <div className='border-top'>
          <div className='card-body'>
            <div className='custom-control custom-checkbox mr-sm-2'>
              <input
                onClick={() => triggerCheckBox()}
                type='checkbox'
                checked={isChecked}
                className='custom-control-input'
                id='customControlAutosizing'
              />
              <label
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                }}
                className='custom-control-label'
                for='customControlAutosizing'
              >
                <b>
                  {' '}
                  <Text Key={'cash'} />
                </b>
                <br />
                &nbsp;
                <p
                  className='small text-muted m-0'
                  style={{ textAlign: 'start' }}
                >
                  <Text Key={'cash_description'} />
                </p>
                <div className='fixed-bottom'>
                  <button
                    onClick={() => Continue()}
                    disabled={!isChecked}
                    className='btn btn-success btn-block btn '
                  >
                    <Text Key={'continue'} />
                  </button>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Cash
