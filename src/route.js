import React from 'react'
import Loader from './components/Loader/Index'
import pages from './pages'
import ROUTE from './config/route'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  fetchTranslation,
  fetchAllTranslation,
} from './services/languages/actions'

import history from './helpers/history'
import LoadingOverlay from 'react-loading-overlay'
import ScrollToTop from './components/Helpers/ScrollToTop'
import domain from './config/api/domain'
export const Page = (props) => {
  const is_rlt_enable = useSelector(
    (state) => state.translation?.active?.is_rlt
  )
  const loading = useSelector((state) => state?.alert?.loader)
  const active = useSelector((state) => state.translation.active?.is_rlt)
  const lang_state = useSelector((state) => state.translation)
  const id = useSelector((state) => state.store.store_id)
  const dispatch = useDispatch()
  React.useEffect(() => {
    dispatch(
      fetchAllTranslation({
        view_id: id ? id : domain.storepath,
        lang_state: lang_state,
      })
    )
    if (active === 1) {
      document.getElementsByTagName('html')[0].setAttribute('dir', 'rtl')
    }
    if (active === 0) {
      document.getElementsByTagName('html')[0].setAttribute('dir', 'ltr')
    }
  }, [])

  if (active === undefined) {
    return <Loader />
  } else {
    return (
      <LoadingOverlay
        active={loading}
        spinner
        styles={{
          overlay: (base) => ({
            ...base,
            position: 'fixed',
            zIndex: '3000',
            background: 'rgba(255,255,255,0.7)',
          }),
          spinner: (base) => ({
            ...base,
            '& svg circle': {
              stroke: 'rgba(220, 53, 69, 1)',
            },
          }),
        }}
        // text={<Text Key={"processing_order"}/>}
      >
        <Router history={history}>
          <ScrollToTop />
          <Switch>
            <Route
              path={`${ROUTE.STORE.INDEX.PAGES.VIEW.PATH}/:id/`}
              exact
              component={pages.STORE}
            />
            <Route
              path={`${ROUTE.STORE.INDEX.PAGES.DETAILED.PATH}/:store_id/product/details/:product_id`}
              exact
              component={pages.DETAILED_VIEW}
            />
            <Route
              path={`${ROUTE.STORE.INDEX.PAGES.DETAILED.PATH}/:store_id/category/details/:category_id`}
              exact
              component={pages.CATEGORY_DETAIL}
            />
            <Route
              path={`${ROUTE.STORE.INDEX.PAGES.CART.PATH}/:store_id`}
              exact
              component={pages.CART}
            />
            <Route
              path={`${ROUTE.ACCOUNT.ORDERS.PAGES.VIEW.PATH}/:phone?`}
              component={pages.ORDERS}
            />
            <Route
              path={`${ROUTE.ACCOUNT.LOGIN.PAGES.VIEW.PATH}`}
              component={pages.LOGIN}
            />
            <Route
              path={`${ROUTE.ACCOUNT.REGISTER.PAGES.VIEW.PATH}`}
              component={pages.REGISTER}
            />
            <Route
              path={`${ROUTE.ACCOUNT.FORGOT.PAGES.VIEW.PATH}`}
              component={pages.FORGOT}
            />
          </Switch>
        </Router>
      </LoadingOverlay>
    )
  }
}
