import React from 'react'
import NavBar from './NavBar'
import Notify from './Notify'
import Modal from './Modal'
import Footer from './Footer'
import { useContext } from 'react'
import { DataContext } from '../store/GlobalState'

function Layout({children}) {
    
    const { state, dispatch } = useContext(DataContext)
    const { auth } = state
    return (
        <div className= {auth.user && auth.user.role === 'admin'? 'main' : 'backGroundImage' && auth.user && auth.user.role === 'user'? 'main' : 'backGroundImage'}>
            <NavBar />
            <br></br>
            <br></br>
            <br></br>
            <Notify />
            <Modal />
            {children}
            <Footer />
        </div>
    )
}

export default Layout
