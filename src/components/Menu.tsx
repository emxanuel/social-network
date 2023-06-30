// import React from 'react'
import { Link } from 'react-router-dom'
import style from '../css/menu.module.css'

const Menu = () => {
    return (
        <div id='menu' className={`${style.container}`} >
            <div className={style.links}>
                <Link to='/search'>
                    <i className={`fa-solid fa-magnifying-glass ${style.icon}`} />
                    Search friends
                </Link>
                <Link to='/requests'>
                    <i className={`fa-solid fa-users ${style.icon}`} />
                    Friends requests
                </Link>
            </div>
        </div>
    )
}

export default Menu