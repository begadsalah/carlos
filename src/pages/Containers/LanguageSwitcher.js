import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import {
  fetchTranslation,
  fetchAllTranslation,
} from '../../services/languages/actions'
import domain from '../../config/api/domain'
import { connect } from 'react-redux'
import './containers.css'
const LanguageSwitcher = (props) => {
  let { all_translation, active, selectedlanguage, isRtl, storeId } = props
  useEffect(() => {
    if (!isRtl) {
      document.getElementsByTagName('html')[0].setAttribute('dir', 'ltr')
    } else {
      document.getElementsByTagName('html')[0].setAttribute('dir', 'rtl')
    }
  }, [selectedlanguage])
  const change_language = (id) => {
    const selected = all_translation.data.find((e) => e.id === id)
    props.fetchTranslation({ select_lang: selected })
    localStorage.setItem('active_language_id', id)
  }
  return (
    <div className='col-auto lang_main_div'>
      <select
        className='form-control1'
        value={active}
        onChange={(e) => change_language(e.target.value)}
        name='selected_language'
        data-width='fit'
      >
        {all_translation.data &&
          all_translation?.data.map((data, index) => (
            <option className='select_option' key={index} value={data.id}>
              {data?.language_name}
            </option>
          ))}
      </select>
    </div>
  )
}

const mapSateToProps = (state) => ({})
export default connect(mapSateToProps, {
  fetchTranslation,
  fetchAllTranslation,
})(LanguageSwitcher)
