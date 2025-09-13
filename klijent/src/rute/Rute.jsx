import React from 'react'
import { createBrowserRouter } from 'react-router-dom'

// stranice
import Pocetna from "../stranice/Pocetna"
import NijePronadjeno from "../stranice/NijePronadjeno"

//funkcija routera

const ruter = createBrowserRouter([
    {
        path: "/",
        element: <Pocetna/>,
        errorElement: <NijePronadjeno/>
    }
])

export default ruter