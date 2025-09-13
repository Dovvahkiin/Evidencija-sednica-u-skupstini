import React from 'react'
import NavigacioniBar from '../Navigacija/NavigacioniBar'
import Banner from './Banner'
import "../../stilovi/header.css"
import "../../stilovi/general.css"

function Header() {
  return (
    <div className='header'>
        <Banner/>
        <NavigacioniBar />
    </div>
  )
}

export default Header