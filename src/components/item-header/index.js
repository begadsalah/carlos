import React from 'react'
import isRtl from '../../bootstrap'
import { useSelector } from 'react-redux'
export default function ItemHeader(props) {
  const state = useSelector((state) => state.store)
  const language = useSelector((state) => state.translation?.active?.data)
  const rtl = language?.language_name ? language?.language_name : 'en'
  const { onClick, title } = props
  return (
    <div className='p-3 border-bottom shadow'>
      <div
        className='d-flex align-items-center'
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex' }}>
          <a
            onClick={() => window.location.replace(`/store/${state.store_id}`)}
          >
            <i
              style={{ paddingLeft: '15px' }}
              className={`icofont-home back-page`}
            ></i>
          </a>
          <h6 className='font-weight-bold m-0 ml-3'>{title}</h6>
        </div>
        <div>
          <a
            className='font-weight-bold text-danger text-decoration-none'
            onClick={onClick}
          >
            <i
              className={`icofont-rounded-${
                rtl === 'en' ? 'right' : 'left'
              } back-page`}
            ></i>
          </a>
        </div>
      </div>
    </div>
  )
}
