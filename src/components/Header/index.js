import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { NavLink, Route } from 'react-router-dom'
import domain from '../../config/api/domain'
import ROUTE from '../../config/route'
import './header.css'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import InstagramIcon from '@mui/icons-material/Instagram'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import Link from '@mui/material/Link'
import CallIcon from '@mui/icons-material/Call'
import LanguageSwitcher from '../../pages/Containers/LanguageSwitcher'
import isRtl from '../../bootstrap'
import Default from '../../config/translation/default.json'
let storeId = null
const Text = (props) => {
  const { Key, translation } = props
  const text = (translation && translation[Key]) ?? Default[Key]

  return text
}

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isSideBarOpen: false,
      store_id: null,
    }
  }
  // state = {

  // };

  componentWillMount() {
    this.setState({ store_id: localStorage.getItem('storeId') })
  }
  closeSideBar = (value) => {
    this.setState({ isSideBarOpen: !value })
    document.body.classList.add('sidemenu-open')
  }
  render() {
    let {
      store_name,
      store_phone,
      address,
      description,
      logo,
      translation,
      is_call_waiter_enable,
      store_theme,
      facebook,
      instagram,
      maps,
      all_Translation,
      active_language_id,
      is_rlt_enable,
    } = this.props
    let { store_id } = this.state
    let backgroundColor = store_theme.appcolor ? store_theme.appcolor : '#fff'
    let background = store_theme.appcolor ? store_theme.appcolor : ''
    return (
      <div style={{ backgroundColor: backgroundColor }} className=''>
        <Navbar className='header_navbar' expand='lg'>
          <Container fluid className='navbar_content_container'>
            <Navbar.Brand href='#'>
              <h1 className='header_brand_name'>{store_name}</h1>
            </Navbar.Brand>

            <Navbar.Toggle aria-controls='navbarScroll' />
            <Navbar.Collapse
              id='navbarScroll'
              className='header_collapse_content'
            >
              <Nav
                className='me-auto my-2 my-lg-0'
                style={{ maxHeight: '100px' }}
                navbarScroll
              ></Nav>
              <div className='social_media_div'>
                <div className='social_media'>
                  <Nav.Link href={maps} className='social_media_navLink'>
                    <LocationOnIcon />
                  </Nav.Link>
                  <Nav.Link href='#' className='social_media_navLink'>
                    <a href={`tel:${store_phone}`}></a>
                    <CallIcon />
                  </Nav.Link>
                  <Nav.Link href='#' className='social_media_navLink'>
                    <FacebookIcon />
                  </Nav.Link>
                  <Nav.Link href={instagram} className='social_media_navLink'>
                    <InstagramIcon />
                  </Nav.Link>
                </div>
                <div className='address'>
                  <h6 className='m-0 text-dark d-flex align-items-center small'>
                    {!this.props.show ? (
                      <>
                        {is_call_waiter_enable === 1 ? (
                          <span className='small ml-auto'>
                            <Button
                              className='callTheWaiter_text'
                              variant='outline-light'
                              onClick={() =>
                                document
                                  .getElementById('#call-the-waiter')
                                  .click()
                              }
                            >
                              <i className=''></i>
                              {translation?.call_the_waiter || (
                                <h1 variant='outline-light'>Call the waiter</h1>
                              )}
                            </Button>
                          </span>
                        ) : null}
                      </>
                    ) : null}
                  </h6>
                </div>
              </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    )
  }
}
const mapSateToProps = (state) => {
  return {
    store_theme: state.store.store_theme,
    facebook: state.store.facebook,
    instagram: state.store.instagram,
    maps: state.store.maps,
  }
}

export default connect(mapSateToProps, null)(Header)
