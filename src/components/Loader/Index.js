import React from 'react'
import ReactDOM from 'react-dom'
import domain from '../../config/api/domain'

class Loader extends React.Component {
  render() {
    return (
      <div className='osahan-index'>
        <div className='bg-danger d-flex align-items-center justify-content-center vh-100'>
          <a>
            <img
              className='index-osahan-logo'
              src={`${domain.url}/img/logo.png`}
              alt=''
            />
          </a>
        </div>
      </div>
    )
  }
}

export default Loader
