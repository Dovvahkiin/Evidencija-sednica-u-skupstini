import React from 'react'
import {Link} from "react-router-dom"

function NavigacioniBar() {
  return (
    <div className="navigacijaKontejner">
        <ul>
            <li><Link to="/">TEST</Link></li>
            <li><Link to="/">ANOTHER ONE</Link></li>
        </ul>
    </div>
  )
}

export default NavigacioniBar