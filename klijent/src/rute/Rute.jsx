import React from 'react'
import { createBrowserRouter } from 'react-router-dom'

// stranice
import Pocetna from "../stranice/Pocetna"
import Prijava from "../stranice/Prijava"
import Profil from "../stranice/Profil"
import Registracija from "../stranice/Registracija"
import NijePronadjeno from "../stranice/NijePronadjeno"

//funkcija routera

const ruter = createBrowserRouter([
    {
        path: "/",
        element: <Pocetna/>,
        errorElement: <NijePronadjeno/>
    },
    {
        path: "/Prijava",
        element: <Prijava />
    },    {
        path: "/Profil",
        element: <Profil />
    },    {
        path: "/Registracija",
        element: <Registracija />
    },

])

export default ruter