// import React from 'react'
import { Link } from 'react-router-dom'
import style from '../css/menu.module.css'
import { useThemeContext } from './Theme'

const Menu = () => {
    const theme = useThemeContext()
    return (
        <div id='menu' className={`${style.container} ${theme.theme === 'dark'? style.dark : style.light}`} >
            <div className={style.links}>
                <Link to='/search'>
                    <i className={`fa-solid fa-magnifying-glass ${style.icon}`} />
                    Search friends
                </Link>
                <Link to='/requests'>
                    <i className={`fa-solid fa-users ${style.icon}`} />
                    Friends requests
                </Link>
                <Link to={window.location.pathname} className={style.changeButton} onClick={() => {
                        theme.theme === 'dark' ? localStorage.setItem('theme', 'light') : localStorage.setItem('theme', 'dark')
                        window.location.reload();
                    }}>
                        <i id = {style.lightIcon} className={`fa-regular fa-sun ${style.icon}`} />
                        <i id = {style.darkIcon} className={`fa-regular fa-moon`}/>
                        <p>Change theme</p>
                </Link>
                <Link to='/' onClick={() => {
                    localStorage.removeItem('User')
                    window.location.reload()
                }}>
                    <i className={`fa-solid fa-arrow-right-from-bracket ${style.icon}`} />
                    Logout
                </Link>
            </div>
        </div>
    )
}

export default Menu