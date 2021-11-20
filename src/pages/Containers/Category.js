import React from 'react'
import ReactDOM from 'react-dom'
import ROUTE from '../../config/route'
import domain from '../../config/api/domain'
import { NavLink, Route } from 'react-router-dom'
import isRtl from '../../bootstrap'
import { useSelector } from 'react-redux'
const Category = (props) => {
  const translation = useSelector((state) => state.translation?.active?.data)
  return (
    <div>
      <div className='category-home'>
        {props.data.map((data, index) => (
          <div key={index} className='slider-wrapper__img-wrapper' id=''>
            <div className='search' style={{ position: 'relative' }}>
              <NavLink
                to={`${ROUTE.STORE.INDEX.PAGES.DETAILED.PATH}/${props.storeId}/category/details/${data.id}`}
              >
                <img
                  /*src={`${domain.url}/${
                    data.image_url != null
                      ? data.image_url
                      : 'themes/default/images/all-img/empty.png'
                  }`}*/
                  src='https://images.unsplash.com/photo-1550259114-ad7188f0a967?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=580&q=80'
                  className='slider-wrapper__img slider-cust-img category-img-v2'
                />
                <span className='category-slider-name'>{`${
                  data.name[
                    translation?.language_name
                      ? translation?.language_name
                      : 'en'
                  ]
                }`}</span>
                {/*<p class="m-0 pt-2 text-muted text-center">{`${data.name}`}</p>*/}
              </NavLink>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Category
