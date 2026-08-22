import React from 'react'
import BannerImage from "../../dodaci/slike/banner.jpg"

function Banner() {
  return (
    <div className="banner">
        <img src={BannerImage} alt="baner slika" />
    </div>
  )
}

export default Banner