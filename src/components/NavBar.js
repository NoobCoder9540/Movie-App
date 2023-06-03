import React, { Component } from 'react'

import { Link } from 'react-router-dom'

export class NavBar extends Component {
  render() {
    return (
      <div style={{ display: 'flex', padding: '0.5' }}>
        <Link to='/' style={{textDecoration : 'none'}}><h1 style={{ marginTop: '1.5rem', caretColor: 'transparent'}}>Movies App</h1></Link>
        <Link to='/favourites'  style={{textDecoration : 'none'}}><h2 style={{ marginLeft: '2rem', marginTop: '2.1rem', caretColor: 'transparent' }}>Favourites</h2></Link>

      </div>

    )
  }
}

export default NavBar