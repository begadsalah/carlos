import React, { useState, useEffect } from 'react'
// import OtpInput from "react-otp-input";
import LoadingOverlay from 'react-loading-overlay'
import Text from '../../pages/Containers/Text'
import axios from 'axios'
import domain from '../../config/api/domain'
import { useSelector } from 'react-redux'
import { useFetch } from './test'
import OTPInput from 'otp-input-react'

function generateOTP() {
  var digits = '0123456789'
  var otpLength = 6
  var otp = ''
  for (let i = 1; i <= otpLength; i++) {
    var index = Math.floor(Math.random() * digits.length)
    otp = otp + digits[index]
  }
  return otp
}

export const Otp = (props) => {
  const id = useSelector((state) => state.store.store_id)
  const [loading, setloading] = useState(false)
  const [otpNumber, setotpNumber] = useState(null)
  const [localotpNumber, setlocalotpNumber] = useState(null)

  let link = domain.url + '/api/web/store/otp'
  var data = {
    phoner_number: props.phone_number,
    otp_number: generateOTP(),
    view_id: id,
  }

  var requestOptions = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }

  const res = useFetch(link, requestOptions)
  useEffect(() => {
    setloading(true)
    if (res?.response?.payload?.data) {
      console.log(res?.response)
      if (res?.response?.success) {
        setloading(false)
        setotpNumber(res?.response?.payload?.data?.otp)
      } else {
        alert(res?.response?.payload?.data)
        console.log(res?.response?.payload?.data)
        setloading(false)
        props.onFailure()
      }
    }
  }, [res])

  const verify = () => {
    if (otpNumber == localotpNumber) {
      props.onSuccess()
    } else {
      alert('please check otp')
    }
  }
  return (
    <LoadingOverlay
      active={loading}
      spinner
      styles={{
        overlay: (base) => ({
          ...base,
          position: 'fixed',
        }),
      }}
      text={<Text Key={'processing_order'} />}
    >
      <div className='osahan-body'>
        <div className='px-15'>
          <div className='p-3 bg-white border-radius-4px'>
            Please Enter OTP
            <div
              className='form-group'
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',
              }}
            >
              <OTPInput
                inputStyles={{
                  color: 'black',
                }}
                style={{}}
                value={localotpNumber}
                onChange={setlocalotpNumber}
                autoFocus
                OTPLength={6}
                otpType='number'
                disabled={false}
              />
            </div>
            <button
              disabled={loading}
              onClick={verify}
              className='fixed-bottom align-items-center btn btn-lg btn-block text-white'
              style={{ backgroundColor: '#60B246' }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  flex: 1,
                  alignItems: 'center',
                  alignContent: 'flex-start',
                }}
              >
                <div className='more'>
                  <h6 className='m-0'></h6>
                  <p className='m-0'>{'Confirm'}</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </LoadingOverlay>
  )
}
