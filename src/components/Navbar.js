import React, { Component } from 'react'
import { Link } from 'gatsby'
import { uniqueId } from 'lodash'
import autoBind from 'react-autobind'

import NAV_CONFIG from './nav_config'

const uniqueSlug = (slug) => uniqueId(`${slug}_`)

const renderNavLink = ({ slug, title }) => {
  if (slug === '/referees') {
    return (
      <a
        key={slug}
        className="navbar-item"
        href="https://manage.iqasport.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        {title}
      </a>
    )
  }

  return (
    <Link
      className="navbar-item"
      to={slug}
      key={uniqueSlug(slug)}
    >
      {title}
    </Link>
  )
}

const renderNavDropdown = ({ slug, title, dropdownItems }) => (
  <div key={slug} className="navbar-item has-dropdown is-hoverable">
    <Link className="navbar-link is-arrowless" to={slug} key={uniqueSlug(slug)}>
      {title}
    </Link>
    <div className="navbar-dropdown is-boxed">
      {dropdownItems.map(renderNavLink)}
    </div>
  </div>
)

const renderNavConfig = (config) => {
  if (config.dropdownItems) return renderNavDropdown(config)
  return renderNavLink(config)
}

class Navbar extends Component {
  constructor(props) {
    super(props)
    autoBind(this)

    this.state = {
      isMenuActive: false
    }
  }

  handleBurgerClick = () => {
    this.setState(prevState => ({ isMenuActive: !prevState.isMenuActive }))
  }

  render() {
    const { isMenuActive } = this.state
    const activeClassName = isMenuActive ? 'is-active' : ''
    /* eslint-disable */
    return (
      <nav className="navbar is-fixed-top">
        <div className="container">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item">
              <figure className="image">
                <img
                  src="../img/logo_long_green.png"
                  alt="International Quidditch Association"
                  style={{ width: '180px', maxHeight: 'none' }}
                />
              </figure>
            </Link>

            <a
              className={`navbar-burger burger ${activeClassName}`}
              aria-label="menu"
              aria-expanded="false"
              onClick={this.handleBurgerClick}
            >
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </a>
          </div>
          <div className={`navbar-menu ${activeClassName}`}>
            <div className="navbar-end">
              {NAV_CONFIG.map(renderNavConfig)}
            </div>
          </div>
        </div>
      </nav>
    )
     /* eslint-enable */
  }
}

export default Navbar
