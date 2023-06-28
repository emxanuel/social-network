// import React from 'react'
import { Link } from 'react-router-dom'
import style from '../css/menu.module.css'

const Menu = () => {
    return (
        <div id='menu' className={`${style.container}`} >
            <div className={style.link}>
                <i className="fa-solid fa-magnifying-glass" />
                <Link to='/search'>Search friends</Link>
            </div>
        </div>
    )
}

export default Menu